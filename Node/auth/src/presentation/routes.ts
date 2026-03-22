import { AuthRoutes } from './auth/routes'
import { Router } from 'express'

export class AppRoutes {
  static get routes (): Router {
    const router = Router();
    // Definir todas las rutas principales
    router.use('/api/auth', AuthRoutes.routes)


    return router
  }
}