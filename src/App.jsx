import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePages from './Pages/Home'
import MapPages from './Pages/MapPage'
import ResultPages from './Pages/ResultPage'
import Navbar from './Components/Navbar'

function App() {



  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<HomePages />}></Route>
        <Route path='/Map' element={<MapPages />}></Route>
        <Route path='/Result' element={<ResultPages />}></Route>
      </Routes>
    </>
  )
}

export default App
