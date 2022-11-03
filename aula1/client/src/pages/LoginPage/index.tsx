import axios from 'axios';
import { ChangeEvent, useState } from 'react'

export function LoginPage() {
    const [form, setForm] = useState({
        username: '',
        password: '',
    });

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;
        setForm((previousForm) => {
            return {
                ...previousForm,
                [name]: value,
            }
        });
    }

    const onClickLogin = () => {
        const userLogin = {
            username: form.username,
            password: form.password,
        };
        axios.post('http://localhost:8080/login', userLogin)
            .then((response) => {
                console.log(response);
            })
            .catch((errorResponse) => {
                console.log(errorResponse);
            });
    }
    return (
        <div className="container">
            <h1 className="text-center">Login</h1>

            <div className="col-12 mb-3">
                <label>Informe seu usuário</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Informe o seu usuário"
                    onChange={onChange}
                    value={form.username}
                    name="username"
                />
            </div>

            <div className="col-12 mb-3">
                <label>Informe sua senha</label>
                <input
                    type="password"
                    className="form-control"
                    placeholder="Informe a sua senha"
                    onChange={onChange}
                    value={form.password}
                    name="password" />
            </div>

            <div className="text-center">
                <button
                    className="btn btn-primary"
                    onClick={onClickLogin}>Entrar</button>
            </div>
        </div>
    )

}