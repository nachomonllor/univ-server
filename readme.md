# Ng University 

API rest creada con express, sequelize (ORM - Object relational mapper)

## Arrancar el proyecto de la api rest
```
npm start
```

## Express crea un servidor web
```
npm i -S -E express
```

## babel interpreta el JS moderno
```
npm i -S babel-cli babel-preset-env babel-preset-stage-3 babel-register
```

## Instalo sequelize
```
npm i -S -E sequelize sequelize-transforms
```

## driver de postgres para usar con sequelize
```
npm i -S -E pg pg-hstore
```

## bcryptjs sirve para encriptar passwords
```
npm i -S -E bcryptjs
```

## crear migraciones
```
npx sequelize-cli migration:generate --name create-users
```

## Ejecutar migraciones
Las migraciones crean las tablas y relaciones
```
node_modules/.bin/sequelize db:migrate (forma larga) 
npx sequelize-cli db:migrate (forma corta mas usada)
```

## Ejecutar rollback en migraciones

deshace los cambios de la ultima migracion
```
node_modules/.bin/sequelize db:migrate:undo:all
npx sequelize-cli db:migrate:undo
```

borra todo
```
npx db:migrate:undo:all
```

## Crear seeder
sirve inicializar una tabla con datos de ante mano
```
npx sequelize-cli seed:generate --name user
```

## Ejecutar todos los seeders
```
npx sequelize-cli db:seed:all
```

## Deshacer todos los seed ejecutados
```
npx sequelize-cli db:seed:undo:all
```

## Crear modelos
```
npx sequelize-cli model:generate --name User --attributes fullname:string,lastname:string
```

## Enviar Mails para verificar cuenta con nodemailer
```
npm i -S -E nodemailer nodemailer-express-handlebars
```

## jsonwebtoken sirve para crear tokens bearer
```
npm i -S -E jsonwebtoken
```
