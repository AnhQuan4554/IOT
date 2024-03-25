import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
export class CreateActionHistoryDto {
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
