# Aulas da disciplina de Programação para Web - PW25S-5SI - 2022/2

## Back-end 

### Softwares
	- JDK 11 ou superior
	- IDE:
		- ItelliJ IDEA
		- Spring Tools Suite 4
		- Eclipe for JavaEE ...
	- SDBG:
		- Postgresql
	- Ferramenta para testar a API:
		- Postman
		- Insomnia
	- Git
	- Docker
	
## Front-end 

### Softwares
	- IDE:
		- Visual Studio Code
		- Web Storm
		- Atom...
	- Git
	- Node.js
	- Docker

	- Moodle:
		- Disciplina PW25S_1, código de inscrição: pw25s_1
	
## Projetos:

### aula1 -  Introdução
O conteúdo do projeto é uma introdução sobre os *frameworks* **Spring, Spring Boot e Spring Data**.


# Trabalhos da disciplina:

## Trabalho final: 

Deverá ser desenvolvido uma aplicação WEB para controle financeiro pessoal.

É comum que as pessoas ignorem a rotina financeira por falta de tempo. Entretanto, é importante para saúde financeira o controle das receitas e despesas mensalmente. Assim, será solicitado o desenvolvimento de uma aplicação web para o controle financeiro pessoal. O sistema deverá permitir o cadastro de receitas e despesas classificadas em categorias (ex.: água, luz, telefone, supermercado, etc.). Toda receita ou despesa será realizada em uma Conta. Essa conta poderá ter um Banco, Agência e Número, mas também poderá ter esses valores em branco, pois o dinheiro pode estar guardado em casa. O usuário também poderá lançar despesas em um cartão de crédito. O sistema deverá apresentar em uma tela inicial as despesas que não foram pagas no mês e o saldo e também o valor total de receitas e despesas (Dashboard). Somente usuários cadastrados poderão acessar ao sistema e fazer o seu controle financeiro pessoal, de todas as suas contas e cartões. Qualquer usuário poderá se cadastrar no sistema.

Ex.: 
 - Cadastro de Usuário {nome, email, senha, telefone, etc.}
 - Cadastro de Conta {USUARIO, Numero, Agencia, Banco, Tipo (CC, CP, CASA), etc.}
 - Cadastro de Movimentação {CONTA, Valor, DataVencimento, ValorPago, DataPagamento, Categoria, Descrição, Tipo (Receita, Despesa, transferência entre contas)}.
 - Demais funcionalidades necessárias...
