/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DataSensor } from './data-sensor/entities/data-sensor.entity';
import { DataSensorModule } from './data-sensor/data-sensor.module';
import { ActionHistoryModule } from './action-history/action-history.module';
import { ActionHistory } from './action-history/entities/action-history.entity';
// import { DataDasboardModule } from './data-dasboard/data-dasboard.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ScheduleModule } from '@nestjs/schedule';
@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '100502',
      database: 'iot',
      entities: [DataSensor, ActionHistory],
      synchronize: true,
    }),
    DataSensorModule,
    ActionHistoryModule,
    // DataDasboardModule,
    ClientsModule.register([
      {
        name: 'MATH_SERVICE',
        transport: Transport.MQTT,
        options: {
          url: process.env.BROKER_URL,
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
