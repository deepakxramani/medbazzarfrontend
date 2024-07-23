import makeStyles from '@mui/styles/makeStyles';
export const brandStyles = makeStyles({
    mainBox:{
        display:'flex',
        width:'100%',
        height:'100vh',
        justifyContent:'center',
        fontFamily:'kanit',
        alignItems:'center',
        background:'#ecf0f1',
       

    },
    box: {
        height:300,
        width:650,
        background:'#fff',
        borderRadius:15,
        padding:10
    },
    boxDisplay: {
        height:'auto',
        width:800,
        background:'#fff',
        borderRadius:10,
        padding:10,

    }
})