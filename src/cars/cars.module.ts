import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { Car } from './car.entity';

import { Brand } from '../brands/brand.entity';
import { Feature } from '../features/feature.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Car, Brand, Feature])], // Car, Brand ve Feature tablolarını kullanacağız
  providers: [CarService],
  controllers: [CarController],
})
export class CarsModule { }