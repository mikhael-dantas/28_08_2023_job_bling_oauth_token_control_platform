"use client"
import { useRouter } from "next/navigation"

export default function Tabs({ children }: any) {
  const router = useRouter()

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex p-4 bg-blue-500">
        <button
          className="flex-1 text-center p-2 hover:bg-blue-600 text-white"
          onClick={() => router.push("/authBling")}
        >
          <i className="mr-2 fa fa-sign-in-alt" /> <span className="text-white">Conectar Bling</span>
        </button>
        <button
          className="flex-1 text-center p-2 hover:bg-blue-600 text-white"
          onClick={() => router.push("/listTokens")}
        >
          <i className="mr-2 fa fa-list" /> <span className="text-white">Listagem</span>
        </button>
      </div>
      <div className="flex-grow p-8 bg-gray-100">{children}</div>
    </div>
  )
}
