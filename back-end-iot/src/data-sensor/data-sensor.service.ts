import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSensor } from './entities/data-sensor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { DataSensorDto } from './dtos/data-sensor.dto';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GetDataSensorDto } from './dtos/get-datasensor.dto';
import { SearchDataSensorDto } from './dtos/search-datasensor.dto';
@Injectable()
@WebSocketGateway()
export class DataSensorService {
  @WebSocketServer() server: Server;
  constructor(
    @InjectRepository(DataSensor)
    private dataSensor: Repository<DataSensor>,
  ) {}
  async getAllDataSensor(getDataSensorDto: GetDataSensorDto) {
    const {
      sort = 'ASC',
      rowsPerPage = 5,
      page = 1,
      sortForColumnName = 'id',
    } = getDataSensorDto;
    const offset = (((+page as number) - 1) * +rowsPerPage) as number;
    const order = {
      [sortForColumnName]: sort,
    };
    const totalItems = await this.dataSensor.count();
    const data = await this.dataSensor.find({
      order,
      take: +rowsPerPage,
      skip: offset,
    });
    return {
      totalItems,
      data,
    };
  }

  async seachDataSensor(searchDataSensorDto: SearchDataSensorDto) {
    const {
      sort = 'ASC',
      rowsPerPage = 5,
      page = 1,
      searchForColumnName = 'id',
      value,
      startDate,
      endDate,
    } = searchDataSensorDto;

    if (
      (value == null && startDate == null) ||
      (value == '' && startDate == null)
    ) {
      return 'Value is not empty';
    }
    let searchCondition;
    searchCondition = {
      [searchForColumnName === 'all' ? 'id' : searchForColumnName]: value,
    };
    // handle for search start date and end date

    if (startDate && endDate) {
      searchCondition = {
        ...searchCondition,
        [searchForColumnName]: Between(startDate, endDate),
      };
    }
    const offset = (((+page as number) - 1) * +rowsPerPage) as number;
    const order = {
      [searchForColumnName === 'all' ? 'id' : searchForColumnName]: sort,
    };
    const totalItems = await this.dataSensor.count({
      where: searchCondition,
    });
    const data = await this.dataSensor.find({
      order,
      take: +rowsPerPage,
      skip: +offset,
      where: searchCondition,
    });
    return {
      totalItems,
      data,
    };
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

    this.server.emit('event3', {
      msg: 'new message22',
      content: data,
    });
    console.log('clien++', client.id);
    client.emit('event2', 'client emit');
  }
}
