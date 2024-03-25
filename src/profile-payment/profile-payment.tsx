import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, Typography } from '@mui/material';

const columns = [
  {
    id: 'date',
    label: 'DATE',
    minWidth: 160,
    align: 'left',
    justifyContentCell: 'left',
    variant: 'body1',
    icon: '',
  },
  {
    id: 'detail',
    label: 'DETAIL',
    minWidth: 500,
    align: 'center',
    justifyContentCell: 'left',
    variant: 'subtitle1',
    icon: '/assets/svg/profile/card.svg',
  },
  {
    id: 'statusInvoice',
    label: 'STATUS | INVOICE',
    minWidth: 230,
    align: 'center',
    justifyContentCell: 'center',
    variant: 'overline',
    icon: '',
  },
  {
    id: 'total',
    label: 'TOTAL (AUD)',
    minWidth: 170,
    align: 'center',
    justifyContentCell: 'center',
    variant: 'subtitle1',
    icon: '',
  },
];

interface Data {
  id: string;
  date: string;
  detail: string;
  statusInvoice: string;
  total: number;
}

function createData(
  id: string,
  date: string,
  detail: string,
  statusInvoice: string,
  total: number
): Data {
  return { id, date, detail, statusInvoice, total };
}

const rows = [
  createData('1', '15-01-2024', 'Question bank x 30 days', 'SUCCESS', 30),
  createData('2', '15-01-2024', 'Question bank x 30 days', 'CANCEL', 20),
  createData('3', '15-01-2024', 'Question bank x 30 days', 'SUCCESS', 10),
  createData('4', '15-01-2024', 'Question bank x 30 days', 'CANCEL', 30),
  createData('5', '15-01-2024', 'Question bank x 30 days', 'CANCEL', 30),
  createData('6', '15-01-2024', 'Question bank x 30 days', 'SUCCESS', 30),
];
export const ProfilePayment = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align as any}
                  width={column.minWidth}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow
                hover
                role="checkbox"
                tabIndex={-1}
                key={row.id}
              >
                {columns.map((column) => {
                  const value: any = row[column.id];
                  return (
                    <TableCell
                      key={row.id}
                      width={'200px'}
                      align="center"
                      component="th"
                      scope="row"
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: `${column.justifyContentCell}`,
                        }}
                      >
                        <Box sx={{ marginRight: '8px' }}>
                          {column.icon && <img src={column.icon} />}
                        </Box>
                        {column.id !== 'statusInvoice' ? (
                          <Typography
                            variant={column.variant}
                            alignItems="center"
                          >
                            {value}
                          </Typography>
                        ) : (
                          <Box
                            sx={{
                              height: '30px',
                              padding: '0 8px',
                              borderRadius: '100%',
                              background: `${
                                value === 'SUCCESS'
                                  ? 'rgba(21, 183, 158, 0.12)'
                                  : 'rgba(240, 68, 56, 0.12)'
                              }`,
                            }}
                          >
                            <Typography
                              variant={column.variant}
                              alignItems="center"
                              sx={{ color: `${value === 'SUCCESS' ? '#107569' : '#B42318'}` }}
                            >
                              {value}
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
