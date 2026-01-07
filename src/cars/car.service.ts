import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Car } from './car.entity';

import { Brand } from '../brands/brand.entity';
import { Feature } from '../features/feature.entity';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car)
    private carRepository: Repository<Car>,
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,
    @InjectRepository(Feature)
    private featureRepository: Repository<Feature>,
  ) { }

  async seed() {
    // 1. Markaları Ekle
    const brands = ["Toyota", "BMW", "Mercedes", "Audi", "Tesla", "Ford", "Honda", "Hyundai", "Volvo", "Nissan"];
    for (const name of brands) {
      const exists = await this.brandRepository.findOneBy({ name });
      if (!exists) {
        await this.brandRepository.save({ name });
      }
    }

    // 2. Özellikleri Ekle
    const features = ["Sunroof", "Autopilot", "GPS", "Bluetooth", "Hybrid", "Heated Seats", "Leather Interior", "360 Camera", "Apple CarPlay"];
    for (const name of features) {
      const exists = await this.featureRepository.findOneBy({ name });
      if (!exists) {
        await this.featureRepository.save({ name });
      }
    }

    return { message: "Database seeded successfully with Brands and Features!" };
  }

  // Tüm arabaları getirir (Markası ve Özellikleriyle birlikte)
  findAll(): Promise<Car[]> {
    return this.carRepository.find({
      relations: ['brand', 'features'], // İlişkili tabloları da getir
    });
  }

  // Yeni araba ekler
  async create(carData: Partial<Car>): Promise<Car> {
    console.log('Incoming Car Data:', JSON.stringify(carData));
    try {
      const newCar = this.carRepository.create(carData);
      // TypeORM relations (brand, features) saved automatically if cascade is on or if object structure is correct.
      // For ManyToOne (brand), mapping like { brand: { id: 1 } } works.
      // For ManyToMany (features), mapping like { features: [{ id: 1 }] } works.
      const saved = await this.carRepository.save(newCar);
      console.log('Saved Car:', saved);
      return saved;
    } catch (error) {
      console.error('Error creating car:', error);
      throw error; // Re-throw to let Controller/Global Filter handle it, but now we see it in terminal
    }
  }

  // Araba Güncelle
  async update(id: number, carData: Partial<Car>): Promise<Car> {
    // TypeORM save methodu varsa günceller, yoksa ekler (id varsa)
    // Ama önce preload yapmak daha güvenli.
    const car = await this.carRepository.preload({
      id: id,
      ...carData,
    });
    if (!car) {
      throw new Error('Araba bulunamadı');
    }
    return this.carRepository.save(car);
  }

  // Araba Sil
  async delete(id: number): Promise<void> {
    await this.carRepository.delete(id);
  }

  // Araba Teslim Al (Müsait hale getir)
  async returnCar(id: number): Promise<Car> {
    const car = await this.carRepository.findOneBy({ id });
    if (!car) {
      throw new Error('Araba bulunamadı');
    }
    car.available = true;
    return this.carRepository.save(car);
  }
}