import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller'; // 1. BU SATIR VAR MI?
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController], // 2. BURASI ÇOK ÖNEMLİ: Köşeli parantez içinde yazmalı
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}