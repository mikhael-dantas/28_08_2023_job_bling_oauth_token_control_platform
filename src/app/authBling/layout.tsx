export const metadata = {
  title: "Integração de Aplicação",
  description: "Integração bling",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <div className="bg-gray-100 p-8 rounded-md shadow-md w-96">
        <div className="mb-6 text-center">
          {/* Placeholder for Logo */}
          <h1 className="text-2xl font-bold mt-2">{metadata.title}</h1>
          <i className="fas fa-3x fa-sign-in-alt text-blue-500 mt-4" />
          <h1 className="text-lg mt-6">Inicie clicando no botão abaixo</h1>
        </div>
        {children}
      </div>
    </div>
  )
}
