
# Spring Framework (back-end)

## Introdução

O Spring é um conjunto de projetos que focam em levar produtividade ao programador. Auxiliando de maneira a aumentar a produtividade no desenvolvimento de aplicações Java com simplicidade e flexibilidade.
O conjunto de frameworks Spring possui o Spring MVC para criação de aplicações web e serviços RESTful, o Spring Data, para  acesso a banco de dados, o Spring Security, para prover segurança em aplicações, e diversos outros projetos como cloud computing, microsserviços e big data, por exemplo.  
Os projetos Spring são todos **Open Source** e o seu código-fonte pode ser encontrado no [GitHub](https://github.com/spring-projects) [1].

## Spring e Java EE

O Spring possui uma série de recursos implementados que não estão presentes no Java EE. Entretanto, o framework Spring também utiliza várias tecnologias que estão implementadas dentro do Java EE. Não existe uma concorrência entre o Spring e o Java EE, o Spring apenas veio para dar maior produtividade ao desenvolvedor com os recursos disponibilizados no framework.

## Inversão  de Controle (IoC) e  Injeção de Dependências (DI) com Spring

A inversão de controle (ou Inversion of Control – IoC) consistem em transferir o controle da execução da aplicação para um container de IoC, o qual chama a aplicação em determinados momentos da execucão do software, como na ocorrência de um evento. Por meio da IoC o container controla quais métodos da aplicação e em que contexto eles serão chamados [2].

A Injeção de dependências (ou Dependency Injection – DI) é um é um padrão de projeto usado para desacoplar classes de suas dependências dentro de uma aplicação, dessa maneira é possível  obter uma melhor modularização do software [3].

## Spring Data JPA
O *framework* Spring Data JPA atua na camada de persistência [4]. Ele auxilia o programador na criação dos repositórios da aplicação. O projeto (Spring Data JPA) está dentro do Spring Data que possui diversos outros projetos que auxiliam no processo de acesso e persistência de dados. Sendo os principais projetos:
-   Spring Data Commons
-   Spring Data for Apache Cassandra
-   Spring Data Gemfire
-   Spring Data KeyValue
-   Spring Data LDAP
-   Spring Data MongoDB
-   Spring Data Redis
-   Spring Data REST

## REST
REST é a sigla para **Representational State Transfer** ou em português **Transferência de Estado Representacional.** Uma aplicação web RESTful expõe informações sobre si na apresentando seus recursos. Ela também possibilita ao cliente executar ações nesses recursos, como criar novos recursos (por exemplo, criar um novo usuário) ou alterar recursos existentes (por exemplo, editar os dados de um usuário).

Para que uma API web seja RESTful, é necessário  seguir um conjunto de regras ao escrevê-la. O conjunto de regras para uma API REST às tornará mais fáceis de usar e também mais fáceis de descobrir, o que significa que um desenvolvedor que está apenas começando a usar suas APIs terá mais facilidade em aprender como fazê-lo. Isso significa que quando uma API RESTful é chamada, o servidor _transfere_ para o cliente uma _representação_ do _estado_ do recurso solicitado.

REST não é uma arquitetura, biblioteca ou framework, é simplesmente um  **modelo** que é utilizado para projetar arquitetura de softwares distribuídos que fazem comunicação de dados pela rede, seja local ou a famosa Internet.

REST não é uma arquitetura ou *framework* pronto, é apenas um contjunto de regras que serve como modelo para desenvolver uma API. Esse modelo foi criado por Roy Fielding [5]  um dos principais responsáveis e criadores do protocolo HTTP, basicamente, tudo que está online utiliza o protocolo HTTP ou o HTTPS que é a evolução do mesmo.
# Iniciando o projeto
Durante as aulas será desenvolvido um projeto para controle de compra e venda de produtos. Vamos iniciar com o cadastro de usuários do sistema, tanto a API Rest quanto o cliente utilizando React. Então será realizada a etapa de autenticação dos usuários do sistema. Na sequência serão realizados os CRUDs de categoria, produto e compras.

### Criação do projeto
O projeto será criado utilizando como base o *framework* Spring Boot, que por sua vez permite que projetos com o Spring MVC, Data JPA e Security já venham configurados por meio de convenções.
Será criado um projeto [Maven](https://maven.apache.org/) por meio da ferramenta web [Spring Initializr](https://start.spring.io/) com as seguintes configurações:
O projeto será do tipo **Maven Project**.
A linguagem será **Java**.
A versão do Spring Boot será a versão estável atual na data de criação do projeto (**2.6.6**).
Os metadados do projeto são:
- Group: **br.edu.utfpr.pb.web**
- Artifact: **server**
- Options:
  - Packaging: **Jar**
  - Java: **11** ou superior (utilizar a versão instalada na máquina, preferência pela mais atual).

Em dependências devem ser selecionados os *frameworks*:
- Spring Data JPA
- Spring Web
- Spring Security
- Spring Devtools
- H2 Database (ou o driver do banco de sua preferência PostgreSQL, MySQL, etc...)
- Lombok
- Validation

O projeto está configurado e pode ser realizado o download do mesmo e importado na IDE. O conteúdo do arquivo `pom.xml` pode ser visualizado em: [arquivo pom.xml](https://github.com/viniciuspegorini/pw25s-2022-2/blob/main/aula1/server/pom.xml).

### Estrutura do projeto back-end

O projeto Spring Boot vêm com uma série de configurações inicias que não precisamos nos preocupar, iniciando com a classe principal da aplicação a **ServerApplication**, nela por meio da anotação **@SpringBootApplication** todas as configurações serão carregadas. O **Spring Security** por exemplo, já vem pré-configurado protegendo todas as URLs, como ainda não vamos configurar, é necesário adicionar a propriedade **exclude = SecurityAutoConfiguration.class**, dessa maneira o **SpringBoot** vai ignorar as configurações de segurança, na sequência do desenvolvimento essa configuração será alterada para o processo de autenticação e autorização funcionar. O banco de dados em memória utilizando o **H2** também já é criado por padrão nesse momento, ou seja, todas as configurações necessárias para o início do desenvolvimento estão prontas.

```java
@SpringBootApplication(exclude = SecurityAutoConfiguration.class)  
public class ServerApplication {  
   public static void main(String[] args) {  
      SpringApplication.run(ServerApplication.class, args);  
  }   
}
``` 
Com as configurações básicas definidas será possível iniciar o desenvolvimento do projeto.


### Cadastro de Usuário (back-end)

O desenvolvimento irá iniciar o cadastro de usuário o primeiro passo será criar o cadastro de um novo usuário. Para isso devemos criar nosso controller, entretanto como o desenvolvimento será realizado por meio de TDD, a primeira classe que vamos criar será a classe **UserControllerTest** dentro da pasta **/src/test**.
```java
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class UsuarioControllerTest {
}
```` 

A anotação **@SpringBootTest** permite que o nosso teste rode a partir das configurações padrão do Spring, ou seja as várias convenções do *framework* para iniciar o projeto já estão pré-configuradas. O Spring permite que a aplicação seja executada em diferentes ambientes (*profiles*), ou seja, teste, desenvolvimento, produção, etc., assim, por meio da anotação **@ActiveProfiles("test")** está sendo informado que o projeto será executado com base no *profile test*, isso irá permitir que na sequência do desenvolvimento do projeto ele possa ser executado por meio de configurações diferentes dentro de cada ambiente.

O próximo passo é criar o primeiro teste, para nomear cada teste será utilizado:
**methodName_condition_expectedBehaviour**

Dentro da classe  **UserControllerTest** será criado o método ***postUser_whenUserIsValid_receiveOk()***, ou seja ao realizar um HTTP POST, quando o objeto enviar for um Usuário válido deve-se receber um ***HTTP Status: 200 OK***. O objeto ***testRestTemplate*** permite que possamos realizar requisições HTTP para uma URL, no caso do exemplo */users* e tenhamos acesso à resposta vinda da requisição.
```java
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class UsuarioControllerTest {
	@Autowired
	TestRestTemplate testRestTemplate;
	
	@Test
	public void postUser_whenUserIsValid_receiveOk() {
		User user = new User();
		user.setUsername(“test-user”);
		user.setDisplayName(“test-Display”);
		user.setPassword(“P4ssword”);
		ResponseEntity<Object> response = testRestTemplate.postForEntity(“/users”, user, Object.class);
		assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
	}
}
```
Com o teste implementado será necessário começar resolver o que esperamos de comportamento da API. Iniciamente será criado uma classe **User**, com os atributos **username**, **displayName** e **password**. A classe deve ser criada na pasta **/src/main/java** no pacote **br.edu.utfpr.pb.web.model**.  Note que no exemplo a classe possui a anotação **@Data** que vem do **lombok**, dependência que foi adicionada ao projeto. Por meio dessa anotação ao compilar a classe o lombok gera os métodos getters e setters evitando assim que seja necessário criar esses códigos manualmente durante o desenvolvimento. Outras anotações do lombok serão utilizadas dentro deste projeto, sempre com a mesma intenção, evitar escrever código e deixar nossas classes mais limpas. Agora a classe **User** pode ser importada dentro da classe de teste.

```java
package br.edu.utfpr.pb.web.model;

@Data
public class User {
	private String username;
	private String displayName;
	private String password;
}
```
O próximo passo é criar a versão inicial da classe **UserController**, dentro do pacote **br.edu.utfpr.pb.web.controller**, essa classe deve ter um méto que aceita uma requisição do tipo HTTP Post para a URL  */users*. Por meio da anotação **@RestController** uma classe pode criar métodos para receber requisições HTTP. A anotação **@RequestMapping("users")** serve para que essa classe trate todas as requisições vindas em **/users**, independente do método HTTP. Por fim, foi criado o método **createUser()** o qual, por meio da anotação **@PostMapping** irá atender uma requisicão do tipo HTTP POST na URL */users*. Feito isso podemos executar nosso teste. Ele vai passar, por mais que o método não tenha nada implementado, ao ser chamado ele vai retornar um ***HTTP Status: 200 OK***, parâmetro esperado pelo primeiro teste criado. Ou seja, agora foi criada a primeira parte da API REST.

```java
@RestController
@RequestMapping("users")
public class UserController {

	@PostMapping
	void createUser() {
	}
}
```

O próximo teste será utilizado para verificar se após receber a requisição HTTP do tipo POST, o usuário enviado na requisição foi efetivamente salvo no banco de dados. Agora é necessário utilizar o **Spring Data** para armazenar o usuário no banco de ados.

```java
//...
public class UsuarioControllerTest {
	@Autowired
	UserRepository userRepository;
	//...
	@Test
	public void postUser_whenUserIsValid_userSavedToDatabase() {
		User user = createValidUser();
		testRestTemplate.postForEntity(“/users”, user, Object.class);
		// Agora precisamos garantir que tudo foi salvo no Banco de Dados.
		assertThat(userRepository.count()).isEqualTo(1);
	}
}
```
O primeiro passo para resolver o teste é fazer com que a classe **User** possa ser lida como uma entidade que pode ser persistida no banco de dados por meio da anotação **@Entity**. Toda a classe que é mapeada com @Entity deve possuir uma chave primária e a mesma deve ser anotada com **@Id**. Além disso é necessário informar como será gerado o incremento da chave primária, o que deve ser feito por meio da anotação **@GeneratedValue**, a qual por padrão incrementa o **Id** automáticamente somando 1 ao valor da chave primária a cada novo registro.
```java
\\...
@Entity
@Data
public class User {

	@Id
	@GeneratedValue
	private long id;
	private String username;
	\\... o restante da classe permanece igual
}
```
Agora é necessário criar as operações de escrita e leitura no banco de dados, isso por ser feito por meio da *interface* **JpaRepository**, disponibilizada pelo *framework* Spring Data. A *interface* **UserRepository** será criada dentro do pacote **br.edu.utfpr.pb.web.repository**. Ao herdar as características de **JpaRepository** a *interface* conta com os principais métodos CRUD, tais como *save(), delete(), findAll(), findById()*, entre outros. Agora a classe **UserRepository** pode ser importada dentro da classe de teste.

```java
public interface UserRepository extends JpaRepository<User, Long> {
}
```
Agora é possível utilizar a interface **UserRepository ** para persistir um usuário no banco de dados. Nesse momento será criada a classe **UserService**, dentro do pacote **br.edu.utfpr.pb.web.service**, para controlar as operações realizadas com a interface **UserRepository** e o banco de dados. Assim é possível manter todas as regras de negócio da aplicação fora da classe **controller**, além disso também é possível fazer o controle transacional do banco de dados por meio da classe **UserService**.

```java
@Service
public class UserService {
	UserRepository userRepository;
	
	public UserService(UserRepository userRepository) {
		super();
		this.userRepository = userRepository;
	}
	public User save (User user){
		return userRepository.save(user);
	}
}
```
Para salvar o usuário basta fazer a injeção de **UserService **, então utilizar o método ***userService.save()*** que espera como parâmetro de entrada um objeto do tipo **User**, o objeto será persistido no banco de dados. Nesse momento é possível executar o teste e o mesmo vai passar.

```java
@RestController  
@RequestMapping("users")  
public class UserController {  
	@Autowired  
	private UserService userService;  
  
    @PostMapping  
	void createUser(@RequestBody User user) {  
        userService.save(user);    
	}
}
```
Para evitar problemas durante a execução dos testes é importante limpar o banco de dados a cada execução, para isso vamos criar um método que remove os registros do banco a cada execução.

``` java
//...
public class UsuarioControllerTest {
	//...
	@BeforeEach
	public void cleanup() {
		userRepository.deleteAll();
		testRestTemplate.getRestTemplate().getInterceptors().clear();
	}
	//...
}
```

Podemos testar a API via requisição HTTP fora do nosso ambiente de testes, como ainda não iniciamos a criação do cliente com React, é necessário utilizar um *software* como o Postman ou Insomnia. Antes de criar o teste no **software** é necessário fazer alguns ajustes no projeto. Primeiro será necessário criar um arquivo de configuração para que tenhamos acesso ao banco de dados que está sendo utilizado durante os testes, o H2. Dentro da pasta **/src/main/resources/** criar o arquivo **application.yml**.  Muito cuidado na **indentação** do código do aquivo **yml** pois é a maneira que ele utiliza para acessar a árvore de propriedades. As configurações servem para que sejá possível gerar um nome de banco de dados único ao executara aplicação (*jdbc:h2:mem:testdb*) e para que possa ser acessado o console do banco por meio da URL **http://localhost:8080/h2-console**.
```yml
spring:
  datasource:
    generate-unique-name: false
  h2:
    console:
	  enabled: true
	  path: /h2-console
```

Ao acessar a URL **http://localhost:8080/h2-console** em um navegador irá abrir a tela de conexão do **H2** a configuração está praticamente pronta, bastando alterar a URL de conexão com o banco para: **jdbc:h2:mem:testdb**. Ao clicar para realizar a conexão temos acesso ao banco de dados gerado, por enquando foi criada apenas a tabela **User**, ao clicar na tabela é habilitado o console no qual podemos realizar consultas. Ao fazer um **select * from user** e executar o comando recebemos uma tabela vazia como resultado, para adicionar um usuário no banco de dados será utilizados o Postman.

### Realizando uma requisição HTTP POST por meio do Postman
Ao abrir o Postam basta clicar em **File > New Tab** e uma nova aba para realizar requisições HTTP será aberta. No método selecionar a opção **POST** e na URL **http://localhost:8080/users**. O próximo passo é configurar o corpo da requisição com um objeto JSON representando um usuário. Clicar na aba **Body** marcar a opção **raw** e no final das opções selecionar **JSON**. Com isso é possível adicionar no corpo da requisição o objeto que representa um usuário.
```json
{
  "username" : "user-test",
  "displayName" : "user-dispay-test",
  "password": "P4ssword"
}
```
Adicionado o **JSON** basta clicar em send e a requisição será enviada para a API, o retorno que aparece em **Response** é um **200 OK** sem nenhum outro texto, pois é assim que está o código por enquanto. Agora é possível executar novamente o **select** no banco **H2** e consultar o usuário que foi adicionado na base de dados.

### Continuando o desenvolvimento da API
No próximo teste será retornado ao cliente que chama a API além do **status HTTP**, uma mensagem de sucesso. A mensagem irá retornar por meio de um objeto do tipo **GenericResponse**.

```java
//...
public class UsuarioControllerTest {
	//...
	
	@Test
	public void postUser_whenUserIsValid_receiveSuccessMessage() {
	User user = createValidUser();
	ResponseEntity<GenericResponse> response = testRestTemplate.postForEntity(API_USERS, user, GenericResponse.class);
	assertThat(response.getBody().getMessage()).isNotNull();
	}
	//...
}
```

A classe **GenericResponse** será criada no pacote **br.edu.utfpr.pb.web.shared** e por enquanto terá apenas o atributo **message**.

```java
@Data  
@NoArgsConstructor  
public class GenericResponse { 
    private String message;
    public GenericResponse(String message) {
        this.message = message;
    }  
}
```
A próxima alteração de código será realizado no método **createUser()** da classe **UserController**, que agora deverá retornar um objeto do tipo **GenericResponse**. Após essa alteração o teste criado irá passar. Para visualizar o comportamento na prática a requisição pode ser realizada novamente por meio do Postman.

```java
    \\...
    @PostMapping
    GenericResponse createUser(@RequestBody User user) {
        userService.save(user);
        return new GenericResponse("Registro salvo");
    }
    \\...
```

Com essa etapa finalizada, agora serão adicionadas algumas melhorias no código e na maneira com que os dados são persistidos. Ao fazer o **select** no banco de dados é possível observar que a coluna **password** está sendo armazenada como texto, o que não é uma boa prática. O teste a seguir irá validar se a senha salva no banco está diferente da senha que foi enviada para cadastro, o que sinaliza que ela estará criptografada no banco de dados.

```java
    \\...
    @Test 
    public void postUser_whenUserIsValid_passwordIsHashedInDatabase() {
        User user = createValidUser();
        testRestTemplate.postForEntity(API_USERS, user, Object.class);
        List<User> users = userRepository.findAll();
        User userBD = users.get(0);
        assertThat(userBD.getPassword()).isNotEqualTo(user.getPassword());
    }
    \...
```
A criptografia da senha será realizada na classe **UserService** para evitar que regras de negócio da aplicação sejam implementadas na classe **controller**. Para criptografia da senha será utilizada a classe **BCryptPasswordEncoder**[6]. Ao executar o método **bCryptPasswordEncoder.encode()** a senha será criptografada antes de ser salva no banco. Ao executar o teste ele vai passar. Para visualizar na prática só executar a requisição via Postman e conferir no console do **H2**.

```java
@Service  
public class UserService { 
    UserRepository userRepository;
    BCryptPasswordEncoder bCryptPasswordEncoder;  
    
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = new BCryptPasswordEncoder();
    }
    public User save(User user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()) );
        return userRepository.save(user);
    }
}
```
Com isso finalizamos o básico do cadastro de usuário na API, agora será realizada a validação dos dados obrigatórios do usuário, pois por enquanto é possível cadastrar um usuário sem informar todos os dados, pois os mesmos não estão sem validados.

### Validando os dados de cadastro do usuário

Para realizar a validação dos dados obrigatórios das entidade na API, será utilizado Java Bean Validation [7], utilizando os validadores padrão, também serão criados validadores customizados e por fim, será tratada da internacionalização das mensagens de erro.

Até o momento só foram testados os casos de sucesso na API. Mas sabe-se que não é a realidade, pois constantemente os usuário preenchem os formulários no lado cliente e acabam passando dados inválidos para o servidor. Por isso serão validadas todas as entradas de usuário, tanto no *front-end* quanto no *back-end*.

Nesse primeiro teste será validado o caso de recebimento do campo **username** como nulo. Esse teste também será criado na classe **UsuarioControllerTest ** e irá testar se, caso o campo **username** estiver nulo, a resposta **HTTP** recebida deverá ser **400 BAD_REQUEST**.

```java
//...
public class UsuarioControllerTest { 
    //...
    @Test 
    public void postUser_whenUserHasNullUsername_receiveBadRequest() {
        User user = createValidUser();
        user.setUsername(null);
        ResponseEntity<Object> response = postSignUp(user, Object.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }
    //...
}
```
Para resolver esse teste o inicialmente será adicionada a anotação **@NotNull** (importada de: import javax.validation.constraints.NotNull;) no campo **username** da classe **User**, conforme o código abaixo.

```java
@Data  
@Entity(name = "tb_user")  
public class User {  
  
