import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feature } from './feature.entity';

@Injectable()
export class FeaturesService {
  constructor(
    @InjectRepository(Feature)
    private featureRepository: Repository<Feature>,
  ) { }

  create(name: string) {
    // Basitçe gelen ismi kaydet
    const feature = this.featureRepository.create({ name });
    return this.featureRepository.save(feature);
  }

  findAll() {
    return this.featureRepository.find();
  }

  async update(id: number, name: string): Promise<Feature | null> {
    await this.featureRepository.update(id, { name });
    return this.featureRepository.findOneBy({ id });
  }

  async delete(id: number): Promise<void> {
    await this.featureRepository.delete(id);
  }
}