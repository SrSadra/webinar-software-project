import { CanActivate, ExecutionContext, ForbiddenException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    // get the roles required
    const roles = this.reflector.getAllAndOverride<string[]>('roles', [context.getHandler(), context.getClass()]);
    if (!roles) {
      throw new InternalServerErrorException("There is no roles specified!");
    }
    const request = context.switchToHttp().getRequest();
    const userRoles = request.headers?.user?.role?.split(',');
    console.log(userRoles);
    const validate = this.validateRoles(roles, userRoles);
    if(!validate){
        throw new ForbiddenException("You dont have access to this route!");
    }
    return validate;
  }

  validateRoles(roles: string[], userRoles: string[]) {
    return roles.some(role => userRoles.includes(role));
  }
}