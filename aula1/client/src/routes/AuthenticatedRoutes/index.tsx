import { Routes, Route } from 'react-router-dom'
import { NavBar } from '../../components/NavBar'
import { CategoryFormPage } from '../../pages/CategoryFormPage'
import { CategoryListPage } from '../../pages/CategoryListPage'
import { HomePage } from '../../pages/HomePage'

export function AuthenticatedRoutes() {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<HomePage />} />

                <Route path="/categories" element={<CategoryListPage />} />
                <Route path="/categories/new" element={<CategoryFormPage />} />

                <Route path="*" element={<HomePage />} />
            </Routes>
        </>
    )
}