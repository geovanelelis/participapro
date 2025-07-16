import { Header } from '@/components/layout/Header'
import { Sidebar } from '@/components/layout/Sidebar'

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-72 flex min-h-screen relative w-full bg-gray-50">
        <Header />
        <main className="pt-30 pb-20 px-6 w-7xl mx-auto">{children}</main>
      </div>
    </div>
  )
}
