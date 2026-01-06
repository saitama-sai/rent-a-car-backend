import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { Rental } from './rental.entity';
import { Car } from '../cars/car.entity';
import { User } from '../users/user.entity';

@Injectable()
export class RentalsService {
    constructor(
        @InjectRepository(Rental)
        private rentalsRepository: Repository<Rental>,
        @InjectRepository(Car)
        private carsRepository: Repository<Car>,
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async create(userId: string, carId: number, startDate: string, endDate: string): Promise<Rental> {
        console.log(`Rental Request: User=${userId}, Car=${carId}, Start=${startDate}, End=${endDate}`);
        const user = await this.usersRepository.findOneBy({ id: userId });
        if (!user) {
            throw new BadRequestException('Kullanıcı bulunamadı');
        }

        const car = await this.carsRepository.findOneBy({ id: carId });
        if (!car) {
            throw new BadRequestException('Araba bulunamadı');
        }

        if (!car.available) {
            throw new BadRequestException('Bu araba şu anda kiralanamaz (Bakımda veya Pasif)');
        }

        const start = new Date(startDate);
        const end = new Date(endDate);

        if (start > end) {
            throw new BadRequestException('Başlangıç tarihi bitiş tarihinden sonra olamaz');
        }

        // ...

        // Fiyat Hesaplama
        const diffTime = Math.abs(end.getTime() - start.getTime());
        let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        // Eğer aynı gün seçildiyse (0 gün), en az 1 gün say.
        if (diffDays === 0) diffDays = 1;

        const totalPrice = diffDays * car.dailyPrice;

        const rental = this.rentalsRepository.create({
            user,
            car,
            startDate: start,
            endDate: end,
            totalPrice,
        });

        const savedRental = await this.rentalsRepository.save(rental);

        // Araba durumunu güncelle: Artık müsait değil
        car.available = false;
        await this.carsRepository.save(car);

        return savedRental;
    }

    async findAll(): Promise<Rental[]> {
        return this.rentalsRepository.find({
            relations: ['user', 'car', 'car.brand'],
            order: {
                createdAt: 'DESC'
            }
        });
    }
}
