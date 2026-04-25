import { Grid, Button, Drawer, Box, Typography } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterComp from '../../components/userinterface/FilterComp';
import ProductListing from '../../components/userinterface/ProductListing';
import { useLocation } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { postData } from '../../services/FetchNodeServices';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../components/userinterface/Header';
import MenuBar from '../../components/userinterface/MenuBar';

export default function FilterPage(props) {
  var location = useLocation();
  const [products, setProducts] = useState([]);
  const [pageRefresh, setPageRefresh] = useState(false);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const toggleFilterDrawer = () => {
    setFilterDrawerOpen(!filterDrawerOpen);
  };

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  var categoryid = '';

  try {
    if (location?.state?.categoryid === undefined) {
      categoryid = null;
    } else {
      categoryid = location?.state?.categoryid;
    }
  } catch (e) {}

  var pattern = '';
  try {
    if (location?.state?.pattern === undefined) {
      pattern = null;
    } else {
      pattern = location?.state?.pattern;
    }
  } catch (e) {}

  const fetchAllProduct = useCallback(async () => {
    var result = await postData(
      'userinterface/display_all_productdetail_by_category',
      { categoryid: categoryid, pattern: pattern },
    );
    //  var uniqueData = [...new Set(result.data)];
    setProducts(result.data);
  }, [categoryid, pattern]);
  useEffect(
    function () {
      fetchAllProduct();
    },
    [fetchAllProduct],
  );

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f8f9fa', display: 'flex', flexDirection: 'column', fontFamily: 'Kanit, sans-serif' }}>
      <Box sx={{ position: 'sticky', top: 0, zIndex: 1100 }}>
        <Header />
        {matches && <MenuBar />}
      </Box>

      <Typography 
        variant="h5" 
        sx={{ 
          px: { xs: 2, md: 5 }, 
          pt: 4, 
          pb: 1,
          fontFamily: 'Kanit',
          fontWeight: 700,
          color: '#00391c'
        }}
      >
        Products
      </Typography>

      <Box 
        sx={{ 
          flexGrow: 1, 
          px: { xs: 2, md: 5 },
          pb: 8,
          maxWidth: '100%'
        }}
      >
        <Grid container spacing={4}>
          {matches && (
            <Grid item xs={12} md={3} lg={2.5}>
              <Box sx={{ position: 'sticky', top: 180 }}>
                 <FilterComp />
              </Box>
            </Grid>
          )}
          
          <Grid item xs={12} md={matches ? 9 : 12} lg={matches ? 9.5 : 12}>
            {/* Mobile Filter Button */}
            {!matches && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                <Button
                  variant='outlined'
                  startIcon={<FilterAltIcon />}
                  onClick={toggleFilterDrawer}
                  sx={{ 
                    borderRadius: 8, 
                    borderColor: '#00391c', 
                    color: '#00391c',
                    '&:hover': {
                      borderColor: '#002613',
                      backgroundColor: 'rgba(0,57,28,0.05)'
                    }
                  }}
                >
                  Filters
                </Button>
                <Drawer
                  anchor='bottom'
                  open={filterDrawerOpen}
                  onClose={toggleFilterDrawer}
                  PaperProps={{
                    sx: { borderTopLeftRadius: 16, borderTopRightRadius: 16 }
                  }}
                >
                  <Box sx={{ p: 3, pb: 5 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                       <Box sx={{ width: 40, height: 4, borderRadius: 2, bgcolor: '#e0e0e0' }} />
                    </Box>
                    <FilterComp />
                  </Box>
                </Drawer>
              </Box>
            )}

            <ProductListing
              pageRefresh={pageRefresh}
              setPageRefresh={setPageRefresh}
              data={products}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
