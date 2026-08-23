// 极简 markdown 渲染器 —— 用于 CMS 后台正文（body, widget: markdown）。
//
// 设计要点：
// 1. Sveltia markdown widget 有一个已知坑：图片插入后会被序列化成
//    `![alt]\n(url)`（alt 文本与 url 折行），导致不严格解析的渲染器把它当成
//    普通文本。需要先把这串折行语法归一到 `![alt](url)`。
// 2. 正文场景很轻：图 + 段。只支持 图片、粗体、斜体、行内链接、行内代码、段落、
//    强制换行（双空格+\n）。其它语法一律按字面输出，避免误判。
// 3. 用户输入视作半受信任来源（PAT 登录 + 团队内编辑）。所有渲染交给 React
//    原生文本节点 —— React 默认对内容做转义、是 XSS 安全的，避免手动拼接
//    dangerouslySetInnerHTML 引入 XSS 风险。
//
// 返回 React 节点数组，可直接 {…renderNewsBody(body)} 渲染。
import { Fragment } from "react"

/* -------------------------------------------------------------------------
 * 2. 行内语法：![alt](url) / [text](url) / **bold** / *italic* / `code`
 *    返回一组 (type: 'text'|'image'|'link'|'bold'|'italic'|'code', value)
 *    形式的 token，便于在 React 里逐个组装节点。
 *    注意：图片必须先于链接匹配（`!` 在前）。
 * --------------------------------------------------------------------- */
type InlineToken =
  | { kind: "text"; value: string }
  | { kind: "image"; alt: string; url: string; title?: string }
  | { kind: "link"; text: string; url: string; title?: string }
  | { kind: "bold"; value: string }
  | { kind: "italic"; value: string }
  | { kind: "code"; value: string }
  | { kind: "br" }

// 单个 inline token 的正则（按优先级排序）
const IMAGE_RE = /!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)/
const LINK_RE = /\[([^\]]+)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)/
const BOLD_RE = /\*\*([^*]+)\*\*|\b__([^_]+)__\b/
const ITALIC_RE = /(^|[^*])\*([^*\n]+)\*|(^|[^_])_([^_\n]+)_/
const CODE_RE = /`([^`\n]+)`/
const BR_RE = /  \n/  // markdown 强制换行：双空格 + 换行

/** 把一段字符串拆成 inline token 数组 */
function tokenizeInline(input: string): InlineToken[] {
  const tokens: InlineToken[] = []
  let remaining = input

  while (remaining.length > 0) {
    // 图片
    let m = IMAGE_RE.exec(remaining)
    if (m) {
      if (m.index > 0) tokens.push({ kind: "text", value: remaining.slice(0, m.index) })
      tokens.push({
        kind: "image",
        alt: m[1] ?? "",
        url: m[2] ?? "",
        title: m[3],
      })
      remaining = remaining.slice(m.index + m[0].length)
      continue
    }
    // 链接
    m = LINK_RE.exec(remaining)
    if (m) {
      if (m.index > 0) tokens.push({ kind: "text", value: remaining.slice(0, m.index) })
      tokens.push({
        kind: "link",
        text: m[1] ?? "",
        url: m[2] ?? "",
        title: m[3],
      })
      remaining = remaining.slice(m.index + m[0].length)
      continue
    }
    // 粗体（**…** 或 __…__）
    m = BOLD_RE.exec(remaining)
    if (m) {
      if (m.index > 0) tokens.push({ kind: "text", value: remaining.slice(0, m.index) })
      tokens.push({ kind: "bold", value: m[1] ?? m[2] ?? "" })
      remaining = remaining.slice(m.index + m[0].length)
      continue
    }
    // 斜体（*…* 或 _…_）
    m = ITALIC_RE.exec(remaining)
    if (m) {
      if (m.index > 0) tokens.push({ kind: "text", value: remaining.slice(0, m.index) })
      tokens.push({ kind: "italic", value: m[2] ?? m[4] ?? "" })
      remaining = remaining.slice(m.index + m[0].length)
      continue
    }
    // 行内代码 `…`
    m = CODE_RE.exec(remaining)
    if (m) {
      if (m.index > 0) tokens.push({ kind: "text", value: remaining.slice(0, m.index) })
      tokens.push({ kind: "code", value: m[1] ?? "" })
      remaining = remaining.slice(m.index + m[0].length)
      continue
    }
    // 强制换行（两个空格 + 换行）：把它吞掉，后续渲染为 <br/>
    m = BR_RE.exec(remaining)
    if (m && m.index === 0) {
      tokens.push({ kind: "br" })
      remaining = remaining.slice(m[0].length)
      continue
    }
    // 普通文本：取到下一个可能的标记符之前
    const nextMatch = remaining.slice(1).search(/[!\[*_`]/)
    if (nextMatch === -1) {
      tokens.push({ kind: "text", value: remaining })
      remaining = ""
    } else {
      tokens.push({ kind: "text", value: remaining.slice(0, nextMatch + 1) })
      remaining = remaining.slice(nextMatch + 1)
    }
  }

  return tokens
}

/* -------------------------------------------------------------------------
 * 3. 渲染 inline tokens → React node
 *    text 节点直接交给 React（自动转义，XSS 安全）。
 *    如果以后需要嵌套粗体里的链接，再加一层递归即可。
 * --------------------------------------------------------------------- */
type ImageMeta = { src: string; alt: string; caption?: string; title?: string }

