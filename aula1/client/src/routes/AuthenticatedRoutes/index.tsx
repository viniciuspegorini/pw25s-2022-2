import { Routes, Route } from 'react-router-dom'
import { NavBar } from '../../components/NavBar'
import { CategoryFormPage } from '../../pages/CategoryFormPage'
import { CategoryListPage } from '../../pages/CategoryListPage'
import { HomePage } from '../../pages/HomePage'
import { ProductFormPage } from '../../pages/ProductFormPage'
import { ProductListPage } from '../../pages/ProductListPage'

export function AuthenticatedRoutes() {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<HomePage />} />

                <Route path="/categories" element={<CategoryListPage />} />
                <Route path="/categories/new" element={<CategoryFormPage />} />
                <Route path="/categories/:id" element={<CategoryFormPage />} />

                <Route path="/products" element={<ProductListPage />} />
                <Route path="/products/new" element={<ProductFormPage />} />
                <Route path="/products/:id" element={<ProductFormPage />} />

                <Route path="*" element={<HomePage />} />
            </Routes>
        </>
    )
}