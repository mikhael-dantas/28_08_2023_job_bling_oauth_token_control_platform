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
      <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2" onClick={handlePopupOpen}>
        Iniciar Autorização
      </button>
    </div>
  )
}

export default Page
