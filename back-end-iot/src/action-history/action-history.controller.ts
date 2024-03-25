import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpStatus,
} from '@nestjs/common';
import { ActionHistoryService } from './action-history.service';
import { CreateActionHistoryDto } from './dto/create-action-history.dto';
import { UpdateActionHistoryDto } from './dto/update-action-history.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger/dist';
import { ActionHistory } from './entities/action-history.entity';

@Controller('action-history')
@ApiTags('Action History')
export class ActionHistoryController {
  constructor(private readonly actionHistoryService: ActionHistoryService) {}

  @Get()
  @ApiQuery({
    name: 'sort',
    enum: ['LatestFirst', 'OldestFirst'],
    required: false,
  })
  @ApiResponse({
    status: 200,
    description: 'Retrieve all action history',
    type: [ActionHistory],
  })
  async findAll(@Query('sort') sort: any) {
    console.log(sort);
    if (sort == 'LatestFirst' || sort == 'OldestFirst') {
      return await this.actionHistoryService.findAllOrderedByCreatedAt(sort);
    }
    return await this.actionHistoryService.findAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID of the action history',
  })
  @ApiResponse({
    status: 200,
    description: 'Retrieve the action history by ID',
  })
  findOne(@Param('id') id: string) {
    return this.actionHistoryService.findOne(+id);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'The action history has been successfully created.',
    type: ActionHistory,
  })
  async create(@Body() createActionHistoryDto: CreateActionHistoryDto) {
    return await this.actionHistoryService.create(createActionHistoryDto);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', description: 'ID of the action history' })
  @ApiBody({ type: UpdateActionHistoryDto })
  @ApiOperation({ summary: 'Update an action history by ID' })
  @ApiOkResponse({
    status: 200,
    description: 'Action history updated successfully',
    type: ActionHistory,
  })
  @ApiNotFoundResponse({ status: 404, description: 'Action history not found' })
  update(
    @Param('id') id: number,
    @Body() updateActionHistoryDto: UpdateActionHistoryDto,
  ) {
    return this.actionHistoryService.update(+id, updateActionHistoryDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Action history deleted successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Action history not found',
  })
  remove(@Param('id') id: string) {
    return this.actionHistoryService.remove(+id);
  }
}
