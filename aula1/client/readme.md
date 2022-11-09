# React  (back-end)

## Introdução

O React é uma biblioteca JavaScript para criar interfaces de usuário. O React é **declarativo** fazendo com que a criação de UIs interativas seja uma tarefa fácil. Uma das premissas do React é que o desenvolvedor crie *views* simplificadas para cada estado da aplicação, e o React irá atualizar e renderizar de forma eficiente apenas os componentes necessários na medida em que os dados mudam. A criação de *views* declarativas fazem com que seu código seja mais previsível e simples de depurar [1].

O React assim como outras bibliotecas e *frameworks* JavaScript é baseado em componentes. O que facilita gerenciar de maneira mais eficaz os diferentes módulos da aplicação. O React permite criar componentes encapsulados que gerenciam seu próprio estado, para então combina-lo para formar UIs complexas.

No React toda lógica do componente é escrita em JavaScript ou TypeScript e não em templates, permitindo ao desenvolvedor passar diversos tipos de dados ao longo da sua aplicação e ainda manter o estado da aplicação fora do DOM.

O React normalmente utiliza JSX (**JavaScript Syntax Extension**) ou TSX (**TypeScript Syntax Extension**)  para a criação dos componentes, que é uma extensão de sintaxe para JavaScript/TypeScript. A utilização do TSX e a criação de componentes será abordada mais abaixo deste texto.

#### Estrutura do projeto front-end

Para criação do projeto foi utilizado o Vite [2], que é uma ferramenta de construção para projetos web que visa fornecer uma experiência de desenvolvimento mais rápida e enxuta.
Para criar o projeto para executar no terminal o comando:

```cmd
npm create vite@latest
```
Então informar o nome do projeto: **client**, o *framework*: **React** e a linguagem de programação: **TypeScript**.

Na sequência é importante instalar as dependências do projeto, bastando executar no terminal dois comandos, o primeiro para entrar na pasta da aplicação criada e o segundo para instalar as dependências:

```cmd
cd client
npm install
```
Após finalizado esse processo abrir a pasta do projeto (*client*) no editor que será utilizado no desenvolvimento do projeto.

Entendendo a estrutura do projeto criado:
- **node_modules**: pasta com as dependências do projeto.
- **public**: pasta com os arquivos públicos da aplicação.
- **src**: pasta com os códigos do projeto.
	-   **main.tsx**: esse arquivo declara a renderização da aplicação utilizando a biblioteca _react-dom_. Esse arquivo não precisa ser modificado, ele serve de _entrypoint_ da aplicação e por isso deve ter a configuração mínima para tal.
	- **App.tsx**: é um componente componente React que vem criado no projeto inicial. Ao abrir o arquivo, é possível observar que existe código TSX dentro dele. Esse código é retornado pelo método _render()_, que é padrão de todos os objetos  _Component_  do React. Ele retorna a representação HTML daquele componente que será exibida no navegador.
	- **App.css**: é o arquivo com os estilos CSS para o componente _App.js_.
- **index.html**: é o único arquivo HTML da aplicação e é obrigatório. Não será necessário modificá-lo e deve ser mantida a div _root_, pois o conteúdo dinâmico da aplicação será exibido dentro dessa div.
- **package.json**: arquivo de dependências do projeto. Todo projeto que utiliza o NodeJS precisa desse arquivo. As principais dependências do React já estão declaradas assim como os scripts de deploy da aplicação.

#### Executando o projeto

Para executar o projeto basta abrir o terminal na pasta do projeto e executar o comando:

```cmd
npm run dev
```
O terminal irá gerar uma resposta semelhante a essa:

```cmd
PS C:\dev\client> npm run dev

> client@0.0.0 dev
> vite


  VITE v3.2.0  ready in 480 ms

  ➜  Local:   http://127.0.0.1:5173/
  ➜  Network: use --host to expose
```
Na mensagem gerada é possível visualizar que a aplicação foi iniciada e está sendo executada na porta **5173**. Portanto, para testar a aplicação em um navegador basta acessar o endereço: **http://127.0.0.1:5173/**  ou **http://localhost:5173/**. Esse código gerado por padrão possui um botão que incrementa um contador a cada clique, essa página será alterada durante o desenvolvimento do projeto. Uma característica importante do projeto criado, é que ao alterarmos qualquer item do código **JSX** do componente **App.tsx** ele será automáticamente atualizado no navegador ao salvar o arquivo, não necessitando reiniciar o servidor toda vez que uma nova alteração é feita no código.