    @Id 
    @GeneratedValue
    private long id;  
    
    @NotNull
    private String username;
    private String displayName;  
    private String password;  
}
```

Com a anotação feita será delegado ao controller (**UserController**) validar o usuário antes da entrada no método que realiza a persistência dos dados. Será utilizada a anotação @Valid (importado de: import javax.validation.Valid;) antes da declaração do objeto user no médoto *createUser()*. Com isso o campo será validado e o cliente da API irá receber uma mensagem criada pelo Spring informando que o campo username não pode ser nulo.

```java
@RestController  
@RequestMapping("users")  
public class UserController {
  private final UserService userService;

  public UserController(UserService userService) {
    this.userService = userService;
  }

  @PostMapping
  GenericResponse createUser(@RequestBody @Valid User user) {
    userService.save(user);
    return new GenericResponse("Registro salvo");
  }
}
```

O mesmo teste (**UserControllerTest**) será realizado para o campo **password** da classe **User**.

```java
    @Test
    public void postUser_whenUserHasNullPassword_receiveBadRequest() {
        User user = createValidUser();
        user.setPassword(null);
        ResponseEntity<Object> response = postSignUp(user, Object.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }
```

Para resolver o teste será adicionada a anotação **@NotNull** no atributo **password**. E será a única modificação necessária, pois o **@Valid** presente na classe **UserController** será responsável por todas as validações necessárias de cada atributo da classe **User**. Existem outras validações que podem ser utilizadas nos atributos das classes, para conhecê-las basta acessar a documentação do  Java Bean Validation [7]. No código abaixo algumas outras anotações foram adicionadas nos atributos da classe **User**.
```java
@Data  
@Entity(name = "tb_user")  
public class User {  
  
    @Id 
    @GeneratedValue  
    private long id;  
    
    @NotNull 
    @Size(min = 4, max = 255)  // valida para que o campo tenha entre 4 e 255 caracteres
    private String username;  
    
    @NotNull 
    private String displayName;  
    
    @NotNull 
    @Size(min = 6, max = 254) 
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$")   //valida para que o campo tenha pelo menos 1 letra maiúscula, 1 letra minúscula e 1 número.
    private String password; 
}
```

### Adicionando Autenticação e Autorização com Spring Security

O conteúdo abordado na sequência é o conceito de autenticação e autorização com o *framework* **Spring Security**[8]. Neste projeto será criado um arquivo de configuração para sobrescrever alguns comportamentos padrão do **Spring Security**. A classe **User** será utilizada para criar os objetos dos usuários que poderão se autenticar na API. E a interface **UserRepository** será utilizada para criar a consulta que irá retornar o usuário do banco de dados.

Além disso, foram criadas dentro dos pacotes **security** e **service** as demais classes utilizadas na configuração do Spring Security:
- **AuthenticationResponse**: classe utilizada para definir o objeto de retorno com o token criado ao finalizar a autenticação.
- **EntryPointUnauthorizedHandler**:  classe utilizada para definir o tipo de resposta ao cliente quando ocorrer um erro no processo de autenticação.
- **JWTAuthenticationFilter**: classe utilizada durante o processo de autenticação de usuário.
- **JWTAuthorizationFilter**: classe utilizada durante o processo de autorização de um usuário já autenticado.
- **SecurityConstants**: classe contendo as constantes utilizadas pelas classes de configuração do Spring Security.
- **WebSecurity**: classe em que serão realizadas todas as configurações do Spring Security.

O primeiro passo a ser realizado para o **Spring Security** funcionar é retirar o trecho de código *exclude = SecurityAutoConfiguration.class* da classe **ServerApplication**, pois agora é necessário que o Spring traga algumas configurações já definidas no projeto. Por padrão, ao retirar essa configuração o **Spring Security** volta a funcionar na aplicação e todas as rotas da API passam a necessitar de autenticação. Ou seja nesse momento os testes vão parar de funcionar e, ao tentar fazer uma requisição **HTTP POST** para a url **/users** da API o retorno será um código **HTTP** **403 FORBIDEN**, mesmo todos os campos estando corretos, pois o Spring está validando o acesso às rotas.

```java
@SpringBootApplication
public class ServerApplication {  
   public static void main(String[] args) {  
      SpringApplication.run(ServerApplication.class, args);  
  }   
}
``` 
Para configurar o **Spring Security** será criada a classe **Web Security** no pacote **br.edu.utfpr.pb.pw25s.server.security**. Nessa classe serão sobrescritas as configurações padrão do Spring Security, por isso ela recebe a anotação **@EnableWebSecurity** e como serão criados objetos compartilhados a anotação **@Configuration**. O objeto **authService** será explicado na sequência do texto e é utilizado para buscar um usuário no banco.  O objeto **authenticationEntryPoint** é responsável por realizar o tratamento de exceção quando o usuário informar credenciais incorretas ao autenticar-se. O método **filterChain()** retorna um objeto do tipo **SecurityFilterChain**, nesse método serão sobrescritas algumas configurações padrão do Spring, pelas configurações utilizadas neste projeto. Essas configurações serão alteradas por meio do objeto **http** instanciado de **HttpSecurity**, nele podem ser alteados os objetos de tratamento de erro, quais rotas da aplicação serão autenticadas/autorizadas, as rotas para autenticação, controle do tipo de sessão e no caso desse projeto os filtros utilizados na Autenticação (**authenticationManager**) e autorização dos usuários (**authorizationManager**), conforme pode ser observado nos comentários do código abaixo.

```java
@EnableWebSecurity  
@Configuration  
public class WebSecurity {   
    private final AuthService authService; // Service responsável por buscar um usuário no banco de dados por meio do método loadByUsername()  
    private final AuthenticationEntryPoint authenticationEntryPoint; // Objeto responsável por realizar o tratamento de exceção quando o usuário informar credenciais incorretas ao autenticar-se.  
  
    public WebSecurity(AuthService authService,  
                       AuthenticationEntryPoint authenticationEntryPoint) {  
        this.authService = authService;  
        this.authenticationEntryPoint = authenticationEntryPoint;  
    }  
  
    @Bean 
    @SneakyThrows 
    public SecurityFilterChain filterChain(HttpSecurity http) {
        // authenticationManager -> responsável por gerenciar a autenticação dos usuários  
        AuthenticationManagerBuilder authenticationManagerBuilder =  
                http.getSharedObject(AuthenticationManagerBuilder.class);  
        authenticationManagerBuilder.userDetailsService(authService)  
                .passwordEncoder( passwordEncoder() );  
        AuthenticationManager authenticationManager = authenticationManagerBuilder.build();  
  
        http.csrf().disable() // desabilita o uso de csrf [9]  
                .exceptionHandling()  
                    .authenticationEntryPoint(authenticationEntryPoint)  //define o objeto responsável pelo tratamento de exceção ao entrar com credenciais inválidas
                .and()  
                .authorizeRequests()  // configura a authorização das requisições
  
                .antMatchers(HttpMethod.POST, "/users/**").permitAll() //permite que a rota "/users" seja acessada mesmo sem o usuário estar autenticado desde que o método HTTP da requisição seja POST
                .antMatchers( "/error/**").permitAll()  //permite que a rota "/error" seja acessada por qualquer requisição mesmo o usuário não estando autenticado
                .anyRequest().authenticated() //as demais rotas da aplicação só podem ser acessadas se o usuário estiver autenticado
                .and()  
                .authenticationManager(authenticationManager)  
                //Filtro da Autenticação - sobrescreve o método padrão do Spring Security para Autenticação.
                .addFilter(new JWTAuthenticationFilter(authenticationManager, authService) )  
                //Filtro da Autorização - - sobrescreve o método padrão do Spring Security para Autorização.  
                .addFilter(new JWTAuthorizationFilter(authenticationManager, authService) )  
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);  //Como será criada uma API REST e todas as requisições que necessitam de autenticação/autorização serão realizadas com o envio do token JWT do usuário, não será necessário fazer controle de sessão no *back-end*.
        return http.build();  
    }
    
    // Criação do objeto utilizado na criptografia da senha, ele é usado no UserService ao cadastrar um usuário e pelo authenticationManagerBean para autenticar um usuário no sistema.
    @Bean 
    public PasswordEncoder passwordEncoder() {  
        return new BCryptPasswordEncoder();  
    }  
}
```

Para autenticar-se em um sistema qualquer geralmente precisamos ter credenciais, no caso deste projeto as credenciais para acesso serão gerenciadas pela classe **User** por meio dos campos **username** e **password**. Dessa maneira os objetos instanciados de **User** serão armazenados no banco de dados e utilizados posteriormente para autenticação e autorização. O processo de salvar um novo usuário já foi explicado no início deste documento, já o processo de autenticação e autorização está sendo descrito agora. Por padrão, para autenticar-se em uma aplicação Spring Security é necessário realizar uma requisição do tipo **HTTP POST** para URL **/login**  (no caso dessa aplicação: http://localhost:8080/login), enviando no corpo da requisição os dados de usuário e senha.

Agora serão descritas as configurações na classe **User**, **UserRepository** e a criação da classe **AuthUserService**. Como iremos utilizar o *framework* **Spring Security** para gerenciar a autenticação e autorização da API, deve-se obedecer a documentação do mesmo, que define que para utilizar uma classe criada na API a mesma deverá implementar a *interface* **UserDetails**. Essa *interface* exige a implementação de alguns métodos padrão , sendo os pricipais o **getUsername()**, o **getPassword()** e o **getAuthorities() **. O método **getUsername()** deve retornar o nome de usuário utilizado na autenticação (que pode ser outro campo da classe **User**, por exemplo, o campo email), nesse caso basta retornar **this.email** no método. O método **getPassword()** deverá retornar a senha e, por fim o método **getAuthorities() ** deverá retornar as permissões de usuário, nesse caso só teremos uma permissão, por isso o retorno é **return AuthorityUtils.createAuthorityList("Role_USER");**.

```java
\\...
public class User implements UserDetails {  
  
