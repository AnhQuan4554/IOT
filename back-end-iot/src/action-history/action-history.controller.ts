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
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger/dist';
import { ActionHistory } from './entities/action-history.entity';
import { GetActionHistoryDto } from './dto/get-action-history.dto';
import { SearchActionHistoryDto } from './dto/search-action-history.dto';

@Controller('action-history')
@ApiTags('Action History')
export class ActionHistoryController {
  constructor(private readonly actionHistoryService: ActionHistoryService) {}

  @Get()
  async getAllActionHistory(@Query() getActionHistoryDto: GetActionHistoryDto) {
    return await this.actionHistoryService.getAllActionHistory(
      getActionHistoryDto,
    );
  }

  @Get('/search')
  async seachActionHistory(
    @Query() searchActionHistoryDto: SearchActionHistoryDto,
  ) {
    return await this.actionHistoryService.seachActionHistory(
      searchActionHistoryDto,
    );
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
