// Cloudflare Pages Function —— Decap CMS GitHub OAuth 授权跳转
// 路径：/api/auth/authorize
// Decap 的 github backend（base_url=https://finmentors.org/api/auth, auth_endpoint=authorize）
// 会请求此端点，由本函数把用户重定向到 GitHub OAuth 授权页。
//
// 依赖 Cloudflare Pages 环境变量（不进仓库）：
//   DECAP_GITHUB_CLIENT_ID     —— GitHub OAuth App (finmentor) 的 Client ID
//   DECAP_GITHUB_CLIENT_SECRET —— GitHub OAuth App (finmentor) 的 Client Secret

interface Env {
  DECAP_GITHUB_CLIENT_ID: string
  DECAP_GITHUB_CLIENT_SECRET: string
}

export async function onRequest(context: { request: Request; env: Env }) {
  const clientId = context.env.DECAP_GITHUB_CLIENT_ID
  const origin = new URL(context.request.url).origin
  const redirectUri = `${origin}/api/auth/callback`

  if (!clientId) {
    return new Response("Missing DECAP_GITHUB_CLIENT_ID", { status: 500 })
  }

  const githubAuthUrl = new URL("https://github.com/login/oauth/authorize")
  githubAuthUrl.searchParams.set("client_id", clientId)
  githubAuthUrl.searchParams.set("redirect_uri", redirectUri)
  githubAuthUrl.searchParams.set("scope", "repo")
  // 简单的 anti-CSRF state（开发期可接受；如需更强可结合 cookie）
  githubAuthUrl.searchParams.set("state", crypto.randomUUID())

  return Response.redirect(githubAuthUrl.toString(), 302)
}
