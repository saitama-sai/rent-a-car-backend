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
      rootPath: join(__dirname, '..', 'userUploads'),
      serveRoot: '/userUploads',
    }),
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: process.env.DB_HOST || 'localhost',
      port: 1433,
      username: 'sa',
      password: process.env.DB_PASSWORD,
      database: 'rentacar_db',
      entities: [User, Brand, Car, Feature, Rental],
      synchronize: true,
      options: {
        encrypt: false,
        trustServerCertificate: true,
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