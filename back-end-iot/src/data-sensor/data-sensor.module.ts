/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSensorController } from './data-sensor.controller';
import { DataSensorService } from './data-sensor.service';
import { DataSensor } from './entities/data-sensor.entity';
@Module({
  imports: [TypeOrmModule.forFeature([DataSensor])],
  controllers: [DataSensorController],
  providers: [DataSensorService],
})
export class DataSensorModule {}
