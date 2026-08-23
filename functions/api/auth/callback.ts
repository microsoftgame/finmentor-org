// Cloudflare Pages Function —— Sveltia CMS GitHub OAuth 回调
// 路径：/api/auth/callback
// GitHub 授权后回跳到这里，本函数用 code 换取 access_token，
// 然后通过 postMessage 把 token 传回主窗口（这是 Sveltia CMS 的标准认证方式）。
//
// 依赖 Cloudflare Pages 环境变量（不进仓库）：
//   DECAP_GITHUB_CLIENT_ID
//   DECAP_GITHUB_CLIENT_SECRET

interface Env {
  DECAP_GITHUB_CLIENT_ID: string
  DECAP_GITHUB_CLIENT_SECRET: string
}

export async function onRequest(context: { request: Request; env: Env }) {
  const { request, env } = context
  const url = new URL(request.url)
  const origin = url.origin
  const redirectUri = `${origin}/api/auth/callback`
  const code = url.searchParams.get("code")

  if (!code) {
    return new Response("Missing authorization code", { status: 400 })
  }

  // 1) 用 code 换取 access_token
  const tokenResp = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      client_id: env.DECAP_GITHUB_CLIENT_ID,
      client_secret: env.DECAP_GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: redirectUri,
    }),
  })

  if (!tokenResp.ok) {
    return new Response("GitHub token exchange failed", { status: 502 })
  }

  const tokenData = (await tokenResp.json()) as {
    access_token?: string
    error?: string
  }
  const accessToken = tokenData.access_token

  if (!accessToken) {
    return new Response(
      `Failed to obtain access token: ${tokenData.error ?? "unknown"}`,
      { status: 400 }
    )
  }

  // 2) 返回一个 HTML 页面，该页面用 postMessage 把 token 传回 opener，
  //    然后关闭 popup。这是 Sveltia CMS 规定的标准认证流程。
  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Authenticating…</title></head>
<body>
<script>
  // Sveltia CMS 认证：把 token 通过 postMessage 发给 opener 窗口
  if (window.opener) {
    window.opener.postMessage(
      { type: "sveltia-auth-success", token: "${accessToken}" },
      "${origin}"
    );
    window.close();
  } else {
    // fallback: 如果没有 opener，跳转到主窗口（正常不应该走到这里）
    window.location.href = "${origin}/admin/#/auth/github/${accessToken}";
  }
</script>
<p>Authentication successful. You can close this window.</p>
</body>
</html>`

  return new Response(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      // 允许 opener 跨域接收 postMessage
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "no-store",
    },
  })
}
