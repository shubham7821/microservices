// token-blacklist.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class TokenBlacklistService {
  private readonly blacklist: Set<string>;

  constructor() {
    this.blacklist = new Set<string>();
  }

  addToBlacklist(token: string) {
    this.blacklist.add(token);
  }

  isTokenBlacklisted(token: string): boolean {
    return this.blacklist.has(token);
  }
}
