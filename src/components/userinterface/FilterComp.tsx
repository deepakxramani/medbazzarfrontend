import * as React from 'react';
import {
  Accordion,
  Divider,
  Paper,
  InputBase,
  IconButton,
  Box,
  Typography,
  List,
  ListItemText,
  ListItemButton
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getData, postData } from '../../services/FetchNodeServices';
import { useState, useEffect } from 'react';

export default function FilterComp() {
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [expanded, setExpanded] = useState<string | false>(false);

  const fetchAllCategory = async () => {
    var result = await getData('userinterface/display_all_category');
    if (result.status) {
      setCategory(result.data);
    }
  };

  const fetchAllSubCategory = async (categoryid) => {
    var result = await postData(
      'userinterface/fetch_all_subcategory_by_categoryid',
      { categoryid: categoryid },
    );
    if (result.status) {
      setSubCategory(result.data);
    }
  };

  useEffect(function () {
    fetchAllCategory();
  }, []);

  const handleAccordionChange = (panel: string, categoryid: any) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
    if (isExpanded) {
      fetchAllSubCategory(categoryid);
    }
  };

  const showAllSubCategory = () => {
    return subCategory?.map((item, index) => {
      return (
        <ListItemButton 
          key={index}
          sx={{ 
            borderRadius: 2, 
            mb: 0.5,
            '&:hover': { bgcolor: 'rgba(0,57,28,0.04)' }
          }}
        >
          <ListItemText 
            primary={item.subcategoryname} 
            primaryTypographyProps={{ fontSize: '0.9rem', color: 'text.secondary' }} 
          />
        </ListItemButton>
      );
    });
  };

  const showAllCategory = () => {
    return category?.map((item: any, index: number) => {
      const panelId = `panel${index}`;
      return (
        <Accordion
          key={index}
          expanded={expanded === panelId}
          onChange={handleAccordionChange(panelId, item.categoryid)}
          disableGutters
          elevation={0}
          sx={{
            background: 'transparent',
            '&:before': { display: 'none' },
            borderBottom: '1px solid #f0f0f0',
            '&:last-child': { borderBottom: 0 }
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: expanded === panelId ? '#00391c' : 'action.active' }} />}
            sx={{ px: 1, '& .MuiAccordionSummary-content': { my: 1.5 } }}
          >
            <Typography 
              sx={{ 
                fontFamily: 'Kanit', 
                fontSize: '1.05rem',
                color: expanded === panelId ? '#00391c' : '#333',
                fontWeight: expanded === panelId ? 600 : 400
              }}
            >
              {item.categoryname}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 0, pb: 1, px: 0.5 }}>
            <List disablePadding>
              {showAllSubCategory()}
            </List>
          </AccordionDetails>
        </Accordion>
      );
    });
  };

  const searchBarComponent = () => {
    return (
      <Paper
        elevation={0}
        component='form'
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          bgcolor: '#f8faf9',
          border: '1px solid #e0e0e0',
          borderRadius: 8,
          transition: 'all 0.2s',
          '&:focus-within': {
            borderColor: '#00391c',
            boxShadow: '0 0 0 2px rgba(0,57,28,0.1)'
          }
        }}
      >
        <InputBase
          sx={{ ml: 2, flex: 1, fontSize: '0.95rem', fontFamily: 'Kanit' }}
          placeholder='Search Categories...'
          inputProps={{ 'aria-label': 'search categories' }}
        />
        <IconButton type='button' sx={{ p: '10px', color: '#00391c' }} aria-label='search'>
          <SearchIcon />
        </IconButton>
      </Paper>
    );
  };

  return (
    <Paper
      elevation={0}
      sx={{
        width: '100%',
        minWidth: 260,
        borderRadius: 4,
        overflow: 'hidden',
        border: '1px solid #eef0f2',
        boxShadow: '0 8px 32px rgba(0,0,0,0.04)',
        bgcolor: '#fff'
      }}
    >
      <Box sx={{ p: 3, borderBottom: '1px solid #f0f0f0', bgcolor: '#fafcfb' }}>
        <Typography variant="h6" sx={{ fontFamily: 'Kanit', fontWeight: 800, color: '#00391c' }}>
          Filters
        </Typography>
      </Box>

      <Box sx={{ p: 3 }}>
        <Typography 
          variant="subtitle2" 
          sx={{ mb: 2, color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}
        >
          Categories
        </Typography>
        
        {searchBarComponent()}

        <Box sx={{ mt: 2 }}>
          {showAllCategory()}
        </Box>
      </Box>
    </Paper>
  );
}
