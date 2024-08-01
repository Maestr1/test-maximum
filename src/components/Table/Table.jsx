import React, {useEffect, useState} from 'react';
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import TablePagination from '@mui/material/TablePagination';
import styles from './Table.module.scss';

function Table(props) {

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [data, setData] = useState([]);
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  useEffect(() => {
    fetch('/api/stock')
      .then(res => res.json())
      .then(data => setData(data.data))
      .catch((error) => console.error(error));
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function formatDate(date) {
    const dateObject = new Date(date);
    return dateObject.toLocaleDateString('ru-RU', {
      day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
    });
  }

  function formatPrice(price) {
    return price ? price.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: '0' }) : '-';
  }

  function calculateTotalPages(data) {
    return Math.ceil(data.length / rowsPerPage);
  }

  return (
    <>
      <TableContainer className={styles.tableContainer}>
        <MuiTable>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Марка/модель</TableCell>
              <TableCell>Модификация</TableCell>
              <TableCell>Комплектация</TableCell>
              <TableCell>Стоимость</TableCell>
              <TableCell>Дата создания</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0 ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : data).map((car) => (
              <TableRow key={car._id}>
                <TableCell>
                  {car._id}
                </TableCell>
                <TableCell>
                  {`${car.mark} ${car.model ? `${car.model}` : '-'}`}
                </TableCell>
                <TableCell>
                  {`${car.engine.volume} ${car.engine.transmission} (${car.engine.power} л.с.) ${car.drive === '4WD' ? '4WD' : ''}`}
                </TableCell>
                <TableCell>
                  {car.equipmentName}
                </TableCell>
                <TableCell>
                  {formatPrice(car.price)}
                </TableCell>
                <TableCell>
                  {formatDate(car.createdAt)}
                </TableCell>
              </TableRow>))}
            {emptyRows > 0 && (<TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6}/>
            </TableRow>)}
          </TableBody>
        </MuiTable>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20, 50]}
        labelRowsPerPage="Строк на странице"
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}

export default Table;

