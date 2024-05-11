import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  UsePipes,
  ValidationPipe,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import  JwtAuthGuard  from '../auth/guards/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './entity/users.entity';
import UpdateUserDto from './dto/update-user.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  @ApiOperation({
    summary: 'Sign Up as a user',
  })
  @UsePipes(ValidationPipe)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
  
  // Endpoint to retrieve a specific user by ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findById(id);
  }

  // Endpoint to update a user by ID
  @Put(':id')
  @UsePipes(ValidationPipe)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
async remove(@Param('id') id: string): Promise<{ message: string }> {
  try {
    await this.usersService.remove(id);
    return { message: 'User deleted successfully' };
  } catch (err) {
    throw new Error(`Error deleting user: ${err.message}`);
  }
}
  // // Endpoint to delete a user by ID
  // @Delete(':id')
  // async remove(@Param('id') id: string): Promise<void> {
  //   return this.usersService.remove(id);
  // }
  
}
