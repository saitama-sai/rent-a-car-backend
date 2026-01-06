import { Controller, Get, Post, Body, UseGuards, Put, Delete, Param } from '@nestjs/common';
import { CarService } from './car.service';
import { Car } from './car.entity';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../users/user.entity';

@Controller('cars') // Adresimiz: http://localhost:3000/cars
export class CarController {
  constructor(private readonly carService: CarService) { }

  @Get('seed')
  seedCount() {
    return this.carService.seed();
  }

  @Get('test-create')
  async testCreate() {
    try {
      // Hardcoded test car
      return await this.carService.create({
        model: "Test Model",
        brand: { id: 1 } as any, // Assuming brand ID 1 exists (Toyota from seed)
        year: 2024,
        color: "Test Color",
        plate: "34TEST99",
        dailyPrice: 1000,
        available: true,
        imageUrl: "https://via.placeholder.com/150",
        features: []
      });
    } catch (e) {
      return { error: e.message, stack: e.stack };
    }
  }

  @Get()
  getAllCars() {
    return this.carService.findAll();
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  addCar(@Body() carData: Partial<Car>) {
    return this.carService.create(carData);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  updateCar(@Param('id') id: string, @Body() carData: Partial<Car>) {
    return this.carService.update(+id, carData);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  deleteCar(@Param('id') id: string) {
    return this.carService.delete(+id);
  }
}