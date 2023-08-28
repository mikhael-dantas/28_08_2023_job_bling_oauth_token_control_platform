"use client"
import { useRouter } from "next/navigation"

// página bonita com redirecionamentos pra /authBling e /listTokens
const Page: React.FC = () => {
  const router = useRouter()

  return (
    <div className="flex flex-col justify-center items-center min-h-[60vh] w-screen">
      <h1 className="text-4xl font-semibold mb-4">Aplicação de conexão com aplicativo</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          router.push("/authBling")
        }}
      >
        Autorizar aplicativo
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={() => {
          router.push("/listTokens")
        }}
      >
        Ver Tokens
      </button>
    </div>
  )
}

export default Page
