import { ICategory } from '../commons/interfaces';
import { api } from '../lib/axios'

const save = (category: ICategory) => {
    return api.post('/categories', category);
}

const CategoryService = {
    save,
}

export default CategoryService;