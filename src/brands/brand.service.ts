import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from './brand.entity';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,
  ) { }

  findAll(): Promise<Brand[]> {
    return this.brandRepository.find();
  }

  create(name: string): Promise<Brand> {
    const newBrand = this.brandRepository.create({ name });
    return this.brandRepository.save(newBrand);
  }

  async update(id: number, name: string): Promise<Brand | null> {
    await this.brandRepository.update(id, { name });
    return this.brandRepository.findOneBy({ id });
  }

  async delete(id: number): Promise<void> {
    await this.brandRepository.delete(id);
  }
}
