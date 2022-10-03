# Challenge-trading-app-03 
  
  - [Sobre](#sobre)
  - [Como executar a aplicação](#como-executar-a-aplicação)
  - [Tecnologias utilizadas](#tecnologias-utilizadas)
  - [Funcionalidades](#features)
  - [Rotas](#rotas)
  - [Implementações futuras](#implementações-futuras)


## Sobre

  Challenge-trading-app-03 é uma api desenvolvida (em desenvolvimento .-.)
  para gerir o back-end de uma empresa de finanças, contando com endpoints para cadastro de usuários, compra e venda de ativos, execução de depositos e buscar clientes cadastrados

## Como executar a aplicação:

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
  Esse comando irá criar o banco de dados e as tabelas e povoar o banco de dados.
  
  Agora basta acessar a rota ```localhost:<porta_configurada_no_.env>/docs``` e testar com a documentação Swagger ou testar com alguma ferramenta como o postman ou insomnia.

# Desenvolvimento

## Tecnologias utilizadas:

As seguintes tecnologias foram selecionadas considerando buscando agilizar a produção e levando em conta a competência com as tecnologias e adequação com o desenvolvimento de uma API. Além de serém tecnologias bastante difundidadas no mercado em com alta confiabilidade.

* Node.js;
* Git, GitHub, GitActions;
* JavaScript;
* Sequelize (biblioteca ORM);
* MySql;
* MySql2;
* Express;
* JWT;
* Swagger
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

## Features:
- [x] Criar uma lista de ações que passe às informações para Front-End (inclusive as informações da quantidade investida em cada ação).
- [x] Criar uma rota de login para verificar se um usuário existe no banco de dados para assim gerar o Token do JWT.
- [x] Requisição de compra de Ativos.
- [x] Requisição de venda de Ativos.
- [x] Listar todos os ativos de uma pessoa cliente.
- [x] Listar todas as informações de um ativo, pelo seu id.
- [x] Realizar um saque da conta de um cliente.
- [x] Realizar um depósito da conta de um cliente.
- [x] Retornar o valor do saldo de um cliente pelo seu id.


# rotas

![image da documentação](https://raw.githubusercontent.com/c-swame/challenge-trading-app-03/main/Screenshot%20from%202022-09-29%2019-46-29.png)

Para mais informações consultar o swagger. Caso a imagem não carregue abaixo estão as rotas e o retorno esperado de cada rota.

## post /sign/up

```
{
	"data": {
		"codCliente": 2,
		"admin": false,
		"nome": "user2",
		"email": "email2@email.com",
		"cpf": "123.456.789-05"
	},
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RDbGllbnRlIjo1LCJhZG1pbiI6ZmFsc2UsImlhdCI6MTY1ODkyOTUwMiwiZXhwIjoxNjU4OTMxMzAyfQ.zhEQsFOz9sfJNsbtdkXVNm1a-guZuQ6in-3LlkrkmL8"
}
```


## get /conta/:userId

```
{
	"codCliente": 2,
	"nome": "user2",
	"email": "email2@email.com",
	"telefone": null,
	"saldo": "150267.50",
	"cpf": "123.456.789-02",
	"admin": false,
	"criadoEm": "2022-09-18T10:02:55.000Z",
	"atualizadoEm": "2022-09-18T10:02:55.000Z"
}
```

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


## get ativos/clientes/:userId

```

{
	"data": [
		{
			"CodCliente": 25,
			"CodAtivo": 1,
			"QtdeAtivo": 0,
			"Valor": "75.50"
		},
		{
			"CodCliente": 25,
			"CodAtivo": 2,
			"QtdeAtivo": 4,
			"Valor": "100.00"
		}
	],
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RDbGllbnRlIjoyNSwiYWRtaW4iOmZhbHNlLCJpYXQiOjE2NjM2NzEyMDcsImV4cCI6MjYxMDM5OTIwN30.xBUirLjkwzAm4MxYTdcj38voGYY6sTv_zIND1whLL7I"
}
```

## post conta/deposito
```
{
	"data": 1,
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RDbGllbnRlIjoyNSwiYWRtaW4iOmZhbHNlLCJpYXQiOjE2NjM0OTUzNzUsImV4cCI6MjYxMDIyMzM3NX0.FBtN-BZf1j891r0JyPc8W4c7TM87z-LlRg06MuD9Zog"
}
```


## post conta/deposito

```
{
	"data": 1,
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RDbGllbnRlIjozLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTY1ODYzOTQ2MX0.P9migI6F8dMoKxBvXvBKURHmlfjLUpSSxU8xbbmSLmk"
}
```

## post /investimentos/comprar
```
{
	"data": {
		"codtransacao": 65,
		"codCliente": 25,
		"codAtivo": 2,
		"qtdeAtivo": 2,
		"valor": 200,
		"codOperacao": "compra",
		"entrada/saida": "saida"
	},
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RDbGllbnRlIjoyNSwiYWRtaW4iOmZhbHNlLCJpYXQiOjE2NjM2NzYzMzQsImV4cCI6MjYxMDQwNDMzNH0.hZ0LV1qkHyTaMa3MAxKM3lFoeJzF2674R5SJdGDsiMk"
}
```


## post /investimentos/vender
```
{
	"data": {
		"codtransacao": 63,
		"codCliente": 25,
		"codAtivo": 2,
		"qtdeAtivo": 2,
		"valor": 200,
		"codOperacao": "venda",
		"entrada/saida": "entrada"
	},
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RDbGllbnRlIjoyNSwiYWRtaW4iOmZhbHNlLCJpYXQiOjE2NjM2MDQwNDUsImV4cCI6MjYxMDMzMjA0NX0.5PHlAFQc8tSpp0OW-rzO3XEgUE84-LuR32elpRV1TAE"
}
```
# Implementações futuras:
- Adicionar dados esperados no request de cada rota .-.
- Tratar CPF como dado sensível;
- Rota para consultar movimentações mensais ou dentro de um dado período pelo id do usuário;
- Rota para pegar um resumo das movimentações totais da empresa dentro de um período (possibilidade de filtar pelo tipo de operação e por empresa, em caso de movimentações de compra ou venda de ativos);
