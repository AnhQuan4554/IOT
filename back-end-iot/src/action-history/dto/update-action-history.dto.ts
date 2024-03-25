import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateActionHistoryDto {
  @ApiProperty()
  @IsNotEmpty()
  deviceName: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  action: number;
  @ApiProperty()
  @IsNotEmpty()
  create_at: Date;
}
