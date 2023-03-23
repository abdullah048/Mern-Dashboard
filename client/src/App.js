/**
 * IMPORTS
 */
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { themeSettings } from './theme';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import Dashboard from './pages/dashboard';
import Layout from './layout';
import Products from './pages/products';
import CustomerPage from './pages/customers';
import Transactions from './pages/transactions';
import Geography from './pages/geography';
import Overview from './pages/overview';
import Daily from './pages/daily';
import Monthly from './pages/monthly';
import Breakdown from './pages/breakdown';
import Admins from './pages/admin';
import UserPerformance from './pages/user-performance';

function App() {
  const mode = useSelector(function (state) {
    return state.global.mode;
  });
  const theme = useMemo(
    function () {
      return createTheme(themeSettings(mode));
    },
    [mode]
  );
  return (
    <div className='app'>
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path='/' element={<Navigate to='/dashboard' replace />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/products' element={<Products />} />
              <Route path='/customers' element={<CustomerPage />} />
              <Route path='/transactions' element={<Transactions />} />
              <Route path='/geography' element={<Geography />} />
              <Route path='/overview' element={<Overview />} />
              <Route path='/daily' element={<Daily />} />
              <Route path='/monthly' element={<Monthly />} />
              <Route path='/breakdown' element={<Breakdown />} />
              <Route path='/admin' element={<Admins />} />
              <Route path='/performance' element={<UserPerformance />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
