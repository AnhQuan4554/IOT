import { ApiProperty } from '@nestjs/swagger';
export class SearchActionHistoryDto {
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
    enum: ['id', 'deviceName', 'action', 'create_at'],
    default: 'id',
    description: 'column name for sort',
  })
  sortForColumnName?: string;

  @ApiProperty({
    required: true,
    description: 'value for sort',
  })
  value?: string;
}
