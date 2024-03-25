import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DataSensor {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  temperature: number;

  @Column()
  @ApiProperty()
  humb: number;

  @Column()
  @ApiProperty()
  light: number;

  @Column()
  @ApiProperty()
  create_at: Date;
}
