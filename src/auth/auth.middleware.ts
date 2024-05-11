import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      try {
        const decoded = this.jwtService.verify(token);
        req['user'] = decoded;
        next();
      } catch (error) {
        res.status(401).send({ message: 'Unauthorized' });
      }
    } else {
      res.status(401).send({ message: 'Unauthorized' });
    }
  }
}