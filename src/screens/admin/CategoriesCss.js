import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(() => ({
    root: {
      display: 'flex',
      width: '100%',
      height: '100vh',
      fontFamily: 'Poppins, sans-serif',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ecf0f1'
    },
    box: {
        width: 600,
        height: 'auto',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        boxShadow:  '0 0 4px 5px rgba(0, 0, 0, 0.1)',
    },
    boxDisplay: {
      width: 800,
      height: 'auto',
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 10,
      boxShadow:  '0 0 4px 5px rgba(0, 0, 0, 0.1)',
  }
  }));