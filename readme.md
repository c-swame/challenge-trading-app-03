# Challenge-trading-app-03 
  

## Sobre

  Challenge-trading-app-03 é uma api desenvolvida (em desenvolvimento .-.)
  para gerir o back-end de uma empresa de finanças, contando com endpoints para cadastro de usuários, compra e venda de ativos, execução de depositos e buscar clientes cadastrados

## Como posso testar usar api?

  O primeiro passo é fazer o clone desse repositório!
  Após isso basta:

1 - Instalar as dependências com o comando:  
```
npm install
```

2 - Configurar o arquivo ```'.env'``` como indicado no arquivo ```.env.modelo```

3 - Agora basta** rodar o comando:
```
npm start
```
** Apesar do aplicativo já está rodando, é recomendavel rodar o comando
```
npm prestart
```
e
```
npm seedAll
```
  Esse comando irá criar o banco de dados e as tabelas e povoar o banco de dos.

# Desenvolvimento

## tecnologias utilizadas:

As seguintes tecnologias foram selecionadas considerando buscando agilizar a produção e levando em conta a competência com as tecnologias e adequação com o desenvolvimento de uma API. Além de serém tecnologias bastante difundidadas no mercado em com alta confiabilidade.

* Node.js;
* Git, GitHub, GitActions;
* JavaScript;
* Sequelize (biblioteca ORM);
* MySql;
* MySql2;
* Express;
* JWT;
* Joi (validação de dados);
* http-status-codes
* Eslint;
* Nodemon;
* Mocha, chai, sinon (testes);
* pbkdf2 (implementação futura);

## Arquitetura:
O projeto foi desenvolvido no modelo MSC (model, service, controller) e seguindo os requesitos REST (com algumas excessões documentada no código);

A API foi dividida em três camadas;
A camada Model ficou responsável pela interação com o banco de dados) como responsabilidade do Sequelize;
A camada Service; responsável pela aplicação da regra de negócio;
E a camada Controller responsável por receber os dados do request do client e enviar a resposta.

Além disso, ferramentas externas, como o 'joi', o 'jasonwebtoken' e 'http-status-codes' foram colocadas em uma pasta de 'infra' a fim de desacoplar e facilitar a troca das ferramentas se necessário;

# Abordagem com o projeto;

Após a leitura dos requisitos mínimos os primeiros passo foram estruturar o esquema para o banco de dados e organizar a sequencia em que as tabelas deveriam ser criadas a fim de evitar conflitos e poder fazer entregas que fossem executaveis no menor prazor possível.


# rotas

## get /users
```
[
	{
		"codCliente": 1,
		"nome": "user1",
		"email": "email1@email.com",
		"telefone": "9999999999",
		"saldo": "320.00",
		"cpf": "123.456.789-01",
		"admin": false,
		"criadoEm": "2022-07-25T02:20:45.000Z",
		"atualizadoEm": "2022-07-25T02:20:45.000Z"
	},
	{
		"codCliente": 2,
		"nome": "user2",
		"email": "email2@email.com",
		"telefone": null,
		"saldo": "222222.22",
		"cpf": "123.456.789-02",
		"admin": false,
		"criadoEm": "2022-07-25T02:20:45.000Z",
		"atualizadoEm": "2022-07-25T02:20:45.000Z"
	},
.
.
.
  ]
```

## get ativos/:assetId
```
{
	"data": {
		"codAtivo": 1,
		"QtdeAtivo": 100,
		"Valor": "75.50"
	},
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RDbGllbnRlIjozLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTY1ODcxNzY4NywiZXhwIjoxNjU4NzE5NDg3fQ.LZqe00zgDoYydZcbj18Dt8uEjvwupr8zV8eNGaKuVso"
}
```
## get ativos/clientes/2

outras rotas, mas não deu tempo de colocar .-. foi mal
```

```


```
```

```
```

```
```
