import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Brand } from '../brands/brand.entity';
import { Feature } from '../features/feature.entity'; // 1. Feature'ı import et

@Entity()
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column('decimal')
  dailyPrice: number;

  @Column()
  color: string;

  @Column()
  plate: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ default: true })
  available: boolean;

  // --- İLİŞKİLER ---

  @ManyToOne(() => Brand, (brand) => brand.cars, { onDelete: 'SET NULL' })
  brand: Brand;

  // 2. BURAYI EKLE: Features İlişkisi
  @ManyToMany(() => Feature)
  @JoinTable() // ManyToMany ilişkisinde, ilişkinin sahibi olan tarafa (Araba) bu dekoratörü koymak ŞARTTIR.
  features: Feature[];
}