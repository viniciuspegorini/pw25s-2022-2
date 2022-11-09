import { ChangeEvent, useState } from "react";
import { IUserLogin } from "../../commons/interfaces";
import AuthService from "../../service/AuthService";

export function LoginPage() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [pendingApiCall, setPendingApiCall] = useState(false);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setForm((previousForm) => {
      return {
        ...previousForm,
        [name]: value,
      };
    });
  };

  const onClickLogin = () => {
    setPendingApiCall(true);

    const userLogin: IUserLogin = {
      username: form.username,
      password: form.password,
    };
    AuthService.login(userLogin)
      .then((response) => {
        setPendingApiCall(false);
        console.log(response);
      })
      .catch((errorResponse) => {
        setPendingApiCall(false);
        console.log(errorResponse);
      });
  };
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
          name="password"
        />
      </div>

      <div className="text-center">
        <button
          disabled={pendingApiCall}
          className="btn btn-primary"
          onClick={onClickLogin}
        >
          {pendingApiCall && (
            <div
              className="spinner-border text-light-spinner spinner-border-sm mr-sm-1"
              role="status"
            >
              <span className="visually-hidden">Aguarde...</span>
            </div>
          )}
          Entrar
        </button>
      </div>
    </div>
  );
}
