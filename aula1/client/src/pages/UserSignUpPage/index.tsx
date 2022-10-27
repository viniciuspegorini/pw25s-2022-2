import { ChangeEvent, useState } from 'react'

export function UserSignupPage() {
    const [form, setForm] = useState({
        displayName: '',
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

    const onClickSignUp = () => {
        const userSignUp = {
            displayName: form.displayName,
            username: form.username,
            password: form.password,
        }
    }

    return (
        <div className="container">
            <h1 className="text-center">Sign Up</h1>

            <div className="col-12 mb-3">
                <label>Informe seu nome</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Informe o seu nome"
                    onChange={onChange}
                    value={form.displayName}
                    name="displayName"
                />
            </div>

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
                    onClick={onClickSignUp}>Cadastrar</button>
            </div>

        </div>
    )
}