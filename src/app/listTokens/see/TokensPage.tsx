"use client"
import { deleteTokens, readTokens } from "@/server/bling/oauth/oauth"
import React, { useEffect, useState } from "react"

const ListTokens: React.FC<any> = ({ pass }: any) => {
  const [tokenList, setTokenList] = useState<Token[]>([])

  useEffect(() => {
    readTokens(pass).then((data) => {
      if ("error" in data) {
        alert(data.error.message)
        return
      }
      setTokenList(data.reverse())
    })
  }, [])

  const handleDeleteToken = (id: number) => {
    const password = prompt("Digite o código YSAP do sistema:")
    if (password !== null) {
      if (password.length === 0) return
      // Only proceed if the user entered a password
      deleteTokens({ ids: [Number(id)], password }).then(() => {
        window.location.reload()
      })
    }
  }

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Access Tokens</h2>
      <table className="w-[90%] table-auto">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="px-6 py-3">Access E Refresh Token</th>
            <th className="px-6 py-3">Expira em</th>
            <th className="px-6 py-3">Criado em</th>
            <th className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody className="text-gray-600">
          {tokenList.map((token) => (
            <tr key={token.id} className="hover:bg-gray-100 transition-colors">
              <td className="px-6 py-4 ">
                <span
                  className="font-bold
                "
                >
                  access:{" "}
                </span>
                {token.access_token}{" "}
                <i
                  className="far fa-copy ml-2 text-blue-500 hover:text-blue-800 transition-colors cursor-pointer"
                  onClick={() => {
                    navigator.clipboard.writeText(token.refresh_token)
                  }}
                />
                <br />
                <span
                  className="font-bold
                "
                >
                  refresh:{" "}
                </span>
                {token.refresh_token}
                {/* botão pra copiar pra clipboard */}
                <i
                  className="far fa-copy ml-2 text-blue-500 hover:text-blue-800 transition-colors cursor-pointer"
                  onClick={() => {
                    navigator.clipboard.writeText(token.refresh_token)
                  }}
                />
              </td>
              <td className="px-6 py-4">{token.expires_in}</td>
              <td className="px-6 py-4">
                {/* data e hora formatados,formato atual: "2023-08-28 11:30:03" */}
                <span className="font-bold">
                  {new Date(token.created_at).toLocaleDateString("pt-BR")}{" "}
                  {new Date(token.created_at).toLocaleTimeString("pt-BR")}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <button
                  onClick={() => handleDeleteToken(token.id)}
                  className="text-red-600 hover:text-red-800 transition-colors"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ListTokens

interface Token {
  id: number
  access_token: string
  refresh_token: string
  expires_in: number
  token_type: string
  scope: string
  created_at: string
}
