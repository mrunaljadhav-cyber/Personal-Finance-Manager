import { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";

export default function TransactionList({ data }) {
  useEffect(() => {
    console.log('Transaction data:', data); // Debug log
  }, [data]);

  return (
    <TableContainer component={Paper} className="transaction-table">
      <Table>
        <TableHead className="table-header">
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>Amount</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.map((transaction) => (
            <TableRow 
              key={transaction._id}
              sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}
            >
              <TableCell sx={{ color: transaction.amount > 0 ? 'green' : 'red' }}>
                €{transaction.amount}
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {transaction.category?.icon} {transaction.category?.label}
                </Box>
              </TableCell>
              <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}