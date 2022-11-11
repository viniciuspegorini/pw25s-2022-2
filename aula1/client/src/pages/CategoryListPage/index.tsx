import { Link } from 'react-router-dom';

export function CategoryListPage() {

    return (
        <div className="container">
            <h1 className="text-center">Lista de Categoria</h1>
            <div className="text-center">
                <Link className="btn btn-success" to="/categories/new">
                    Nova Categoria
                </Link>
            </div>
        </div>
    )
}