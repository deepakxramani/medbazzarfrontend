import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // Fix @material-table/core deep imports into @mui/icons-material
      // Vite's strict ESM resolver can't resolve deep CJS imports
      '@mui/icons-material/DeleteOutline': path.resolve(__dirname, 'node_modules/@mui/icons-material/esm/DeleteOutline.js'),
      '@mui/icons-material/Clear': path.resolve(__dirname, 'node_modules/@mui/icons-material/esm/Clear.js'),
      '@mui/icons-material/Search': path.resolve(__dirname, 'node_modules/@mui/icons-material/esm/Search.js'),
      '@mui/icons-material/FirstPage': path.resolve(__dirname, 'node_modules/@mui/icons-material/esm/FirstPage.js'),
      '@mui/icons-material/LastPage': path.resolve(__dirname, 'node_modules/@mui/icons-material/esm/LastPage.js'),
      '@mui/icons-material/ChevronRight': path.resolve(__dirname, 'node_modules/@mui/icons-material/esm/ChevronRight.js'),
      '@mui/icons-material/ChevronLeft': path.resolve(__dirname, 'node_modules/@mui/icons-material/esm/ChevronLeft.js'),
      '@mui/icons-material/ArrowDownward': path.resolve(__dirname, 'node_modules/@mui/icons-material/esm/ArrowDownward.js'),
      '@mui/icons-material/Check': path.resolve(__dirname, 'node_modules/@mui/icons-material/esm/Check.js'),
      '@mui/icons-material/FilterList': path.resolve(__dirname, 'node_modules/@mui/icons-material/esm/FilterList.js'),
      '@mui/icons-material/Remove': path.resolve(__dirname, 'node_modules/@mui/icons-material/esm/Remove.js'),
      '@mui/icons-material/ViewColumn': path.resolve(__dirname, 'node_modules/@mui/icons-material/esm/ViewColumn.js'),
      '@mui/icons-material/SaveAlt': path.resolve(__dirname, 'node_modules/@mui/icons-material/esm/SaveAlt.js'),
      '@mui/icons-material/AddBox': path.resolve(__dirname, 'node_modules/@mui/icons-material/esm/AddBox.js'),
      '@mui/icons-material/Edit': path.resolve(__dirname, 'node_modules/@mui/icons-material/esm/Edit.js'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