    @Id 
    @GeneratedValue 
    private long id;  
  
    @UniqueUsername 
    @NotNull(message = "{br.edu.utfpr.pb.pw25s.username}")  
    @Size(min = 4, max = 255)  
    private String username;  
  
    @NotNull  
    private String displayName;  
  
    @NotNull  
    @Size(min = 6, max = 254)  
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$")  
    private String password;  
  
    @Override  
    @Transient 
    @JsonIgnore  
    public Collection<? extends GrantedAuthority> getAuthorities() {  
        return AuthorityUtils.createAuthorityList("Role_USER");  
    }  
  
    @Override  
    @Transient  
    public boolean isAccountNonExpired() {  
        return true;  
    }  
  
    @Override  
    @Transient  public boolean isAccountNonLocked() {  
        return true;  
    }  
  
    @Override  
    @Transient  public boolean isCredentialsNonExpired() {  
        return true;  
    }  
  
    @Override  
    @Transient  public boolean isEnabled() {  
        return true;  
    }  
}
```
Os demais métodos: **isAccountNonExpired(), isAccountNonLocked**, etc. estão retornando **true** por padrão, pois o Spring Security utiliza esses dados para verificar se a conta de usuáriuo é válida. Nesse caso não foi implementado nenhum tipo de validação, mas esses métodos poderiam retornar valores armazenados no banco.

Na interface **UserRepository** foi adicionadio a assinatura do método **findByUsername** que recebe como parâmetro o atributo **username** e retorna um objeto **User**. Esse método será utilizado para buscar o usuáriuo que está tentando autenticar-se no sistema.

```java
\\...
@Repository  
public interface UserRepository extends JpaRepository<User, Long> {  
    User findByUsername(String username);  
}
```

A classe **AuthUserService** implementa a interface do Spring Security **UserDetailsService**, a qual obriga a implementação do método **loadUserByUsername**, que recebe uma interface **username** por parâmetro e retorna um **UserDetails**, pois o Spring Security utiliza esse objeto para verificar se um usuário existe no banco. Caso exista o usuário o Spring Security irá comparar a senha criptografada no banco com a senha informada pelo usuário durante o processo de autenticação.

```java
\\...
@Service  
public class AuthUserService implements UserDetailsService {  
	private final UserRepository userRepository;  
	
