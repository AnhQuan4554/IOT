import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class ActionHistory {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  deviceName: string;

  @Column()
  @ApiProperty()
  action: number;

  @Column()
  @ApiProperty()
  create_at: Date;
}
