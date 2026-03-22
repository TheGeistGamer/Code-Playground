import { AppRoutes } from './presentation/routes'
import { MongoDatabase } from './data/index'
import { Server } from './presentation/server'
import { envs } from './config/index'

(() => {
  main()
})()

async function main () {
  // todo: await base de datos
  await MongoDatabase.connect({
    dbName: envs.MONGO_DB_NAME,
    mongoUrl: envs.MONGO_URL
  })

  // todo: inicio del servidor
  new Server({
    port: envs.PORT,
    routes: AppRoutes.routes
  }).start()
}