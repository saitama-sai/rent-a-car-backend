import { Controller, Post, Body, UnauthorizedException, Get, UseGuards, Request, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport'; 
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  async login(@Body() body: any) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      throw new UnauthorizedException('Kullanıcı adı veya şifre hatalı!');
    }
    const result = await this.authService.login(user);
    return {
      token: result.access_token,
      user: user // Frontend ID'ye buradan erişecek
    };
  }

  @Post('register')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './userUploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = extname(file.originalname);
        cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
      }
    })
  }))
  async register(@Body() body: any, @UploadedFile() file: any) {
    const userData = { ...body };
    if (file) {
      userData.profilePictureUrl = `/userUploads/${file.filename}`;
    }
    return this.authService.register(userData);
  }

  @UseGuards(AuthGuard('jwt')) // <-- Bu satır "Sadece Token'ı olan girebilir" der
  @Get('profile')
  getProfile(@Request() req) {
    return req.user; // Token'ın içindeki bilgiyi gösterir
  }
}