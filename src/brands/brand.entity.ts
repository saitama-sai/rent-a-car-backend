import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Car } from '../cars/car.entity'; // Car tablosunu import ediyoruz

@Entity()
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  // İŞTE EKSİK OLAN KISIM BURASIYDI:
  @OneToMany(() => Car, (car) => car.brand)
  cars: Car[];
}