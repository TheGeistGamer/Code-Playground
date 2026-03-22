import { AuthDataSource, AuthRepository, RegisterUserDto, UserEntity } from '../../domain'
import { LoginUserDto } from '../../domain/dtos/auth/login-user.dto'

export class AuthRepositoryImpl implements AuthRepository {
constructor(
  private readonly authDataSource: AuthDataSource
) {}

  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    return this.authDataSource.register(registerUserDto);
  }

  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    return this.authDataSource.login(loginUserDto);
  }
}