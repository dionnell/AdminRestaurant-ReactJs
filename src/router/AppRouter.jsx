import { Routes, Route } from "react-router"
import { Menu, Ordenes, NuevoPlatillo } from "../components/pages"
import { Sidebar } from '../components/ui/Sidebar'

export const AppRouter = () => {
  return (
    <>
        <div className="md:flex min-h-screen">
            <Sidebar/>

            <div className="md:w-4/6 lg:w-9/12 xl:w-4/5 p-6 bg-gray-100">
                <Routes>
                    <Route path="/" element={<Ordenes/>} />
                    <Route path="/menu" element={<Menu/>} />
                    <Route path="/nuevo-platillo" element={<NuevoPlatillo/>} />
                </Routes>
            </div>
        </div>
    </>
  )
}