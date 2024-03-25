import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
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
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { DataSensor } from './entities/data-sensor.entity';

@Controller('data-sensor')
@ApiTags('Data Sensor')
export class DataSensorController {
  constructor(private readonly dataSenSorService: DataSensorService) {}

  @Get()
  @ApiQuery({ name: 'sortFor', required: false, description: 'Sort data for' })
  @ApiQuery({ name: 'sort', required: false, description: 'Sort order' })
  @ApiResponse({
    status: 200,
    description: 'Retrieve all data sensors',
    type: [DataSensor],
  })
  async findAll(@Query('sortFor') sortFor: any, @Query('sort') sort: any) {
    if (sortFor && sort) {
      const data = await this.dataSenSorService.findAllWithConditions(
        sortFor,
        sort,
      );
      return data;
    }
    const data = await this.dataSenSorService.findAll();
    return data;
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID of the data sensor',
  })
  @ApiResponse({
    status: 200,
    description: 'Retrieve data sensor by ID',
    type: DataSensor,
  })
  async findOne(@Param('id') id: any) {
    return this.dataSenSorService.findOne(id);
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
}
