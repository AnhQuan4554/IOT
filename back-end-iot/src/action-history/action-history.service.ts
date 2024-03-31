import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateActionHistoryDto } from './dto/create-action-history.dto';
import { UpdateActionHistoryDto } from './dto/update-action-history.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ActionHistory } from './entities/action-history.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ActionHistoryService {
  constructor(
    @InjectRepository(ActionHistory)
    private actionHistory: Repository<ActionHistory>,
  ) {}
  async create(createActionHistoryDto: CreateActionHistoryDto) {
    // createActionHistoryDto.deviceName
    const newDataActionHistory = await this.actionHistory.create(
      createActionHistoryDto,
    );

    const res = await this.actionHistory.save(newDataActionHistory);
    console.log(res);
    return res;
  }

  async findAll(limit) {
    console.log(this.actionHistory.find());
    return await this.actionHistory.find({ take: limit });
  }
  async findAllOrderedByCreatedAt(sort, limit) {
    if (sort == 'LatestFirst') {
      return this.actionHistory.find({
        order: {
          create_at: 'DESC',
        },
        take: limit,
      });
    } else {
      return this.actionHistory.find({
        order: {
          create_at: 'ASC',
        },
        take: limit,
      });
    }
  }

  async findOne(id: number) {
    return await this.findOne(id);
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
