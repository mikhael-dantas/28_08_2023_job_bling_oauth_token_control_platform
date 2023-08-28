export const metadata = {
  title: "Integração de Aplicação",
  description: "Integração bling",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-100 p-8 rounded-md shadow-md w-96">
        <div className="mb-6 text-center">
          {/* Placeholder for Logo */}
          <h1 className="text-2xl font-bold mt-2">{metadata.title}</h1>
          <h1 className="text-2xl font-bold mt-6">Teste</h1>
        </div>
        {children}
      </div>
    </div>
  )
}
