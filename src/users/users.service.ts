import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/users.entity';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from 'src/auth/dto/update-user.dto';

@Injectable()
export class UsersService {
  [x: string]: any;

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = new User();
      const hashPassword = await bcrypt.hash(createUserDto.password, 10);
      user.username = createUserDto.username;
      user.email = createUserDto.email;
      user.password = hashPassword;
      user.role = createUserDto.role;
      return this.userRepository.save(user);
    } catch (err) {
      throw new Error(`Error creating ${err} user ${err.message}`);
    }
  }

  async findOne(email: string, password: string): Promise<User | undefined> {
    try {
      const user = await this.userRepository.findOne({
        where: { email },
      });
      const isMatch = await bcrypt.compare(password, user.password);
      if (user && isMatch) {

        return user;
      } else {
        throw new Error(`User not found`);
      }
    } catch (err) {
      throw new Error(`Error finding ${err} user ${err.message}`);
    }
  }

  async findById(id: string): Promise<User> {
    // Using findOne correctly with the ID
    const user = await this.userRepository.findOne({
      where: { id: id }
    });

    if (!user) {
      throw new Error(`User not found with ID: ${id}`);
    }
    return user;
  }
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
}
// async remove(id: string): Promise<void> {
//   try {
//     await this.userRepository.delete(id);
//   } catch (err) {
//     throw new Error(`Error deleting user: ${err.message}`);
//   }
// }

async remove(id: string): Promise<void> {
  try {
    await this.userRepository.delete(id);
  } catch (err) {
    throw new Error(`Error deleting user: ${err.message}`);
  }
}
// async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
//   try {
//     const user = await this.userRepository.findOne({ where: { id } });
//     if (!user) {
//       throw new Error(`User with ID ${id} not found`);
//     }

//     if (updateUserDto.username) {
//       user.username = updateUserDto.username;
//     }
//     if (updateUserDto.email) {
//       user.email = updateUserDto.email;
//     }
//     if (updateUserDto.role) {
//       user.role = updateUserDto.role;
//     }
//     if (updateUserDto.status) {
//       user.status = updateUserDto.status;
//     }
//     // Add other properties as needed

//     return await this.userRepository.save(user); // Return the updated user
//   } catch (err) {
//     throw new Error(`Error updating user: ${err.message}`);
//   }
// }

async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
  const user = await this.userRepository.findOne({ where: { id } });
  if (!user) {
    throw new NotFoundException(`User with ID ${id} not found`);
  }

  const fieldsToUpdate = ['username', 'email', 'role', 'status']; // Add more fields as needed
  fieldsToUpdate.forEach(field => {
    if (updateUserDto[field] !== undefined) {
      user[field] = updateUserDto[field];
    }
  });

  try {
    return await this.userRepository.save(user);
  } catch (err) {
    throw new Error(`Error updating user: ${err.message}`);
  }
}
}
