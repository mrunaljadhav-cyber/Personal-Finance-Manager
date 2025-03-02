import { useState } from 'react';
import { Box, Card, CardContent, Grid, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, Collapse } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import SavingsIcon from '@mui/icons-material/Savings';
import MoneyIcon from '@mui/icons-material/Money';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';



export default function Dashboard({ transactions }) {
  const [openTransactions, setOpenTransactions] = useState(false);
  const [openLoans, setOpenLoans] = useState(false);
  const [openSavings, setOpenSavings] = useState(false);

  const calculateTransactions = () => {
    if (!transactions) return { income: 0, expense: 0, balance: 0 };

    const income = transactions
      .filter((transaction) => transaction.amount > 0)
      .reduce((acc, transaction) => acc + transaction.amount, 0);

    const expense = transactions
      .filter((transaction) => transaction.amount < 0)
      .reduce((acc, transaction) => acc + Math.abs(transaction.amount), 0);

    return { income, expense, balance: income - expense };
  };

  const { income, expense, balance } = calculateTransactions();

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            backgroundColor: '#f5f5f5',
          },
        }}
      >
        <List sx={{ mt: 8 }}>
          <ListItem onClick={() => setOpenTransactions(!openTransactions)} sx={{ cursor: 'pointer' }}>
            <ListItemIcon>
              <ReceiptLongIcon />
            </ListItemIcon>
            <ListItemText primary="Transactions" />
            {openTransactions ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openTransactions} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem  sx={{ pl: 4, cursor: 'pointer' }}>
                <ListItemText primary={`Total Income: €${income.toFixed(2)}`} />
              </ListItem>
              <ListItem sx={{ pl: 4 , cursor : 'pointer'}}>
                <ListItemText primary={`Total Expenses: €${expense.toFixed(2)}`} />
              </ListItem>
            </List>
          </Collapse>

          <ListItem onClick={() => setOpenLoans(!openLoans)} sx={{cursor:'pointer'}}>
            <ListItemIcon>
              <MoneyIcon />
            </ListItemIcon>
            <ListItemText primary="Loans" />
            {openLoans ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openLoans} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem sx={{ pl: 4 ,cursor:'pointer'}}>
                <ListItemText primary="Personal Loans" />
              </ListItem>
              <ListItem  sx={{ pl: 4 ,cursor:'pointer'}}>
                <ListItemText primary="Business Loans" />
              </ListItem>
            </List>
          </Collapse>

          <ListItem onClick={() => setOpenSavings(!openSavings)} sx={{cursor:'pointer'}}>
            <ListItemIcon>
              <SavingsIcon />
            </ListItemIcon>
            <ListItemText primary="Savings" />
            {openSavings ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openSavings} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem sx={{ pl: 4,cursor:'pointer' }}>
                <ListItemText primary={`Current Balance: €${balance.toFixed(2)}`} />
              </ListItem>
              <ListItem sx={{ pl: 4 , cursor : 'pointer'}}>
                <ListItemText primary="Savings Goals" />
              </ListItem>
            </List>
          </Collapse>
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ bgcolor: 'primary.main', color: 'white' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <AccountBalanceWalletIcon sx={{ mr: 1 }} />
                  <Typography variant="h6">Current Balance</Typography>
                </Box>
                <Typography variant="h4">€{balance.toFixed(2)}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ bgcolor: 'success.main', color: 'white' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <TrendingUpIcon sx={{ mr: 1 }} />
                  <Typography variant="h6">Total Income</Typography>
                </Box>
                <Typography variant="h4">€{income.toFixed(2)}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ bgcolor: 'error.main', color: 'white' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <TrendingDownIcon sx={{ mr: 1 }} />
                  <Typography variant="h6">Total Expenses</Typography>
                </Box>
                <Typography variant="h4">€{expense.toFixed(2)}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}