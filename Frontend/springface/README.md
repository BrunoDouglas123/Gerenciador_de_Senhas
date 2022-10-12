Gerenciador de Senhas

Comandos para Rodar o Projeto 

FRONTEND(Rodar na Porta: http://localhost:3000/)
1)Para instalar as dependencias
npm install
2)Para rodar projeto
$ npm run dev

BACKEND
1)Para instalar as dependencias
npm install
2)Configure SQLite Database
npm i @adonisjs/lucid
$ node ace configure @adonisjs/lucid // # Com isso Selecione a Opção "SQLITE", e depois "In the Terminal"
3)Run Migrations(SQLite DB path: 'tmp/db.sqlite3')
node ace migration:run
4)Para rodar projeto
npm run dev
