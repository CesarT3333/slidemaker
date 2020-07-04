# Arquivos necessários para o ambiente de desenvolvimento
## Arquivo de environments 

> Para a integração com o banco de dados
> e demais serviçoes do `google`
> é necessário adicionar um arquivo de `environment` na pasta
> raiz do projeto de `backend` com a finalidade de prover
> o ambiente de desenvolvimento

File: `.env`

```
URL_FRONTEND= http://localhost:3000

SECRET_JWT=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
POSTGRES_URL_STRING=postgresql://[user]:[password]@localhost:5432/slidemakerdb

GOOGLE_URL_CALLBACK= http://localhost:4200/auth/google/callback
GOOGLE_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxx
GOOGLE_CLIENT_SECRET=xxxxxxxxxxxxxxxxx
```
---

## Rodar a aplicação

```sh
# watch mode (nodemon)
$ npm run start:dev

# production mode
$ npm run start:prod
```
---

## Typeorm
#### Comandos
> Criação de Migrations

```sh
npm run typeorm:cli -- migration:create -n [nome-da-migration]
```

> Execução de migrations

```sh
npm run typeorm:cli -- migration:run
```
#### Documentação
[Documentação `typeorm`](https://github.com/typeorm/typeorm/blob/master/src/driver/types/ColumnTypes.ts)

[Tipos de colunas](https://github.com/typeorm/typeorm/blob/master/src/driver/types/ColumnTypes.ts)

---

## Validações de requisição
#### Documentação
[Class Validator](https://github.com/typestack/class-validator)

---
