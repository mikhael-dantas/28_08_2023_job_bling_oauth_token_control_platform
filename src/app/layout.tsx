import { Poppins } from "next/font/google"
import "../styles/globals.scss"
import Tabs from "./tabs"

export const metadata = {
  title: "Integração de Aplicação",
  description: "Integração bling",
}

const poppins = Poppins({ weight: ["400", "700"], subsets: ["latin"] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
      </head>
      <body className={poppins.className} id="root">
        <Tabs>{children}</Tabs>
      </body>
    </html>
  )
}
