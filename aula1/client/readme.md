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


Entendendo a estrutura do projeto criado:
- **node_modules**: pasta com as dependências do projeto.
- **public**: pasta com os arquivos públicos da aplicação.
- **src**: pasta com os códigos do projeto.
	-   **main.tsx**: esse arquivo declara a renderização da aplicação utilizando a biblioteca _react-dom_. Esse arquivo não precisa ser modificado, ele serve de _entrypoint_ da aplicação e por isso deve ter a configuração mínima para tal.
	- **App.tsx**: é um componente componente React que vem criado no projeto inicial. Ao abrir o arquivo, é possível observar que existe código TSX dentro dele. Esse código é retornado pelo método _render()_, que é padrão de todos os objetos  _Component_  do React. Ele retorna a representação HTML daquele componente que será exibida no navegador.
	- **App.css**: é o arquivo com os estilos CSS para o componente _App.js_.
- **index.html**: é o único arquivo HTML da aplicação e é obrigatório. Não será necessário modificá-lo e deve ser mantida a div _root_, pois o conteúdo dinâmico da aplicação será exibido dentro dessa div.
- **package.json**: arquivo de dependências do projeto. Todo projeto que utiliza o NodeJS precisa desse arquivo. As principais dependências do React já estão declaradas assim como os scripts de deploy da aplicação.

# Referências

[1] React. Disponível em: https://pt-br.reactjs.org/.

[2] Vite. Disponível em: https://vitejs.dev/