#### Iniciando o desenvolvimento da aplicação

O primeiro passo a ser realizado será alterar o conteúdo dos arquivos **App.tsx** e **App.css**.  O conteúdo do arquivo **App.css** será todo removido, deixando o arquivo em branco. E o arquivo **App.tsx** ficará com o seguinte conteúdo:

```ts
import  './App.css'
export  function App() {
	return (
		<div>
			<h1>Bem vindo!</h1>
		</div>
	)
}
```

###### Cadastro de usuários

O próximo passo é iniciar o desenvolvimento dos componentes da aplicação. A aplicação que será desenvolvida irá consumir os recursos da API REST criada nas aulas sobre o lado servidor de uma aplicação Web. Logo o primeiro componente a ser desenvolvido será o cadastro de um novo usuário, para isso criar a pasta **/src/pages/UserSignUpPage**. Na pasta **pages** serão criados todos os componentes que serão renderizados ao usuário. Dentro da pasta **UserSignUpPage** criar o arquivo **index.jsx**, com o seguinte conteúdo  (comentários no código):

```ts
/* 
	O ChangeEvent será utilizado para tipar o parâmetro do método onChange, que será utilizado para recuperar os valores digitados nos campos de texto ao cadastrar um novo usuário.
	O hook[4] useState será utilizado para manter os valores informados pelo usuário nos campos de texto no estado (state[3]) da aplicação.	
	IUserSignUp - interface utilizada para tipar os objeto que armazena os dados de usuário
	AuthService - contém as funções para realizar as requisições HTTP à API REST. No caso do cadastro de usuário uma requisição do tipo HTTP POST
*/
import { ChangeEvent, useState } from  'react'
import { IUserSignUp } from  '../../commons/interfaces';
import AuthService from  '../../service/AuthService';

export  function UserSignupPage() {
	/* Criação de um objeto chamado `form` no state para armazenar o username e passord do usuário */
	const [form, setForm] = useState({
		displayName: '',
		username: '',
		password: '',
	});
	/* Criação de um objeto chamado `errors` no state para armazenar os erros de validação retornados pelo servidor */
	const [errors, setErrors] = useState({
		displayName: '',
		username: '',
		password: '',
	});
	/* função criada para monitorar o evento Change dos componentes input */
	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { value, name } = event.target;
		/* Recuperar o valor do state e altera apenas a propriedade relacionada ao input que está sendo editado
		*/
		setForm((previousForm) => {
			return {
				...previousForm,
				[name]: value,
			}
		});
		/* Limpa o valor do erro relacionado à propriedade do input que está sendo editada */
		setErrors((previousErrors) => {
			return {
				...previousErrors,
				[name]: '',
			}
		});
	}
	/* trata o click o botão para cadastrar um novo usuário */
	const onClickSignUp = () => {
		/* recupera o valor do state e cria um objeto do tipo IUserSignUp */
		const userSignUp: IUserSignUp = {
			displayName: form.displayName,
			username: form.username,
			password: form.password,
		};
		/* Chama o método signup do service AuthService, passando o usuário que será enviado via POST para API */
		AuthService.signup(userSignUp)
			.then((response) => {
				/* Em caso de sucesso imprime o resultado no console */
				console.log(response);
			})
			.catch((errorResponse) => {
				/* Em caso de erro imprime o resultado no console e preenche o conjunto de erros armazenado no state com os dados vindos da validação realizada na API. */
				console.log(errorResponse);
				if (errorResponse.response.data.validationErrors) {
					setErrors(errorResponse.response.data.validationErrors);
				}
			}
		);
	}
	/*Retorna o TSX com o formulário de cadastro. */
	return (
		<div  className="container">
			<h1  className="text-center">Sign Up</h1>
			<div  className="col-12 mb-3">
				<label>Informe seu nome</label>
				{/*input utilizado para informar o nome do usuário. Nos atributos onChange e value são informados o método que trata a atualização do state e a ligação com o valor armazenado no state, respectivamente.*/}
				<input 
					type="text"
					className={errors.displayName ? "form-control is-invalid" : "form-control"}
					placeholder="Informe o seu nome"
					onChange={onChange}
					value={form.displayName}
					name="displayName"
				/>
				{errors.displayName && <div  className="invalid-feedback">{errors.displayName}</div>}
			</div>
			<div  className="col-12 mb-3">
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
			<div  className="col-12 mb-3">
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
			<div  className="text-center">
				{/* Ao clicar no botão é chamado o método onClickSignUp */}
				<button
					className="btn btn-primary"
					onClick={onClickSignUp}
				>Cadastrar</button>
			</div>
		</div>
	)
}
```
O código dos arquivos **interfaces** e **AuthService** serão apresentados na sequência. Dentro da pasta **src** criar uma pasta chamada **commons** e dentro dela o arquivo **interfaces.ts**. O arquivo **interfaces.ts** irá armazenar todas as interfaces que serão utilizados para tipar os objetos que serão trocados nas funções dentro da aplicação. A interface **IUserSignUp** contém os atributos necessários para o cadastro de um novo usuário no servidor, seguindo os mesmos nomes de atributos da classe **User** desenvolvida na API REST.

