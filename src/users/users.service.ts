import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './user.entity';
import * as bcrypt from 'bcrypt'; // 1. Bcrypt kütüphanesini dahil ettik

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  findOne(email: string) {
    return this.usersRepository.findOneBy({ email });
  }

  // 2. Metodu 'async' yaptık çünkü şifreleme işlemi biraz zaman alır
  async create(email: string, password: string, role: UserRole = UserRole.CUSTOMER, firstName?: string, lastName?: string, profilePictureUrl?: string) {

    // 3. Şifreyi Hashle (Tuzla ve karıştır)
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.usersRepository.create({
      email,
      password: hashedPassword,
      role,
      firstName,
      lastName,
      profilePictureUrl
    });

    return this.usersRepository.save(user);
  }

  async update(id: string, attrs: Partial<User>) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new Error('User not found');
    }

    // Güvenlik için email ve id alanlarının güncellenmesini engelle
    delete attrs.email;
    delete (attrs as any).id;

    if (attrs.password && attrs.password.trim() !== '') {
      const salt = await bcrypt.genSalt();
      attrs.password = await bcrypt.hash(attrs.password.trim(), salt);
    } else {
      delete attrs.password;
    }

    Object.assign(user, attrs);
    return this.usersRepository.save(user);
  }

  findAll() {
    return this.usersRepository.find();
  }
}