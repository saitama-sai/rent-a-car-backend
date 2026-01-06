import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { RentalsService } from './rentals.service';

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
}
