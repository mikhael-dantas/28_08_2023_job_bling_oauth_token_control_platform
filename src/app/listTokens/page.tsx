"use client"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import ListTokens from "./see/TokensPage"

const Tokens: React.FC = () => {
  const [pass, setPass] = useState<string>("")
  const [passParsed, setPassParsed] = useState<string>("")

  const router = useRouter()
  const handleRedirect = () => {
    // enviar para /listTokens/see com header pass
    setPassParsed("")
    setTimeout(() => {
      setPassParsed(pass)
    }, 2000)
  }

  return (
    //  componetne bonito com input e botão para digitar a senha do sistema e ver os tokens
    <div className="flex flex-col justify-center items-center min-h-[60vh] w-screen">
      <h1 className="text-4xl font-semibold mb-4">Ver Tokens</h1>
      <input
        type="password"
        className="border-2 border-gray-400 rounded-md p-2"
        placeholder="Senha do sistema"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={handleRedirect}
      >
        Ver Tokens
      </button>

      {passParsed && <ListTokens pass={passParsed} />}
      <footer className="mt-[10rem]  w-full min-h-[10rem]"></footer>
    </div>
  )
}

export default Tokens
