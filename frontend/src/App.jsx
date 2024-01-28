import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Dashboard, Signin, Signup, Transfer } from "./pages"
import { Toaster } from "react-hot-toast";
import { RecoilRoot } from "recoil";
function App() {
  return (
    <RecoilRoot>
    <div className="flex justify-center items-center h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<Signin/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/transfer/:id" element={<Transfer/>}/>
        </Routes>
      </BrowserRouter>
      <Toaster position="bottom-right"/>
    </div>
    </RecoilRoot>
  )
}

export default App
