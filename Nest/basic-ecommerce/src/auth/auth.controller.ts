import { Controller, Post, Body, Get, UseGuards, Req, SetMetadata } from '@nestjs/common'
import { CreateUserDto, LoginUserDto } from './dto'
import { Auth, GetUser, RawHeaders } from './decorators'
import { User } from './entities/user.entity'
import { AuthService } from './auth.service'
import { AuthGuard } from '@nestjs/passport'
import { UserRoleGuard } from './guards/user-role/user-role.guard'
import { RoleProtected } from './decorators/role-protected.decorator'
import { ValidRoles } from './interface'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('private')
  @UseGuards(AuthGuard())
  testingPrivateRoute(
    @GetUser() user: User,
    @GetUser('email') userEmail: string,
    @RawHeaders() rawHeaders: string[]
  ) {
    return 'This is a private route';
  }

  @Get('private2')
  @RoleProtected(ValidRoles.adim)
  @UseGuards(AuthGuard(), UserRoleGuard)
  privateRoute2(
    @GetUser() user: User
  ) {
    return {
      ok: true,
      user
    }
  }

  @Get('private3')
  @Auth(ValidRoles.adim)
  privateRoute3(
    @GetUser() user: User
  ) {
    return {
      ok: true,
      user
    }
  }


}
