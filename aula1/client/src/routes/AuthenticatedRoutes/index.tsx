import { Routes, Route } from 'react-router-dom'
import { NavBar } from '../../components/NavBar'
import { HomePage } from '../../pages/HomePage'

export function AuthenticatedRoutes() {

    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<HomePage />} />


                <Route path="*" element={<HomePage />} />
            </Routes>
        </>
    )
}