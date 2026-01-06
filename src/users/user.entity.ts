import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

// Kullanıcı rolleri için Enum (TypeScript özelliği)
// Bunu savunmada "Kodda sihirli stringler (magic strings) kullanmamak için Enum kullandım" diye açıklayabilirsin.
export enum UserRole {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
}

@Entity() // Bu sınıfın bir veritabanı tablosu olduğunu belirtir.
export class User {
  @PrimaryGeneratedColumn('uuid') // Rastgele, eşsiz uzun bir ID oluşturur (örn: 550e8400-e29b...)
  id: string;

  @Column({ unique: true }) // Aynı e-mail ile iki kayıt olamaz.
  email: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  profilePictureUrl: string;

  @Column()
  password: string; // Şifreler hash'lenmiş (şifrelenmiş) olarak tutulacak.

  @Column({
    type: 'varchar', // MSSQL için metin formatı (String)
    length: 20,       // En fazla 20 karakter olsun
    default: UserRole.CUSTOMER,
  })
  role: UserRole;

  @CreateDateColumn() // Kayıt olduğu anın tarihini otomatik atar.
  createdAt: Date;
}