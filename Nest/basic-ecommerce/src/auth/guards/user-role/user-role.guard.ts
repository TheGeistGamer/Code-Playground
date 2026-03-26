import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common'
import { META_ROLES } from 'src/auth/decorators/role-protected.decorator'
import { User } from 'src/auth/entities/user.entity'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector
  ) {}

  canActivate(context: ExecutionContext ): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles = this.reflector.get(META_ROLES, context.getHandler())
    if (!validRoles || validRoles.length === 0) return true

    const req = context.switchToHttp().getRequest()
    const user = req.user as User

    if (!user) throw new BadRequestException('User not found');

    for (const role of user.roles) {
      if (validRoles.includes(role)) return true;
    }

    throw new ForbiddenException('You do not have permission to access this route')
  }
}
