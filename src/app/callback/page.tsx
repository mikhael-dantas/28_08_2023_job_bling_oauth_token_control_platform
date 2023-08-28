"use client"
import { useEffect, useState } from "react"
import { getTokenHandler } from "@/server/bling/oauth/oauth"

const Callback: React.FC = (props: any) => {
  const [error, setError] = useState<string>("")
  useEffect(() => {
    getTokenHandler({ code: props.searchParams.code, state: props.searchParams.state }).then(async (data) => {
      console.log(data)
      if (data.error) {
        setError(data.error.message)
        return
      }
      setTimeout(() => {
        window.close()
      }, 2000)
    })
  }, [props.searchParams.code, props.searchParams.state])

  return (
    <div className="flex justify-center items-center min-h-screen w-screen">
      {error ? (
        <div className="flex flex-col justify-center items-center">
          <i className="fas fa-exclamation-triangle text-6xl text-red-500" />
          <h1 className="text-2xl text-red-500">{error}</h1>
        </div>
      ) : (
        <i className="fas fa-spinner animate-spin text-6xl" />
      )}
    </div>
  )
}

export default Callback
