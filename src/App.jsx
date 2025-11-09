import { BrowserRouter, Routes, Route } from "react-router-dom"
import DefaultLayout from "./layouts/DefaultLayout"
import HomePage from "./pages/HomePage"
import MoviesList from "./pages/MoviesList"
import AdminPage from "./pages/AdminPage"

function App() {

  return (
    <>
      <BrowserRouter>
            <Routes>
                <Route element={<DefaultLayout/>}>
                    <Route path='/' element={<HomePage/>}/>
                    <Route path="/movies" element={<MoviesList/>}/>
                    <Route path="/admin" element={<AdminPage/>}/>
                </Route>

            </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
