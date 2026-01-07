import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './users/user.entity';
import { Brand } from './brands/brand.entity';
import { Car } from './cars/car.entity';
import { Feature } from './features/feature.entity';
import { Rental } from './rentals/rental.entity';

// Modülleri import ediyoruz
import { CarsModule } from './cars/cars.module';
import { BrandsModule } from './brands/brands.module';
import { FeaturesModule } from './features/features.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RentalsModule } from './rentals/rentals.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      // DÜZELTİLEN SATIR BURASI (psql silindi, tırnaklar eklendi):
      url: 'postgresql://neondb_owner:npg_76kgWuhKprba@ep-purple-hat-agglmpco-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require',
      entities: [User, Brand, Car, Feature, Rental],
      synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    CarsModule,
    BrandsModule,
    FeaturesModule,
    UsersModule,
    AuthModule,
    RentalsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }