import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenGenerator } from '@/application/cryptography/token-generator';

@Injectable()
export class JwtTokenGenerator implements TokenGenerator {
  constructor(private readonly jwtService: JwtService) {}

  async generate(): Promise<string> {
    const payload = { purpose: 'forgot-password' };
    return this.jwtService.signAsync(payload);
  }
}
