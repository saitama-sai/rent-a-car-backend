import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // Token'ı "Authorization: Bearer <token>" başlığından oku
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // Süresi dolmuş tokenları reddet
      secretOrKey: 'COK_GIZLI_ANAHTAR_BURAYA_YAZILACAK', // AuthModule ile AYNI olmalı
    });
  }

  async validate(payload: any) {
    // Token geçerliyse, içindeki bilgileri (id, email) geri döndür
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}