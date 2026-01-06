import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Car } from '../cars/car.entity';

@Entity()
export class Rental {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, { eager: true }) // eager: true -> sorgularda kullanıcıyı otomatik getir
    user: User;

    @ManyToOne(() => Car, { eager: true }) // eager: true -> sorgularda arabayı otomatik getir
    car: Car;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;

    @Column('decimal')
    totalPrice: number;

    @CreateDateColumn()
    createdAt: Date;
}
