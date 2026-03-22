import { AuthDataSource, CustomError, RegisterUserDto, UserEntity } from '../../domain'
import { LoginUserDto } from '../../domain/dtos/auth/login-user.dto'
import { UserMapper } from '../mappers/user.mapper'
import { BcryptAdapter } from '../../config'
import { UserModel } from '../../data'

type HasFunction = (password: string) => string;
type CompareFunction = (password: string, hashedPassword: string) => boolean;

export class AuthDataSourceImpl implements AuthDataSource {
  constructor (
    private readonly hashPassword: HasFunction = BcryptAdapter.hash,
    private readonly comparePassword: CompareFunction = BcryptAdapter.compare
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { name, email, password } = registerUserDto;

    try {
      // 1. Verificar si el correo existe
      const emailExist = await UserModel.findOne({ email })
      if (emailExist) throw CustomError.badRequest('Email already exists')
      
      // 2. Hash de contraseña
      const user = await UserModel.create({
        name,
        email,
        password: this.hashPassword(password)
      })

      await user.save()

      // 3. Mapear la respuesta a nuestra entidad
      return UserMapper.userEntityFromObject(user)
    } catch (error) {
      if (error instanceof CustomError) throw error

      throw CustomError.internalServerError()
    }
  }

  async login (loginUserDto: LoginUserDto): Promise<UserEntity> {
    const { email, password } = loginUserDto;

    try {
      // 1. Verificar si el correo existe
      const user = await UserModel.findOne({ email })
      if (!user) throw CustomError.badRequest('Email does not exists')
      
      // 2. Comparar contraseñas
      const isValidPassword = this.comparePassword(password, user.password)
      if (!isValidPassword) throw CustomError.badRequest('Invalid password')
      
      // 3. Mapear la respuesta a nuestra entidad
      return UserMapper.userEntityFromObject(user)
    } catch (error) {
      if (error instanceof CustomError) throw error
      throw CustomError.internalServerError()
    }
  }
}