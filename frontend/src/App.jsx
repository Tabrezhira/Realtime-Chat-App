import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"


function App() {


  return (

    <div>
          <Navbar/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/' element={<HomePage/>}/>
  
      </Routes>


    </div>
  )
}

export default App
