# Next.js OpenJira App

## Configurar las variables de entorno
Renombrar el archivo __.env.template__ a __.env__ y configurar las variables de entorno.

* Mongo URL Local:
```
    MONGO_URL=mongodb://localhost:27017/entriesdb
```

* Mongo URL AgroIntelligent:
```
    MONGO_URL=mongodb://91.121.247.41:27017/entriesDB
```

* Reconstruir los módulos de node
```
    npm run build
    npm run dev
```

## Llenar la base de datos con informacion de prueba

LLamar a la ruta __/api/seed__ para llenar la base de datos con informacion de prueba.

```
    http://localhost:3000/api/seed
```