	public AuthUserService(UserRepository userRepository) {  
        this.userRepository = userRepository;  
    }  

    @Override 
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if(user == null) {
            throw new UsernameNotFoundException("Usuário não encontrado!");
        }
        return user;
    }  
}
```

Conforme configurado na classe **WebSecurity** um filtro chamado **JWTAuthenticationFilter** será criado para realizar o processo de autenticação. Essa classe herda as características de **UsernamePasswordAuthenticationFilter** que é a classe do Spring Security que é utilizada para autenticação via usuário e senha. O método **attemptAuthentication** que foi sobrescrito é chamado quando o usuário realiza uma requisição **HTTP** do tipo **POST** para URL **/login**. Esse método recebe como parâmetros um objeto **HttpServletRequest ** que contém todos os dados da requisição, ou seja, é possível extrair do corpo da requisição o usuário e senha informado pelo usuário no momento da autenticação. Como está sendo utilizado JSON para transferência de dados entre o cliente e a API será necessário enviar os dados nesse formato ({"username":"user","password":"P4ssword"}). Esses dados são recuperados dentro do método. É realizada  uma consulta no banco de dados para verificar se o usuário existe, caso exista a senha informada durante a autenticação é comparada com a senha armazenada no banco de dados e no caso de sucesso o usuário será autenticado. No caso de falha uma Exception é gerada e o usuáriuo irá receber um erro **401**. No caso de sucesso será chamado o método **successfulAuthentication**, que também foi sobrescrito, para que seja gerado o **Token JWT** que será enviado para o cliente, assim o cliente poderá utilizar esse Token para realizar a autorização nas próximas requisições. O método **successfulAuthentication** recebe como parâmetro um objeto do tipo **HttpServletResponse** que é utilizado para enviar a resposta ao cliente que solicitou a autenticação. A aplição irá retornar como respostar um **Token JWT** por meio de um objeto do tipo **AuthenticationResponse** que foi criado para retornar apenas o Token para o cliente no formato JSON.

```java
public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {  
  
    private final AuthenticationManager authenticationManager;  
    private final AuthService authService;  
  
    public JWTAuthenticationFilter(AuthenticationManager authenticationManager, AuthService authService) {  
        this.authenticationManager = authenticationManager;  
        this.authService = authService;  
    }  
  
    @Override 
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {  
        try {   
            //Obtem os dados de username e password utilizando o ObjectMapper para converter o JSON
            //em um objeto User com esses dados.
            User credentials = new ObjectMapper().readValue(request.getInputStream(), User.class);  
            //Verifica se o usuário existe no banco de dados, caso não exista uma Exception será disparada
            //e o código será parado de executar nessa parte e o usuário irá receber uma resposta
            //com falha na autenticação (classe: EntryPointUnauthorizedHandler)             
            User user = (User) authService.loadUserByUsername(credentials.getUsername());  
            
            //Caso o usuário seja encontrado, o objeto authenticationManager encarrega-se de autenticá-lo.
            //Como o authenticationManager foi configurado na classe WebSecurity e foi informado o método
            //de criptografia da senha, a senha informada durante a autenticação é criptografada e
            //comparada com a sennha armazenada no banco. Caso não esteja correta uma Exception será disparada
            //Caso ocorra sucesso será chamado o método: successfulAuthentication dessa classe
            return authenticationManager.authenticate(  
                    new UsernamePasswordAuthenticationToken(  
                            credentials.getUsername(),  
                            credentials.getPassword(),  
                            user.getAuthorities()  
                    )  
            );  
        } catch (IOException e) {  
            throw new RuntimeException(e);  
        }  
    }  
  
    @Override 
    protected void successfulAuthentication(HttpServletRequest request,  
                                            HttpServletResponse response,  
                                            FilterChain chain,  
                                            Authentication authResult) throws IOException, ServletException {  
        String token = JWT.create() // o método cretate() da classe JWT é utilizado para criação de um novo token JWT  
                .withSubject(authResult.getName())// o objeto authResult possui os dados do usuário autenticado, nesse caso o método getName() retorna o username do usuário foi autenticado no método attemptAuthentication.
                .withExpiresAt(new Date(System.currentTimeMillis()+ SecurityConstants.EXPIRATION_TIME)) //a data de validade do token é a data atual mais o valor armazenado na constante EXPIRATION_TIME, nesse caso 1 dia
                .sign(Algorithm.HMAC512(SecurityConstants.SECRET)); //Por fim é informado o algoritmo utilizado para assinar o token e por parâmetro a chave utilizada para assinatura. O Secret também pode ser alterado na classe SecurityConstants que armazena alguns dados de configuração do Spring Security 

		
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);  
        response.getWriter().write(new ObjectMapper().writeValueAsString(  
                new AuthenticationResponse(token)  
        ));  
    }  
}
```
Abaixo está o JSON que deverá ser enviado via **HTTP POST** para URL **/login** para autenticar-se na aplicação.
```json
{"username":"user","password":"P4ssword"}
```
Abaixo está a resposta ao cliente após a autenticação realizada com sucesso.

```json
{"token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.restante.dotoken"}
```

Com posse do Token recebido o cliente poderá realizar novas requisições ao servidor nas rotas que necessitam de autorização. Para isso basta enviar o Token no cabeçalho da requisição utilizando a chave **Authorization**.
`Authorization:  Bearer  <token>`

Entretanto, para que o Token sejá utilizado para autorizar no usuário nas novas requisições foi criada a classe **JWTAuthorizationFilter**, que será resposável por extrair o Token do cabeçalho da requisição **HTTP** e verificar se ele é válido. A classe herda de **BasicAuthenticationFilter ** e implementa o método **doFilterInternal**, esse método recebe como parâmetro um objeto do tipo HttpServletRequest, e é desse objeto que é extraído o token do cabeçalho da requisição. Após pegar o token do cabeçalho o mesmo é passado por parâmetro para o método **getAuthentication**, no qual é verificado a validade do token, então é recuperado o **username** que está  no corpo do token. Na sequência é verificado se o usuário que está tentando autorização ainda existe no banco de dados, caso exista o usuário é autorizado e a autorização é adicionada no contexto do Spring Security.

```java
public class JWTAuthorizationFilter extends BasicAuthenticationFilter {  
  
