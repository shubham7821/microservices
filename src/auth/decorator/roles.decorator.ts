// import { ExecutionContext, SetMetadata, createParamDecorator } from '@nestjs/common';
// // import { Role } from '../../enums/role.enum';


// export const CurrentUser = createParamDecorator(
//   (data: unknown, context: ExecutionContext) => {
//     const request = context.switchToHttp().getRequest();
//     return request.user; // Extracts the user object added by Passport
//   },
// );

// import { createParamDecorator, ExecutionContext } from '@nestjs/common';
// // import { User } from './users/schemas/user.schema';

// export const getCurrentUserByContext = (context: ExecutionContext): any => {
//   if (context.getType() === 'http') {
//     return context.switchToHttp().getRequest().user;
//   }
//   if (context.getType() === 'rpc') {
//     return context.switchToRpc().getData().user;
//   }
// };

// export const CurrentUser = createParamDecorator(
//   (_data: unknown, context: ExecutionContext) =>
//     getCurrentUserByContext(context),
// );


import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);