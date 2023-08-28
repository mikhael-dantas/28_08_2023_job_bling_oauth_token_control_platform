"use client"

import { useEffect } from "react"

const Callback: React.FC = (props: any) => {
  // get the code
  // follow the instructions
  /**Tokens de acesso
Com o authorization_code o client app deve realizar uma requisição POST para o endpoint /token, nisso o code será validado e os tokens de acesso serão retornados. Lembrando que o prazo para realizar esta requisição é de 1 minuto, este é o tempo de expiração do code.

Formato da requisição HTTP que deve ser utilizado e uma tabela com o conteúdo que deve ser inserido no body:

POST /Api/v3/oauth/token? HTTP/1.1
Host: https://www.bling.com.br
Content-Type: application/x-www-form-urlencoded
Accept: 1.0
Authorization: Basic [base64_das_credenciais_do_client_app]
grant_type=authorization_code&code=[authorization_code] */
  // show all data stringfied on alert
  // then close window after 2 seconds
  // all while loading animation is running

  const getTokenHandler = async () => {
    const { code, state } = props.searchParams
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
      console.log("err")
      console.error(err) // Changed to console.error() for better visibility
      console.log("err")
      throw new Error(err)
    })

    const data = await response.json()
    console.log(data)
    return data
  }

  useEffect(() => {
    getTokenHandler().then((data) => {
      alert(JSON.stringify(data))
      setTimeout(() => {
        window.close()
      }, 2000)
    })
  }, [])

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <i className="fas fa-spinner animate-spin text-6xl" />
    </div>
  )
}

export default Callback