    private final AuthService authService;  
  
    public JWTAuthorizationFilter(AuthenticationManager authenticationManager,  
                                  AuthService authService) {  
        super(authenticationManager);  
        this.authService = authService;  
    }  
  
    @Override  
    protected void doFilterInternal(HttpServletRequest request,  
                                    HttpServletResponse response,  
                                    FilterChain chain) throws IOException, ServletException {  
        //Recuperar o token do Header(cabeçalho) da requisição
        String header = request.getHeader(SecurityConstants.HEADER_STRING);  
        //Verifica se o token existe no cabeçalho
        if (header == null || !header.startsWith(SecurityConstants.TOKEN_PREFIX)) {  
            chain.doFilter(request, response);  
            return;  
        }
        //Chama o método getAuthentication e retorna o usuário autenticado para dar sequência na requisição
        UsernamePasswordAuthenticationToken authenticationToken = getAuthentication(request);
        
        //Adiciona o usuário autenticado no contexto do spring security
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        chain.doFilter(request, response);  
    }  
  
    private UsernamePasswordAuthenticationToken  
                getAuthentication(HttpServletRequest request) {  
        String token = request.getHeader(SecurityConstants.HEADER_STRING);  
        if (token != null) {
            //verifica se o token é válido e retorna o username  
            String username =  
                    JWT.require(Algorithm.HMAC512(SecurityConstants.SECRET))  
                            .build()  
                            .verify(token.replace(SecurityConstants.TOKEN_PREFIX, ""))  
                            .getSubject();  
            if (username != null) {
                // com posse do username é verificado se ele existe na base de dados 
                User user = (User) authService.loadUserByUsername(username);  
                //caso exista o usuário é autenticado e a requisição continua a ser executada.
                return new UsernamePasswordAuthenticationToken(username, null,  
                                    user.getAuthorities());  
            }  
        }  
        return null;  
    }  
}
```
Com o Token validado e o usuário autenticado e autorizado adicionado adicionado no contexto do Spring Security, qualquer **endpoint** da aplicação que necessite de autorização para acesso precisa ser acessado enviando o token gerado durante a autenticação.

# Utilizando o Swagger para documentar a API e o Flyway para migração do banco de dados em um projeto SpringBoot

## Swagger

### Introdução

O  [Swagger ](https://swagger.io/)  é um conjunto de ferramentas utilizados para melhorar o processo de documentação de APIs. Neste projeto foi utilizada a biblioteca [Springfox](https://springfox.github.io/springfox/) para gerar os JSONs com o mesmo padrão adotado pelo Swagger. A própria biblioteca Springfox é responsável por mapear todos os *endpoints* da API assim como todos os *models* utilizados nesses *endpoints* e gerar o JSON com a documentação da API.

### Configurações iniciais

Esse exemplo utiliza um projeto SpringBoot utilizando o Maven para gerenciamento das dependências. As bibliotecas serão adicionadas no arquivo  **pom.xml**. A biblioteca abaixo encontra-se no  [Repositório Maven](http://mvnrepository.com/) e é necessária para o funcionamento do Springfox.

```xml
	<dependency>  
	   <groupId>io.springfox</groupId>  
	   <artifactId>springfox-boot-starter</artifactId>  
	   <version>3.0.0</version>  
	</dependency>
