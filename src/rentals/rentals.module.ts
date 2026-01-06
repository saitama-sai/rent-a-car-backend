import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RentalsController } from './rentals.controller';
import { RentalsService } from './rentals.service';
import { Rental } from './rental.entity';
import { Car } from '../cars/car.entity';
import { User } from '../users/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Rental, Car, User])],
    controllers: [RentalsController],
    providers: [RentalsService],
})
export class RentalsModule { }
