// import { Injectable } from '@nestjs/common';
// import { UsersService } from '../users/users.service';
// import { JwtService } from '@nestjs/jwt';

// @Injectable()
// export class AuthService {
//   constructor(
//     private readonly usersService: UsersService,
//     private jwtService: JwtService,
//   ) {}

//   async validateUser(email: string, password: string): Promise<any> {
//     return await this.usersService.findOne(email, password);
//   }

//   async login(user: any) {
//     try {
//       const payload = { email: user.email, sub: user.id, role: user.role };
//       return {
//         ...payload,
//         token: this.jwtService.sign(payload),
//       };
//     } catch (error) {
//       throw new Error(`Error logging in ${error} user ${error.message}`);
//     }
//   }
// }

// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { UsersService } from '../users/users.service';
// import { JwtService } from '@nestjs/jwt';

// @Injectable()
// export class AuthService {
//   getProfile(token: string) {
//     throw new Error('Method not implemented.');
//   }
//   constructor(
//     private readonly usersService: UsersService,
//     private jwtService: JwtService,
//   ) {}

//   // Method to validate user credentials during login
//   async validateUser(email: string, password: string): Promise<any> {
//     // Assuming your usersService has a method to find a user by email and password
//     // Adjust this according to your actual implementation
//     return await this.usersService.findOne(email, password);
//   }

//   // Method to handle user login
//   async login(user: any) {
//     try {
//       // Creating a payload for JWT token including user's email, id, and role
//       const payload = { email: user.email, sub: user.id, role: user.role };
      
//       // Generating JWT token with the payload
//       const token = this.jwtService.sign(payload);
      
//       // Returning the payload and token
//       return {
//         ...payload,
//         token: token,
//       };
//     } catch (error) {
//       // Catching any error that might occur during login
//       // and throwing a custom error message
//       throw new Error(`Error logging in user: ${error.message}`);
//     }
//   }
  
// }

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // Method to validate user credentials during login
  async validateUser(email: string, password: string): Promise<any> {
    // Assuming your usersService has a method to find a user by email and password
    // Adjust this according to your actual implementation
    return await this.usersService.findOne(email, password);
  }

  // Method to handle user login
  async login(user: any) {
    try {
      // Creating a payload for JWT token including user's email, id, and role
      const payload = { email: user.email, sub: user.id, role: user.role };
      
      // Generating JWT token with the payload
      const token = this.jwtService.sign(payload);
      
      // Returning the payload and token
      return {
        ...payload,
        token: token,
      };
    } catch (error) {
      // Catching any error that might occur during login
      // and throwing a custom error message
      throw new Error(`Error logging in user: ${error.message}`);
    }
  }

  // Method to get user profile based on JWT token
  async getProfile(token: string): Promise<any> {
    try {
      // Verify JWT token to extract user information
      const decodedToken = this.jwtService.verify(token);
      
      // Assuming you have a method to fetch user profile from the database based on user ID
      const userProfile = await this.usersService.findById(decodedToken.sub);
      
      // Return user profile information
      return userProfile;
    } catch (error) {
      // If the token is invalid or expired, throw an unauthorized exception
      throw new UnauthorizedException('Invalid token');
    }
  }
  async logout(token: string): Promise<void> {

    return  ;
  }

}

