// create-user.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class DataSensorDto {
  @IsNumber()
  @ApiProperty()
  temperature: number;

  @IsNumber()
  @ApiProperty()
  humb: number;

  @IsNumber()
  @ApiProperty()
  light: number;
  @IsString()
  @ApiProperty()
  create_at: Date;
}
