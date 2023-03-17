import { Search } from '@mui/icons-material';
import { IconButton, TextField, InputAdornment } from '@mui/material';
import {
  GridToolbarDensitySelector,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
} from '@mui/x-data-grid';
import FlexBetween from '../../styled-components/flex-between';

function DataGridCustomToolbar({ searchQuery, setSearchQuery, setSearchText }) {
  return (
    <GridToolbarContainer>
      <FlexBetween width='100%'>
        <FlexBetween>
          <GridToolbarColumnsButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
        </FlexBetween>
        <TextField
          label='Search...'
          sx={{ mb: '0.5rem', width: '15rem' }}
          onChange={e => setSearchQuery(e.target.value)}
          value={searchQuery}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  onClick={() => {
                    setSearchText(searchQuery);
                    setSearchQuery('');
                  }}>
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </FlexBetween>
    </GridToolbarContainer>
  );
}

export default DataGridCustomToolbar;
