import { Routes, Route } from 'react-router-dom'
import { HomePage } from '../../pages/HomePage'

export function AuthenticatedRoutes() {

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />


            <Route path="*" element={<HomePage />} />
        </Routes>

    )
}