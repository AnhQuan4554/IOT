import { ApiProperty } from '@nestjs/swagger';
export class SearchDataSensorDto {
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
    enum: ['id', 'temperature', 'humb', 'light', 'create_at'],
    description: 'column name for sort',
  })
  searchForColumnName?: string;
  @ApiProperty({
    required: true,
    description: 'value for sort',
  })
  value?: string;
  @ApiProperty({
    required: false,
    description: 'start date for sort',
  })
  startDate?: string;
  @ApiProperty({
    required: false,
    description: 'end date for sort',
  })
  endDate?: string;
}
