/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSensorController } from './data-sensor.controller';
import { DataSensorService } from './data-sensor.service';
import { DataSensor } from './entities/data-sensor.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([DataSensor]),
    ClientsModule.register([
      {
        name: 'MQTT_SERVICE',
        transport: Transport.MQTT,
        options: {
          url: `mqtt://localhost:1888`,
          username: 'quannguyen',
          password: '100502',
        },
      },
    ]),
  ],
  controllers: [DataSensorController],
  providers: [DataSensorService],
})
export class DataSensorModule {}
