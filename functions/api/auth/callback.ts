// Cloudflare Pages Function —— Decap CMS GitHub OAuth 回调（code 换 token）
// 路径：/api/auth/callback
// GitHub 授权后回跳到这里，本函数用 code 换取 access_token，
// 再把用户重定向回 Decap 后台并把 token 写进 URL hash（Decap 约定的回跳格式）。
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

  const tokenData = (await tokenResp.json()) as { access_token?: string; error?: string }
  const accessToken = tokenData.access_token

  if (!accessToken) {
    return new Response(`Failed to obtain access token: ${tokenData.error ?? "unknown"}`, {
      status: 400,
    })
  }

  // 2) 重定向回 Decap 后台，token 放在 hash（Decap 约定格式 /admin/#/auth/github/<token>）
  const adminUrl = `${origin}/admin/#/auth/github/${accessToken}`
  return Response.redirect(adminUrl, 302)
}
