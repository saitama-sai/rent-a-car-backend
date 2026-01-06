import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Feature { // Başında "export" olduğundan emin ol
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}