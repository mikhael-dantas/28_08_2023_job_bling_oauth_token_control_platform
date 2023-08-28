"use server"

export async function getTokenHandler(args: { code: string; state: string }) {
  const { code, state } = args
  const url = "https://bling.com.br/Api/v3/oauth/token"
  const clientId = "add005a907380ea659e202c0765d7fc75afdb606"
  const clientSecret = "623b224203175ab0311f078fea9ab09e4c46dcc6ca2f9f65eeb281132e11"
  const credenciais = `${clientId}:${clientSecret}`
  const base64 = Buffer.from(credenciais).toString("base64")
  const body = new URLSearchParams()
  body.append("grant_type", "authorization_code")
  body.append("code", code)
  body.append("state", state)

  // Removed 'mode: "no-cors"' as this mode doesn't allow you to access the response data
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "1.0",
      Authorization: `Basic ${base64}`,
    },
    body: body.toString(), // Convert URLSearchParams to string
  }).catch((err) => {
    return {
      json: () => {
        return { error: err }
      },
    }
  })

  const data = await response.json()
  return data
}
