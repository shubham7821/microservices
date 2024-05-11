import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service';

@Injectable()
export class UsersProvider {
  constructor(private readonly usersService: UsersService) {}

  // You can define additional methods or properties here
}
