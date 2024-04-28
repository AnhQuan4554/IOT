import { ApiProperty } from '@nestjs/swagger';
export class GetActionHistoryDto {
  @ApiProperty({
    required: false,
    description: 'Sort for (ASC or DESC)',
    enum: ['ASC', 'DESC'],
    default: 'ASC',
  })
  sort?: string;

  @ApiProperty({
    required: false,
    default: 5,
    description: 'rows number of pape',
  })
  rowsPerPage?: string;

  @ApiProperty({
    required: false,
    default: 1,
    description: 'currently page',
  })
  page?: string;

  @ApiProperty({
    required: false,
    default: 'id',
    enum: ['id', 'deviceName', 'action', 'create_at'],
    description: 'column name for sort',
  })
  sortForColumnName?: string;
}
