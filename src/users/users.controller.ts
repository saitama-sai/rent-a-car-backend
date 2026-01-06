import { Controller, Post, Body, Get, Put, Param, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UsersService } from './users.service';
import { UserRole } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  // POST: Yeni Kullanıcı Ekle
  @Post()
  create(@Body() body: any) {
    // Şimdilik test için şifreyi şifrelemeden (hashlemeden) kaydediyoruz.
    // Auth kısmına geçince burayı düzelteceğiz.
    return this.usersService.create(body.email, body.password, body.role, body.firstName, body.lastName);
  }

  // GET: Kullanıcıları Listele
  @Get()
  getAll() {
    return this.usersService.findAll();
  }

  // PUT: Kullanıcı Güncelle
  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.usersService.update(id, body);
  }

  @Post(':id/upload-profile-picture')
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
  async uploadProfilePicture(@Param('id') id: string, @UploadedFile() file: any) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    const fileUrl = `/uploads/${file.filename}`;
    await this.usersService.update(id, { profilePictureUrl: fileUrl });
    return { url: fileUrl };
  }
}
