import { Navbar, Footer } from "./"

const Layout = ({children}) => {
  return (
    <div className="flex flex-col items-center h-full w-full">
        <Navbar />
        <hr className="text-black"/>     
        <div className="min-h-main w-full">
          {children}
        </div>
        <Footer />
    </div>
  )
}

export default Layout