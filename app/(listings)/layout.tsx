import SearchInput from '@/components/ui/SearchInput'
import DashboardNavbar from '@/components/ui/dashboardHeader'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <DashboardNavbar />
        <div className="flex flex-col gap-10 items-center h-screen justify-center p-6">
          <SearchInput />
        </div>
        <div className="flex flex-col -mt-60 items-center w-full">{children}</div>
      </body>
    </html>
  )
}
