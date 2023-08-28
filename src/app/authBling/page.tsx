"use client"

import { useEffect } from "react"

const Page: React.FC = () => {
  const handlePopupOpen = () => {
    window.open(
      "https://www.bling.com.br/OAuth2/views/authorization.php?response_type=code&client_id=add005a907380ea659e202c0765d7fc75afdb606&state=7ccd7689c789abc73bbf3b34225eb90d&scopes=98309+98310+98565+104142+104163+1563512+106168710+199272829+318257548+318257555+318257562+318257563+318257570+318257577+318257580+318257583+363953167+363953556+363953706+380039494+875116881+875116885+5862218180+6239411327+6239420709+13645012997+13645012998",
      "Autorização do Aplicativo",
      "width=500,height=500"
    )
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
