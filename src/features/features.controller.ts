import { Controller, Get, Post, Body } from '@nestjs/common';
import { FeaturesService } from './features.service';

@Controller('features') // Adres: /features
export class FeaturesController {
  constructor(private readonly featuresService: FeaturesService) {}

  @Post()
  create(@Body('name') name: string) {
    return this.featuresService.create(name);
  }

  @Get()
  findAll() {
    return this.featuresService.findAll();
  }
}