```

Na sequência é necessário habilitar o Swagger na aplicação adicionando a anotação **@EnableSwagger2** na classe principal **ServerApplication**.

```java
@SpringBootApplication  
@EnableSwagger2  
public class ServerApplication {  
	public static void main(String[] args) {  
	    SpringApplication.run(ServerApplication.class, args);  
	}
}
```

O próximo passo é configurar os dados básicos para geração da documentação da API. Para isso foi criada a classe **SwaggerConfig** dentro do pacote **config** da aplicação. O método **greetingApi()** cria um objeto do tipo **Docket** no qual são configurados os dados básicos para geração da documentação da API, por exemplo o tipo que será gerada a documentação, nesse exemplo **Swagger 2**. Os métodos **apiKey(), securityContext() e defaultAuth()** são utilizados para configurar o envio do **token** de autenticação nas requisições da API. Os demais detalhes da documentação podem ser consultados na [documentação da biblioteca Springfox](http://springfox.github.io/springfox/docs/current/#quick-start-guides).

```java
@Configuration  
@EnableSwagger2  
public class SwaggerConfig implements WebMvcConfigurer {  
	private ApiKey apiKey() {  
        return new ApiKey("JWT", "Authorization", "header");  
	}  
  
    private SecurityContext securityContext() {  
        return SecurityContext.builder().securityReferences(defaultAuth()).build();  
	}  
  
