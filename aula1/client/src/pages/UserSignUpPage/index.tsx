import { ChangeEvent, useState } from 'react'
import axios from 'axios';
import { IUserSignUp } from '../../commons/interfaces';
import AuthService from '../../service/AuthService';

export function UserSignupPage() {
    const [form, setForm] = useState({
        displayName: '',
        username: '',
        password: '',
    });
    const [errors, setErrors] = useState({
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

        setErrors((previousErrors) => {
            return {
                ...previousErrors,
                [name]: '',
            }
        });
    }

    const onClickSignUp = () => {
        const userSignUp: IUserSignUp = {
            displayName: form.displayName,
            username: form.username,
            password: form.password,
        };
        AuthService.signup(userSignUp).then((response) => {
            console.log(response);
        })
            .catch((errorResponse) => {
                console.log(errorResponse);
                if (errorResponse.response.data.validationErrors) {
                    setErrors(errorResponse.response.data.validationErrors);
                }
            });
    }

    return (
        <div className="container">
            <h1 className="text-center">Sign Up</h1>
            <div className="col-12 mb-3">
                <label>Informe seu nome</label>
                <input
                    type="text"
                    className={errors.displayName ? "form-control is-invalid" : "form-control"}
                    placeholder="Informe o seu nome"
                    onChange={onChange}
                    value={form.displayName}
                    name="displayName"
                />
                {errors.displayName &&
                    <div className="invalid-feedback">{errors.displayName}</div>}
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