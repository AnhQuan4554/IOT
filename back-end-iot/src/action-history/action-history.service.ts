import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateActionHistoryDto } from './dto/create-action-history.dto';
import { UpdateActionHistoryDto } from './dto/update-action-history.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ActionHistory } from './entities/action-history.entity';
import { Between, Repository } from 'typeorm';
import { GetActionHistoryDto } from './dto/get-action-history.dto';

import { SearchActionHistoryDto } from './dto/search-action-history.dto';

@Injectable()
export class ActionHistoryService {
  constructor(
    @InjectRepository(ActionHistory)
    private actionHistory: Repository<ActionHistory>,
  ) {}
  async create(createActionHistoryDto: CreateActionHistoryDto) {
    const newDataActionHistory = await this.actionHistory.create(
      createActionHistoryDto,
    );

    const res = await this.actionHistory.save(newDataActionHistory);
    return res;
  }
  //,sortForAction,sortForColumnName

  // sort = DESC / ASC
  //sortForAction = 1, 0
  //sortForColumnName = id , deviceName, action, create_at
  async getAllActionHistory(getActionHistoryDto: GetActionHistoryDto) {
    const {
      sort = 'ASC',
      rowsPerPage = 5,
      page = 1,
      sortForColumnName = 'id',
    } = getActionHistoryDto;

    const offset = (((+page as number) - 1) * +rowsPerPage) as number;
    const order = {
      [sortForColumnName]: sort,
    };
    const totalItems = await this.actionHistory.count();
    const data = await this.actionHistory.find({
      order,
      take: +rowsPerPage,
      skip: offset,
    });
    return {
      totalItems,
      data,
    };
  }

  async seachActionHistory(searchActionHistoryDto: SearchActionHistoryDto) {
    const {
      sort = 'ASC',
      rowsPerPage = 5,
      page = 1,
      searchForColumnName = 'id',
      value,
      startDate,
      endDate,
    } = searchActionHistoryDto;
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
    const totalItems = await this.actionHistory.count({
      where: searchCondition,
    });
    const data = await this.actionHistory.find({
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

  async update(id: number, updateActionHistoryDto: UpdateActionHistoryDto) {
    const actionHistory = await this.actionHistory.findOneBy({ id });
    if (!actionHistory) {
      throw new HttpException('Action history not found', HttpStatus.NOT_FOUND);
    }
    await this.actionHistory.update(id, updateActionHistoryDto);
    return await this.actionHistory.findOneBy({ id });
  }

  remove(id: number) {
    return `This action removes a #${id} actionHistory`;
  }
}
