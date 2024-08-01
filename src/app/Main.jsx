'use client'

import React from 'react';
import {Table, TableBody, TableCell, TableContainer, TableRow} from '@mui/material';


function Main({data}) {

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <TableContainer>
      <Table>
        <TableBody>
          {(rowsPerPage > 0
              ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : data
          ).map((row) => (
            <TableRow key={row._id}>
              <TableCell component="th" scope="row">
                {row.mark}
              </TableCell>
              <TableCell align="right">
                {row.model}
              </TableCell>
              <TableCell align="right">
                {row.price}
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6}/>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Main;
