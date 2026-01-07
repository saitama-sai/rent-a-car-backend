import { Controller, Post, Body, Get, UseGuards, Request, Put, Param, Delete } from '@nestjs/common';
import { RentalsService } from './rentals.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../users/user.entity';

// Basitlik için AuthGuard kullanmıyoruz ama production'da @UseGuards(JwtAuthGuard) olmalı.
// Burada User ID'yi body'den alacağız şimdilik, frontend'den göndereceğiz.

@Controller('rentals')
export class RentalsController {
    constructor(private readonly rentalsService: RentalsService) { }

    @Post()
    async create(@Body() body: { userId: string; carId: number; startDate: string; endDate: string }) {
        try {
            return await this.rentalsService.create(body.userId, body.carId, body.startDate, body.endDate);
        } catch (error) {
            console.error(error);
            throw error; // NestJS will handle HttpException, others will be 500 but logged
        }
    }

    @Get()
    async findAll() {
        return this.rentalsService.findAll();
    }

    @Put(':id')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(UserRole.ADMIN)
    async update(@Param('id') id: string, @Body() rentalData: any) {
        return this.rentalsService.update(+id, rentalData);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(UserRole.ADMIN)
    async delete(@Param('id') id: string) {
        return this.rentalsService.delete(+id);
    }
}
