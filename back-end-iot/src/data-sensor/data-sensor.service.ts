import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSensor } from './entities/data-sensor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DataSensorDto } from './dtos/data-sensor.dto';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
@Injectable()
@WebSocketGateway()
export class DataSensorService {
  @WebSocketServer() server: Server;
  constructor(
    @InjectRepository(DataSensor)
    private dataSensor: Repository<DataSensor>,
  ) {}
  async findAll() {
    return await this.dataSensor.find();
  }
  async findAllWithConditions(sortFor, sort) {
    if (sortFor == 'temperature') {
      if (sort === 'dow') {
        return this.dataSensor.find({
          order: {
            temperature: 'DESC',
          },
        });
      } else {
        return this.dataSensor.find({
          order: {
            temperature: 'ASC',
          },
        });
      }
    } else if (sortFor == 'humb') {
      if (sort === 'dow') {
        return this.dataSensor.find({
          order: {
            humb: 'DESC',
          },
        });
      } else {
        return this.dataSensor.find({
          order: {
            humb: 'ASC',
          },
        });
      }
    } else if (sortFor == 'light') {
      if (sort === 'dow') {
        return this.dataSensor.find({
          order: {
            light: 'DESC',
          },
        });
      } else {
        return this.dataSensor.find({
          order: {
            light: 'ASC',
          },
        });
      }
    } else if (sortFor == 'creat_at') {
      if (sort === 'dow') {
        return this.dataSensor.find({
          order: {
            create_at: 'DESC',
          },
        });
      } else {
        return this.dataSensor.find({
          order: {
            create_at: 'ASC',
          },
        });
      }
    }
  }

  async findOne(id: number) {
    return await this.dataSensor.findOneBy({ id });
  }

  async create(newData: DataSensorDto) {
    const newDataSensor = await this.dataSensor.create(newData);
    const savedData = await this.dataSensor.save(newDataSensor);
    return savedData;
  }

  async update(id: number, newData: DataSensorDto) {
    const newDataSensor = await this.dataSensor.create(newData);
    const exitedData = await this.dataSensor.findOneBy({ id });

    if (!exitedData) {
      throw new HttpException('Data not found', HttpStatus.NOT_FOUND);
    }
    const savedData = await this.dataSensor.update(id, newDataSensor);
    return savedData;
  }

  async remove(id: number) {
    try {
      const res = await this.dataSensor.delete(id);
      if (res.affected && res.affected > 0) {
        return 'Delete success';
      } else {
        return 'Delete false';
      }
    } catch (error) {
      console.error('Error deleting data sensor:', error);
      return false;
    }
  }
  // start handle websocket for action tranform massage with client

  @SubscribeMessage('events')
  handleEvent(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    console.log('websocket message++', data);

    this.server.emit('event2', {
      msg: 'new message22',
      content: data,
    });
    client.emit('events', { name: 'Nest' });
  }
}
