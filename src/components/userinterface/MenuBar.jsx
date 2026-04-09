import { AppBar, Box, Toolbar, Menu, Button, MenuItem } from '@mui/material';

import { useState, useEffect } from 'react';
import { getData, postData } from '../../services/FetchNodeServices';
export default function MenuBar() {
  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const fetchAllSubCategory = async (cid) => {
    try {
      var result = await postData(
        'userinterface/fetch_all_subcategory_by_categoryid',
        { categoryid: cid },
      );
      if (result && result.status) {
        setSubCategoryList(result.data);
      }
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  const handleClick = (categoryid, event) => {
    fetchAllSubCategory(categoryid);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const fetchAllCategory = async () => {
    var result = await getData('userinterface/display_all_category');
    if (result.status) {
      setCategoryList(result.data);
    }
  };
  useEffect(function () {
    fetchAllCategory();
  }, []);

  const showAllCategory = () => {
    return categoryList.map((item, i) => {
      return (
        <Button
          key={i}
          onMouseEnter={(event) => handleClick(item.categoryid, event)}
          style={{ color: '#444', fontWeight: 600 }}
        >
          {item.categoryname}
        </Button>
      );
    });
  };
  const showAllSubCategory = () => {
    return subCategoryList.map((item, i) => {
      return (
        <MenuItem key={i} style={{ color: '#444', fontWeight: 600 }}>
          {item.subcategoryname}
        </MenuItem>
      );
    });
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          style={{ height: 80, background: '#fff', justifyContent: 'center' }}
          position='static'
        >
          <Toolbar
            style={{ display: 'flex', justifyContent: 'center', gap: 10 }}
          >
            {showAllCategory()}
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              {showAllSubCategory()}
            </Menu>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
