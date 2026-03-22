import { AuthRepository, CustomError, RegisterUser, RegisterUserDto } from '../../domain'
import { LoginUser } from '../../domain/use-case/auth/login-user.usecase'
import { LoginUserDto } from '../../domain/dtos/auth/login-user.dto'
import { Request, response, Response } from 'express'
import { UserModel } from '../../data'

export class AuthController {
  constructor (
    private readonly authRepository: AuthRepository
  ) {}

  private handleError = (error: unknown, res = response) => {
    // manejar errores personalizados
    if (error instanceof CustomError) return res.status(error.statusCode).json({ error: error.message })

    // manejar errores de servidor
    console.log(error)
    return res.status(500).json({ error: 'Internal server error' })
  }

  registerUser = async (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body)
    if (error) return res.status(400).json({ error })

    new RegisterUser(this.authRepository)
      .execute(registerUserDto!)
      .then((userToken) => res.json(userToken))
      .catch(error => this.handleError(error, res))
  }

  loginUser = async (req: Request, res: Response) => {
    const [error, loginUserDto] = LoginUserDto.create(req.body)
    if (error) return res.status(400).json({ error })

    new LoginUser(this.authRepository)
    .execute(loginUserDto!)
    .then((userToken) => res.json(userToken))
    .catch(error => this.handleError(error, res))
  }

  getUsers = (req: Request, res: Response) => {
    UserModel.find()
    .then((users) => res.json({
      token: req.body.token
    }))
    .catch(error => res.status(500).json({ error: 'Internal server error'}))

  }
}