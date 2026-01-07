import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { BrandService } from './brand.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../users/user.entity';

@Controller('brands') // Adresimiz: http://localhost:3000/brands
export class BrandController {
  constructor(private readonly brandService: BrandService) { }

  @Get()
  getAllBrands() {
    return this.brandService.findAll();
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  createBrand(@Body('name') name: string) {
    return this.brandService.create(name);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  updateBrand(@Param('id') id: string, @Body('name') name: string) {
    return this.brandService.update(+id, name);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  deleteBrand(@Param('id') id: string) {
    return this.brandService.delete(+id);
  }
}