## Rodar a aplicação

```bash
# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

---

## Hash de geração de token da aplicação para autenticação JWT

> Para a integração com o banco de dados
> é necessário adicionar um arquivo de `environment` na pasta
> raiz do projeto de `backend`

File: `.env`

```
URL_FRONTEND= http://localhost:3000

POSTGRES_URL_STRING=postgresql://[user]:[password]@localhost:5432/slidemakerdb

GOOGLE_URL_CALLBACK= http://localhost:4200/auth/google/callback
GOOGLE_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxx
GOOGLE_CLIENT_SECRET=xxxxxxxxxxxxxxxxx
```

---

## Comandos typeorm

> Criação de Migrations

```sh
npm run typeorm:cli -- migration:create -n [nome-da-migration]
```

> Execução de migrations

```sh
npm run typeorm:cli -- migration:run
```

