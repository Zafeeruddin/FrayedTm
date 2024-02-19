import { RecoilRoot } from "recoil"
import { Dashboard } from "../components/Dashboard"
import { Login } from "../components/Login"
import { Send } from "../components/Send"
import { SignUp } from "../components/SignUp"
import {BrowserRouter, Route, Routes} from "react-router-dom"
function App() {

  return (
    <div>
    <BrowserRouter>
      <RecoilRoot>
        <Routes>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/send" element={<Send/>}/>
        </Routes>
      </RecoilRoot>
    </BrowserRouter>

    </div>
  )
}

export default App
