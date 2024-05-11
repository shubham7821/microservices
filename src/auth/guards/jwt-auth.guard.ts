// // guards/jwt-auth.guard.ts

// import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { Observable } from 'rxjs';
// import { Role } from './role.enum';
// import { AuthGuard } from '@nestjs/passport';

//  {}

// @Injectable()
// export class JwtAuthGuard implements CanActivate {
//   constructor(private reflector: Reflector) {}

//   canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
//     const roles = this.reflector.get<Role[]>('roles', context.getHandler());
//     if (!roles) {
//       return true;
//     }
//     const request = context.switchToHttp().getRequest();
//     const user = request.user;
//     console.log(roles);
//     console.log(request.user);
//     return roles.includes(user.role);
//   }
// }


import { AuthGuard } from '@nestjs/passport';

export default class JwtAuthGuard extends AuthGuard('jwt') {}