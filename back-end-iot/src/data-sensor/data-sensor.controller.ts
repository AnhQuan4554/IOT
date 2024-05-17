import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { DataSensorService } from './data-sensor.service';
import { DataSensorDto } from './dtos/data-sensor.dto';
import {
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { DataSensor } from './entities/data-sensor.entity';
import { GetDataSensorDto } from './dtos/get-datasensor.dto';
import { SearchDataSensorDto } from './dtos/search-datasensor.dto';
import {
  ClientProxy,
  Ctx,
  MessagePattern,
  MqttContext,
  Payload,
} from '@nestjs/microservices';

@Controller('data-sensor')
@ApiTags('Data Sensor')
export class DataSensorController {
  constructor(
    private readonly dataSenSorService: DataSensorService,
    @Inject('MQTT_SERVICE') private client: ClientProxy,
  ) {}
  // Get ALL
  @Get()
  async getAllDataSensor(@Query() getDataSensorDto: GetDataSensorDto) {
    return await this.dataSenSorService.getAllDataSensor(getDataSensorDto);
  }
  // Search by condition
  @Get('/search')
  async searchDataSenSor(@Query() searchDataSensorDto: SearchDataSensorDto) {
    return await this.dataSenSorService.seachDataSensor(searchDataSensorDto);
  }

  @Post()
  @ApiBody({ type: DataSensorDto, description: 'Data sensor information' })
  @ApiResponse({
    status: 201,
    description: 'Create new data sensor',
    type: DataSensor,
  })
  async creatData(@Body() dataSensorDto: DataSensorDto) {
    return await this.dataSenSorService.create(dataSensorDto);
  }

  @Post('/send-message')
  async sendMessage() {
    console.log('send mesage');
    await this.client.connect();
    this.client.emit('port1888', 'message21312');
  }

  @Patch(':id')
  @ApiParam({ name: 'id', description: 'ID of the Data' })
  @ApiBody({ type: DataSensorDto })
  @ApiOperation({ summary: 'Update an Data sensor by ID' })
  @ApiOkResponse({
    status: 200,
    description: 'Data sensor updated successfully',
    type: DataSensor,
  })
  @ApiNotFoundResponse({ status: 404, description: 'Data sensor not found' })
  update(@Param('id') id: number, @Body() DataSensorDto: DataSensorDto) {
    return this.dataSenSorService.update(+id, DataSensorDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Data sensor deleted successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Data sensor not found',
  })
  remove(@Param('id') id: string) {
    return this.dataSenSorService.remove(+id);
  }

  /// get data from mqtt
  @MessagePattern('port1888')
  async getNotifications(@Payload() data: any, @Ctx() context: MqttContext) {
    console.log(`Topic: ${context.getTopic()}`);
    this.client.emit('port1888-receive', 'data new');
  }
}
