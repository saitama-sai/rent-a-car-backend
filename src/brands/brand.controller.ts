import { Controller, Get, Post, Body } from '@nestjs/common';
import { BrandService } from './brand.service';

@Controller('brands') // Adresimiz: http://localhost:3000/brands
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Get()
  getAllBrands() {
    return this.brandService.findAll();
  }

  @Post()
  createBrand(@Body('name') name: string) {
    return this.brandService.create(name);
  }
}