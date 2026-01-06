import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  // 1. Kullanıcıyı Doğrulama (Email ve Şifre kontrolü)
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    // Eğer kullanıcı varsa VE şifresi eşleşiyorsa
    if (user && await bcrypt.compare(pass, user.password)) {
      // Şifreyi sonuçtan çıkar, sadece kullanıcı bilgilerini döndür
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // 2. Giriş Yapma (Token Üretme)
  async login(user: any) {
    // Token içine gizlenecek bilgiler (Payload)
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload), // Token'ı imzala ve ver
    };
  }

  async register(user: any) {
    return this.usersService.create(user.email, user.password, user.role, user.firstName, user.lastName, user.profilePictureUrl);
  }
}