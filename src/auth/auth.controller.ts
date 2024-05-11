import {
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Req,
  Get,
  Headers,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Request } from 'express';
import JwtAuthGuard from './guards/jwt-auth.guard';
// import  JwtAuthGuard  from './guards/jwt-auth.guard';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: 'Login as a user',
  })
  @UsePipes(ValidationPipe)
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() req: Request) {
    return await this.authService.login(req.user);
  }
  @Get('profile')
  async getProfile(@Headers('authorization') authorization: string) { // Use @Headers decorator instead of Headers type
    const token = authorization.split(' ')[1]; // Extract token from Authorization header
    return await this.authService.getProfile(token);
  }


  @UseGuards(JwtAuthGuard) // Assuming you need authentication to log out
  @Post('/logout')
  async logout(@Req() req: Request) {
    const token = req.headers.authorization.split(' ')[1]; // Extract token from Authorization header
    await this.authService.logout(token);
    return { message: 'Logout successful' };
  }
  
}
