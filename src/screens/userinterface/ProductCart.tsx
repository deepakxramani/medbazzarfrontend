import AddToCart from '../../components/userinterface/AddToCart';
import PaymentUI from '../../components/userinterface/PaymentUI';
import { Grid } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { useEffect, useState, useCallback } from 'react';
import Header from '../../components/userinterface/Header';
import AddAddress from '../../components/userinterface/AddAddress';
import { postData } from '../../services/FetchNodeServices';
import DeliveryAddress from '../../components/userinterface/DeliveryAddress';

export default function ProductCart() {
  const [pageRefresh, setPageRefresh] = useState(false);
  const [status, setStatus] = useState(false);
  const [userAddress, setUserAddress] = useState([]);

  var { cart: products, userData } = useAuth();

  const check_user_address = useCallback(async () => {
    if (userData?.email === undefined) {
      setStatus(false);
    } else {
      var result = await postData('users/check_user_address', {
        email: userData?.email,
      });
      if (result.status === false) {
        setStatus(true);
      } else {
        setStatus(false);
        setUserAddress(result.data);
      }
    }
  }, [userData?.email]);

  useEffect(
    function () {
      check_user_address();
    },
    [check_user_address, pageRefresh],
  );

  return (
    <div>
      <Header />
      <Grid
        container
        spacing={1}
        style={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 100,
        }}
      >
        <Grid item md={8} xs={12}>
          <div>
            <DeliveryAddress
              status={status}
              setStatus={setStatus}
              pageRefresh={pageRefresh}
              setPageRefresh={setPageRefresh}
              userData={userData}
              userAddress={userAddress}
            />
          </div>
          <AddToCart
            pageRefresh={pageRefresh}
            setPageRefresh={setPageRefresh}
            products={products}
          />
        </Grid>

        <Grid item md={4} xs={12}>
          <PaymentUI
            userData={userData}
            userAddress={userAddress}
            products={products}
          />
        </Grid>
      </Grid>
      <AddAddress
        pageRefresh={pageRefresh}
        setPageRefresh={setPageRefresh}
        userData={userData}
        status={status}
        setStatus={setStatus}
      />
    </div>
  );
}
