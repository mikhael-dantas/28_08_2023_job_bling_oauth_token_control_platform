"use client"

import { getTokenHandler } from "@/server/bling/oauth"
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

  useEffect(() => {
    getTokenHandler({ code: props.searchParams.code, state: props.searchParams.state }).then((data) => {
      alert(JSON.stringify(data))
      console.log(data)
      // setTimeout(() => {
      //   window.close()
      // }, 2000)
    })
  }, [])

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <i className="fas fa-spinner animate-spin text-6xl" />
    </div>
  )
}

export default Callback
