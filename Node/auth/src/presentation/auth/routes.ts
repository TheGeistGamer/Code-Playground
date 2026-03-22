import { AuthDataSourceImpl, AuthRepositoryImpl } from '../../infrastructure'
import { AuthMiddleWares } from '../middlewares/auth.middleware'
import { AuthController } from './controller'
import { Router } from 'express'

export class AuthRoutes {
  static get routes (): Router {
    const router = Router();
  
    const database = new AuthDataSourceImpl()
    const authRepository = new AuthRepositoryImpl(database)
    const controller = new AuthController(authRepository)

    // Definir todas las rutas principales
    router.post('/login', controller.loginUser)
    router.post('/register', controller.registerUser)
    router.get('/users', AuthMiddleWares.validateToken, controller.getUsers)

    return router
  }
}