function renderInline(
  tokens: InlineToken[],
  keyPrefix: string,
  onImage: (meta: ImageMeta) => void,
): React.ReactNode[] {
  const nodes: React.ReactNode[] = []
  let textBuffer = ""
  let textKey = ""

  const flushText = () => {
    if (textBuffer.length === 0) return
    // 直接交给 React 渲染文本节点：React 会自动把 < > & 等字符当作字面量，
    // 默认就是 XSS 安全的，不需要 dangerouslySetInnerHTML，也不必手动转义。
    nodes.push(<Fragment key={textKey}>{textBuffer}</Fragment>)
    textBuffer = ""
  }

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i]
    const k = `${keyPrefix}-${i}`
    switch (token.kind) {
      case "text":
        if (textBuffer.length === 0) textKey = k
        textBuffer += token.value
        break
      case "image":
        flushText()
        // 把图片信息交给 onImage，由段落层决定是否整段独立渲染
        onImage({
          src: token.url,
          alt: token.alt,
          title: token.title,
        })
        break
      case "link":
        flushText()
        nodes.push(
          <a
            key={k}
            href={token.url}
            title={token.title}
            target={token.url.startsWith("http") ? "_blank" : undefined}
            rel={token.url.startsWith("http") ? "noopener noreferrer" : undefined}
            className="text-blue-600 underline underline-offset-4 hover:text-blue-700"
          >
            {token.text}
          </a>,
        )
        break
      case "bold":
        flushText()
        nodes.push(<strong key={k}>{token.value}</strong>)
        break
      case "italic":
        flushText()
        nodes.push(<em key={k}>{token.value}</em>)
        break
      case "code":
        flushText()
        nodes.push(
          <code
            key={k}
            className="rounded bg-slate-200 px-1.5 py-0.5 font-mono text-[0.9em] text-slate-800"
          >
            {token.value}
          </code>,
        )
        break
      case "br":
        flushText()
        nodes.push(<br key={k} />)
        break
    }
  }
  flushText()
  return nodes
}

/* -------------------------------------------------------------------------
 * 4. 折行图片语法归一
 *    `![alt]\n(url)`  →  `![alt](url)`
 *    `![alt]\n   (url)` 也覆盖到
 * --------------------------------------------------------------------- */
function normalizeBrokenImageSyntax(body: string): string {
  return body.replace(
    /(!\[[^\]]*\])\s*\n\s*\((\s*https?:\/\/[^)\s]+)\)/g,
    (_match, alt, url) => `${alt}(${url})`,
  )
}

/* -------------------------------------------------------------------------
 * 5. 顶层入口：把 markdown body 渲染为 React node 数组
 *    - 段落按空行切分
 *    - 如果「整段只包含一张图」且没有其它文字 → 渲染为 <figure>
 *    - 段内夹杂图 + 文字 → 文本一个 <p>，图片依次追加 <figure>
 * --------------------------------------------------------------------- */
export function renderNewsBody(
  body: string | undefined | null,
): React.ReactNode[] {
  if (!body || !body.trim()) return []

  const normalized = normalizeBrokenImageSyntax(body)
  // 段切分：连续两个换行（允许之间有空白）算一段
  const paragraphs = normalized
    .split(/\n[ \t]*\n+/)
    .map((p) => p.trim())
    .filter(Boolean)

  const nodes: React.ReactNode[] = []
  paragraphs.forEach((paragraph, pIndex) => {
    const images: ImageMeta[] = []
    const tokens = tokenizeInline(paragraph)

    // 收集图片（让 renderer 把它们逐个登记到 images）
    const inlineNodes = renderInline(tokens, `p${pIndex}`, (meta) => {
      images.push(meta)
    })

    // 整段只有一个图片 token 且没有真实文字 → 用 figure
    const hasOnlyOneImage =
      images.length > 0 &&
      tokens.every((t) => t.kind === "image" || (t.kind === "text" && !t.value.trim()))

    if (images.length === 0) {
      // 纯文本段落
      nodes.push(
        <p
          key={`p-${pIndex}`}
          className="text-lg font-medium leading-relaxed text-slate-600"
        >
          {inlineNodes}
        </p>,
      )
    } else if (hasOnlyOneImage && images.length === 1) {
      const img = images[0]
      nodes.push(
        <figure key={`p-${pIndex}`} className="my-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img.src}
            alt={img.alt}
            title={img.title}
            loading="lazy"
            className="mx-auto w-full max-w-3xl rounded-2xl border border-slate-200 shadow-md"
          />
          {img.alt ? (
            <figcaption className="mt-3 text-center text-sm text-slate-500">
              {img.alt}
            </figcaption>
          ) : null}
        </figure>,
      )
    } else {
      // 多图，或图 + 文字混合：先整段一个 <p> 包文本，再追加 figure 列表
      const hasText = tokens.some(
        (t) => (t.kind === "text" && t.value.trim()) || t.kind === "link" || t.kind === "bold" || t.kind === "italic" || t.kind === "code",
      )
      if (hasText) {
        nodes.push(
          <p
            key={`p-${pIndex}`}
            className="text-lg font-medium leading-relaxed text-slate-600"
          >
            {inlineNodes}
          </p>,
        )
      }
      images.forEach((img, i) => {
        const key = `p-${pIndex}-img-${i}`
        nodes.push(
          <figure key={key} className="my-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.src}
              alt={img.alt}
              title={img.title}
              loading="lazy"
              className="mx-auto w-full max-w-3xl rounded-2xl border border-slate-200 shadow-md"
            />
            {img.alt ? (
              <figcaption className="mt-3 text-center text-sm text-slate-500">
                {img.alt}
              </figcaption>
            ) : null}
          </figure>,
        )
      })
    }
  })

  return nodes
}