    private List<SecurityReference> defaultAuth() {  
        AuthorizationScope authorizationScope = new AuthorizationScope("global", "accessEverything");  
  AuthorizationScope[] authorizationScopes = new AuthorizationScope[1];  
  authorizationScopes[0] = authorizationScope;  
 return Arrays.asList(new SecurityReference("JWT", authorizationScopes));  
  }  
  
    @Bean  
  public Docket greetingApi() {  
        Docket docket = new Docket(DocumentationType.SWAGGER_2)  
                .securityContexts(Arrays.asList(securityContext()))  
                .securitySchemes(Arrays.asList(apiKey()))  
                .select()  
                .apis(RequestHandlerSelectors.any())  
                .paths(PathSelectors.any())  
                .build()  
                .apiInfo(metaData());  
 return docket;  
  }  
  
    private ApiInfo metaData() {  
        return new ApiInfoBuilder()  
                .title("Spring Boot REST API")  
                .description("\"Spring Boot REST API for greeting people\"")  
                .version("1.0.0")  
                .license("Apache License Version 2.0")  
                .licenseUrl("https://www.apache.org/licenses/LICENSE-2.0\"")  
                .build();  
  }  
  
    @Override  
  public void addResourceHandlers(ResourceHandlerRegistry registry) {  
        //enabling swagger-ui part for visual documentation  
  registry.addResourceHandler("swagger-ui.html")  
                .addResourceLocations("classpath:/META-INF/resources/");  
  registry.addResourceHandler("/webjars/**")  
                .addResourceLocations("classpath:/META-INF/resources/webjars/");  
  }   
}
```

Outro item que deve ser cuidado é adicionar as regras para as URLs da documentação não serem bloqueadas pelo SpringSecurity. Para isso basta adicionar o código abaixo no método **filterChain** da classe **WebSecurity** que é responsável pelas configurações do SpringSecurity.

```java
	//...
	@Bean  
	@SneakyThrows  
	public SecurityFilterChain filterChain(HttpSecurity http) {
		//...
			.antMatchers("/h2-console/**",  
		        "/swagger-resources/**",  
		        "/swagger-ui.html",  
		        "/swagger-ui/**",  
		        "/v2/api-docs",  
		        "/webjars/**").permitAll()
        //...
	}
	//...
```

### Funcionamento

A biblioteca Springfox irá gerar automaticamente toda a documentação, para acessar o resultado da documentação no formato interface, no caso deste projeto, basta acessar: [http://localhost:8080/swagger-ui/](http://localhost:8080/swagger-ui/), serão listados todos os REST *controllers*, métodos HTTP presente em cada *controller* e também os *models* da aplicação. E para acessar a documentação no formato JSON basta acessar [http://localhost:8080/v2/api-docs](http://localhost:8080/v2/api-docs). Para fazer uma requisição basta acessar o **controller** escolher o método HTTP, clicar em **Try Out** e depois em **Execute**, caso seja uma requisição que dependa do envio de dados no corpo da requisição, o mesmo deverá ser preenchido no campo correspondente antes de clicar em **Execute**. Caso a o **endpoint** que será testado dependa de autenticação/autorização será necessário criar um usuário via *endpoint* para fazer o POST de um usuário, então executar o *endpoint* de autenticação (*login*), copiar o *token* que foi retorno da autenticação e clicar no botão **Authorize** na parte superior da página com a interface, na tela que abrir digitar o tipo do **token** e adicionar o **token** (ex.: Bearer ey.....restantedotokenjwtgerado).

## Flyway

### Introdução

O  [Flyway](https://flywaydb.org/)  é uma biblioteca utilizada para migração de banco de dados. Qualquer alteração no *schema* do projeto podem facilmente ser controladas e auditadas utilizando o Flyway. Com as configurações padrão, durante a primeira execução da aplicação, é criada uma tabela automaticamente no banco de dados chamada  **flyway_schema_history**  em que serão armazenadas informações para o controle das versões do *schema* do projeto.

### Configurações iniciais

Esse exemplo utiliza um projeto SpringBoot utilizando o Maven para gerenciamento das dependências. As bibliotecas serão adicionadas no arquivo  **pom.xml**. A biblioteca abaixo encontra-se no  [Repositório Maven](http://mvnrepository.com/) e é necessária para o funcionamento do Flyway.

```xml
	<dependency>  
	 <groupId>org.flywaydb</groupId>  
	 <artifactId>flyway-core</artifactId>  
	</dependency>
