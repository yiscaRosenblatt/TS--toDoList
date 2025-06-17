import { useState } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import EmployeePage from "./pages/EmployeePage";
import FavoritesPage from "./pages/FavoritesPage"
import FavInfoPage from "./pages/FavInfoPage"


function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
       <Route path="/" element={<HomePage />} />
  <Route path="/employee" element={<EmployeePage />} />
  <Route path="/favs" element={<FavoritesPage />} />
   <Route path="/favs/employee" element={<FavInfoPage />} /> 
      </Routes>
     
    </BrowserRouter>
  )
}

export default App
