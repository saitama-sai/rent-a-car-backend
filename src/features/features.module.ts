import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feature } from './feature.entity';
import { FeaturesService } from './features.service';
import { FeaturesController } from './features.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Feature])], // Entity'yi buraya tanıtıyoruz
  providers: [FeaturesService],
  controllers: [FeaturesController],
  exports: [FeaturesService], // Başka modüller kullanabilsin diye dışarı açıyoruz
})
export class FeaturesModule {}