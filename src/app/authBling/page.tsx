"use client"

import { getBlingInviteLinkFromDotEnv } from "@/server/bling/oauth/oauth"
import { useEffect, useState } from "react"

const Page: React.FC = () => {
  const [link, setLink] = useState<string>("")

  useEffect(() => {
    getBlingInviteLinkFromDotEnv().then((data) => {
      if (!data) {
        alert("Não foi possível obter o link de autorização do bling")
        return
      }
      setLink(data)
    })
  }, [])

  const handlePopupOpen = () => {
    window.open(link, "Autorização do Aplicativo", "width=500,height=500")
  }
  // useEffect(() => {
  // }, [])
  return (
    <div className="max-w-md mx-auto p-4 flex flex-col justify-center items-center w-full">
      <div className="flex flex-col justify-center items-center">
        <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2" onClick={handlePopupOpen}>
          <i className="mr-2 fa fa-sign-in-alt" />
          Iniciar Autorização
        </button>
        <button
          className="bg-green-600 hover:bg-green-500 text-white rounded-md px-4 py-2 mt-4"
          onClick={() => window.open("https://www.bling.com.br/login", "Bling", "width=500,height=500")}
        >
          Entrar em outra conta Bling
        </button>
      </div>
      {/* lista de instruções sobre o fluxo */}
      <div className="mt-4">
        <h1 className="text-xl font-semibold">Instruções</h1>
        <ol className="list-decimal list-inside">
          <li className="mt-4">
            Clique no botão acima para iniciar o processo de autorização do aplicativo. Uma nova janela será aberta.
          </li>
          <li className="mt-4">
            Faça login com a conta que deseja integrar. Ou se você já estiver logado, autorize o aplicativo.
          </li>
          <li className="mt-4">Em seguida, a janela se fechará Automaticamente após confirmação</li>
          <li className="mt-4">Clique em "Entrar em outra conta" e repita o processo</li>
        </ol>
      </div>
    </div>
  )
}

export default Page