```

Na sequência será realizada a configuração na classe principal da aplicação **ServerApplication**.

```java
\\...
@SpringBootApplication  
@EnableSwagger2  
public class ServerApplication {
	\\...
	@Bean  
	public static BeanFactoryPostProcessor dependsOnPostProcessor() {  
	   return bf -> {  
		   // Let beans that need the database depend on the DatabaseStartupValidator  
		   // like the JPA EntityManagerFactory or Flyway  String[] flyway = bf.getBeanNamesForType(Flyway.class);  
	      Stream.of(flyway)  
	            .map(bf::getBeanDefinition)  
	            .forEach(it -> it.setDependsOn("databaseStartupValidator"));  
	      String[] jpa = bf.getBeanNamesForType(EntityManagerFactory.class);  
	      Stream.of(jpa)  
	            .map(bf::getBeanDefinition)  
	            .forEach(it -> it.setDependsOn("databaseStartupValidator"));  
	   };  
	}  
	  
	@Bean  
	public DatabaseStartupValidator databaseStartupValidator(DataSource dataSource) {  
	   var dsv = new DatabaseStartupValidator();  
	   dsv.setDataSource(dataSource);  
	   dsv.setTimeout(120);  
	   dsv.setInterval(7);  
	   // dsv.setValidationQuery(DatabaseDriver.POSTGRESQL.getValidationQuery());  
	   dsv.afterPropertiesSet();  
	   return dsv;  
	}
	\\...	
}
```


O próximo passo é configurar as credenciais de acesso ao banco de dados no arquivo de configuração **application.yml**. O banco de dados utilizado neste exemplo foi o H2, mas pode ser alterado para utilizar qualquer outro SGBD (PostgreSQL, MongoDB, MySQL, MariaDB, Microsoft SQL Server, entre outros). O arquivo está dividido em *profiles* sendo que o profile ativo é o **dev** cada conjunto de '- - - ' delimita um profile.

``` yml
spring:  
  profiles:  
    active: dev  
  datasource:  
    generate-unique-name: false  
 h2:  
    console:  
      enabled: true  
 path: /h2-console  
  jpa:  
    properties:  
      javax:  
        persistence:  
          validation:  
            mode: none  
      hibernate:  
        format_sql: false  
    show-sql: true  
 data:  
      web:  
        pageable:  
          default-page-size: 10  
          max-page-size: 100  
  flyway:  
    baseline-on-migrate: true  
 mvc:  
    pathmatch:  
      matching-strategy: ant_path_matcher  
---  
spring:  
  config:  
    activate:  
      on-profile: prod  
  datasource:  
    url: jdbc:h2:mem:pw25s-dev  
  jpa:  
    hibernate:  
      ddl-auto: none  
  h2:  
    console:  
      enabled: false  
 flyway:  
    locations: classpath:/db/prod  
---  
spring:  
  config:  
    activate:  
      on-profile: dev  
  datasource:  
    url: jdbc:h2:mem:pw25s-dev  
  jpa:  
    hibernate:  
      ddl-auto: none  
  flyway:  
    locations: classpath:/db/dev  
---  
spring:  
  config:  
    activate:  
      on-profile: test  
  jpa:  
    hibernate:  
      ddl-auto: create-drop  
  flyway:  
    locations: classpath:/db/test
   ```

Após as configurações iniciais é necessário criar a pasta em que serão armazenados os scripts SQL para criação/alteração dos schemas. O caminho padrão é: **src/main/resources/db/migration**. Mas nesse projeto esse caminho foi editado no aquivo **application.yml**, sendo que para cada *profile* de execução foi criado um caminho diferente para armazenar os *scripts*. Por exemplo, **flyway: locations: classpath:/db/dev** é o caminho dos *scripts* para o *profile* **dev** utilizado para o desenvolvimento.

Para nomear os arquivos de script deve ser adotado o padrão da biblioteca, o qual tambem possui uma ordem de execução, tudo está descrito na [documentação do Flyway](https://flywaydb.org/documentation/concepts/migrations.html#naming-1).

### Funcionamento

Após criados os arquivos de script SQL nos diretórios e nomeados conforme a documentação, será possível realizar a primeira migração, a qual contém o script inicial para criação do banco de dados. Executando o projeto as migrações serão executadas na ordem do versionamento e para cada script executado será adicionado um registro na tabela **flyway_schema_history**.

A tabela **flyway_schema_history** contém uma chave primária, a versão do banco de dados, a descrição, o tipo do script (geralmente SQL), o nome do arquivo do script, o checksum do arquivo de script. Nessa tabela também é exibido o usuário do banco de dados que foi utilizado para executar o script, a data de execução, o tempo de execução e por fim um valor booleano indicando se a migração ocorreu com sucesso.

O framework Flyway executa os passos abaixo para validar o banco de dados da aplicação:
The framework performs the following steps to accommodate evolving database schemas:
1. Verifica se o banco de dados possui a tabela  **flyway_schema_history**, caso ela não exista é criada.
2.  Busca no classpath da aplicação por arquivos contendo migrações.
3.  Compara cada arquivo de migração encontrado com os dados existentes na tabela de histório. Se o número de versão do arquivo for menor que o da última atualização existente no banco de dados, eles são ignorados.
4.  Caso existam migrações para serem executadas o framework coloca em fila. As migrações são executadas da menor versão para maior.
5.  Cada migração é executada e a tabela **flyway_schema_history** é atualizada.

# Referências
[1] Spring Framework, https://spring.io/.

[2] JOHNSON, R. E.; FOOTE, B.. Designing reusable classes. Journal of Object-Oriented Programming, 1(2):22–35, 1988.

[3] Prasanna, D.R., Dependency Injection: Design Patterns Using Spring and Guice, isbn=9781933988559, Manning- Manning Pubs Co Series,  url: https://books.google.com.br/books?id=b6O6OgAACAAJ, 2009.

[4] Spring Data JPA - Disponível em: https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#reference

[5] Fielding, Roy. Architectural Styles and the Design of Network-based Software Architectures  Disponível em: https://www.ics.uci.edu/~fielding/pubs/dissertation/fielding_dissertation.pdf

[6] BCryptPasswordEncoder. Disponível em: https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/crypto/bcrypt/BCryptPasswordEncoder.html

[7] Java Bean Validation. Disponível em:  https://beanvalidation.org/3.0/

[8] Spring Security [https://spring.io/projects/spring-security](https://spring.io/projects/spring-security)

[9] CSRF Attack [https://docs.spring.io/spring-security/reference/features/exploits/csrf.html#csrf-explained](https://docs.spring.io/spring-security/reference/features/exploits/csrf.html#csrf-explained)
