// users.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity'; // Import the User entity
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  [x: string]: any;
  // Assuming you have a method like this in your service
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    // Implement the logic to update the user
    const user = await this.findOneById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    // Update the user properties based on updateUserDto
    // For example:
    user.name = updateUserDto.name;
    user.email = updateUserDto.email;
    // Save the updated user to the database
    await user.save();
    // Return the updated user
    return user;
  }
  async findAll(): Promise<User[]> {
    try {
      // Fetch all users from the database
      const users = await this.userRepository.find();
      return users;
    } catch (error) {
      // Handle errors
      console.error('Error fetching users:', error);
      throw new Error('Failed to fetch users');
    }
  }
  // Other methods in the UsersService
}
