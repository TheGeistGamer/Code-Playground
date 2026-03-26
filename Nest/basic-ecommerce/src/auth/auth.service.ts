import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './interface/jwt-payload.interface';
import { CreateUserDto, LoginUserDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
 import { hashSync, compareSync } from 'bcrypt'
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';

@Injectable() 
export class AuthService {
  constructor (
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly jwtService: JwtService
  ){}

  async create(createAuthDto: CreateUserDto) {
    try {
      const { password, ...userData} = createAuthDto

      const user = this.userRepository.create({
        ...userData,
        password: hashSync(password, 10)
      })

      await this.userRepository.save(user )
      delete user.password

      // TODO: Implement JWT token generation

      return {
        ...user,
        token: this.getJwtToken({ id: user.id })
      }
    } catch (error) {
      this.handleDBError(error)
    }
  }

  async login (loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto

    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true }
    });

    if (!user) throw new UnauthorizedException('Invalid credentials');

    if (!compareSync(password, user.password)) throw new UnauthorizedException('Invalid credentials');

    // TODO: Implement JWT token generation
    return {
      ...user,
      token: this.getJwtToken({ id: user.id })
    }
  }

  private handleDBError(error: any): never {
    if (error.code === '23505') throw new BadRequestException('User already exists')

    console.log(error)
    throw new InternalServerErrorException('Internal server error')
  }

  private getJwtToken (payload: JwtPayload) {
    return this.jwtService.sign(payload)
  }
}