```ts
 export interface IUserSignUp {
	displayName: string;
	username: string;
	password: string;
}
```

O arquivo **AuthService.ts** irá conter as funções para realizar o cadastro e a autenticação na API. Inicialmente será implementada a função **signup** que será responsável por realizar uma requisição HTTP do tipo POST para API. As requisições HTTP serão realizadas utilizando a biblioteca **axios**. Para padronizar a configuração da biblioteca axios foi criado o arquivo **src/lib/axios.ts**, nesse arquivo é configurado a rota base para API, no caso dos testes locais: **http://localhost:8080**.

```ts
import { IUserSignUp } from  '../commons/interfaces';
import { api } from  '../lib/axios'

const signup = (user: IUserSignUp) => {
	return api.post('/users', user);
}

const AuthService = {
	signup,
}

export  default AuthService;
```

O arquivo **axios.ts** possui a configuração da baseURL para que a biblioteca **axios** realize todas as requisições a partir da URL informada, no caso desse projeto: **http://localhost:8080**.

```ts
import axios from  'axios';

export  const api = axios.create({
	baseURL: 'http://localhost:8080'
});
```
Para testar a funcionalidade criada é necessário adicionar o componente **UserSignUpPage** ao componente **App**, dessa maneira, o arquivo **App.tsx** irá ficar com o seguinte conteúdo:

```ts
import  './App.css'
import { UserSignUpPage } from './pages/UserSignUpPage'

export  function App() {
	return (
		<div>
			<UserSignUpPage   />
		</div>
		)
}
```


###### Autenticação
Com o processo de criação de um novo usuário finalizado, o próximo passo é permitir a autenticação no sistema, para isso será criado o componente **LoginPage** que vai conter o formulário para o usuário informar o seu **username** e **password**.

```ts
import { ChangeEvent, useState } from  "react"; 
import { IUserLogin } from  "../../commons/interfaces";
import AuthService from  "../../service/AuthService";
 
export  function LoginPage() {
	
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
		AuthService.login(userLogin).then((response) => {
			setPendingApiCall(false);
			console.log(response);
			}).catch((errorResponse) => {
				setPendingApiCall(false);
				console.log(errorResponse);
			}
		);
	};
	return (
		<div  className="container">
			<h1  className="text-center">Login</h1>
			<div  className="col-12 mb-3">
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
			<div  className="col-12 mb-3">
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
			<div  className="text-center">
				<button
					disabled={pendingApiCall}
					className="btn btn-primary"
					onClick={onClickLogin}
				> {pendingApiCall && (
					<div className="spinner-border text-light-spinner spinner-border-sm mr-sm-1"
						role="status"><span  className="visually-hidden">Aguarde...</span>
					</div>
				   )}
				   Entrar
			   </button>
			</div>
		</div>
	);
}
```


# Referências

[1] React. Disponível em: https://pt-br.reactjs.org/.

[2] Vite. Disponível em: https://vitejs.dev/

[3] https://reactjs.org/docs/state-and-lifecycle.html

[4] https://reactjs.org/docs/hooks-intro.html