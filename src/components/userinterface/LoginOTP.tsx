import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendOtp, verifyOtp, resetOtpState } from '../../redux/slices/otpSlice';
import { setUser } from '../../redux/slices/otpSlice';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { postData } from '../../services/FetchNodeServices';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';

const LoginOTP: React.FC = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const {
    step: reduxStep,
    loading,
    error,
    successMessage,
  } = useSelector((state: any) => state.otp);
  var { loginUser, userData } = useAuth();

  const [step, setStep] = useState<'email' | 'otp' | 'signup'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [resendTimer, setResendTimer] = useState(0);

  // Signup fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [address, setAddress] = useState('');

  // Sync redux step to local step
  React.useEffect(() => {
    if (reduxStep === 'email' || reduxStep === 'otp') {
      setStep(reduxStep);
    }
  }, [reduxStep]);

  // Countdown timer for resend button
  const startResendTimer = () => {
    setResendTimer(30);
    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSendOtp = async () => {
    const result = await dispatch(sendOtp(email));
    if (sendOtp.fulfilled.match(result)) {
      startResendTimer();
    }
  };

  const handleVerifyOtp = async () => {
    const result = await dispatch(verifyOtp({ email, otp }));
    if (verifyOtp.fulfilled.match(result)) {
      const { token, user } = result.payload;

      const normalizedUser: any = {
        ...user,
        username: user?.username || user?.name || email,
        emailid: user?.emailid || user?.email || email,
        mobileno: user?.mobileno || user?.mobile || '',
        address: user?.address || '',
        token,
      };

      const checkResult = await postData('users/check_userdata', {
        email: normalizedUser.emailid,
      });

      if (!checkResult?.status) {
        // User not in userdata table yet — prompt signup
        setStep('signup');
      } else {
        // User exists — login directly
        localStorage.setItem(
          'user-data',
          JSON.stringify({ [email]: normalizedUser }),
        );
        dispatch(setUser(normalizedUser));
        loginUser(email, normalizedUser);
        navigate('/productcart');
      }
    }
  };

  const handleRegister = async () => {
    if (!firstName || !mobileNo) return;

    const token = localStorage.getItem('token') || '';
    const username = `${firstName} ${lastName}`.trim();

    const subUser = {
      mobileno: mobileNo,
      emailid: email,
      username: username,
      address: address,
      token: token,
    };

    const submitResult = await postData('users/submit_user', subUser);

    if (submitResult?.status) {
      localStorage.setItem('user-data', JSON.stringify({ [email]: subUser }));
      dispatch(setUser(subUser));
      loginUser(email, subUser);
      navigate('/productcart');
    } else {
      alert('Registration failed, please try again.');
    }
  };

  if (!userData && step === 'email' && reduxStep !== 'email') {
    resetOtpState();
  }

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 450,
        mx: 'auto',
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: { xs: 4, md: 5 },
          borderRadius: 4,
          border: '1px solid #eef0f2',
          boxShadow: '0px 12px 48px rgba(0,0,0,0.06)',
          background: '#fff',
        }}
      >
        {step === 'email' && (
          <Box display='flex' flexDirection='column' gap={3.5}>
            <Box>
              <Typography
                variant='h4'
                fontWeight='800'
                sx={{
                  color: '#00391c',
                  mb: 1,
                  fontFamily: 'Kanit, sans-serif',
                }}
              >
                Welcome Back
              </Typography>
              <Typography
                variant='body1'
                color='text.secondary'
                sx={{ opacity: 0.8 }}
              >
                Enter your registered email to receive a secure OTP to login.
              </Typography>
            </Box>

            <TextField
              label='Email Address'
              variant='outlined'
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              error={!!error}
              helperText={error}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <MailOutlineIcon sx={{ color: 'action.active' }} />
                  </InputAdornment>
                ),
                sx: { borderRadius: 2, bgcolor: '#f8faf9' },
              }}
            />

            <Button
              variant='contained'
              fullWidth
              onClick={handleSendOtp}
              disabled={loading || !email}
              sx={{
                py: 1.8,
                borderRadius: 2,
                backgroundColor: '#00391c',
                fontSize: '1.05rem',
                fontWeight: 600,
                textTransform: 'none',
                boxShadow: '0 8px 20px rgba(0,57,28,0.15)',
                transition: 'all 0.2s',
                '&:hover': {
                  backgroundColor: '#002613',
                  boxShadow: '0 8px 24px rgba(0,57,28,0.25)',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              {loading ? (
                <CircularProgress size={26} color='inherit' />
              ) : (
                'Get OTP'
              )}
            </Button>

            <Typography
              variant='caption'
              textAlign='center'
              color='text.secondary'
              sx={{ mt: 1, display: 'block', opacity: 0.7 }}
            >
              By continuing, you agree to MedBazzar's{' '}
              <a style={{ color: '#00391c', cursor: 'pointer' }}>
                Terms of Use
              </a>{' '}
              and{' '}
              <a style={{ color: '#00391c', cursor: 'pointer' }}>
                Privacy Policy.
              </a>
            </Typography>
          </Box>
        )}

        {step === 'otp' && (
          <Box display='flex' flexDirection='column' gap={3.5}>
            <Box display='flex' alignItems='center' gap={1}>
              <IconButton
                onClick={() => dispatch(resetOtpState())}
                size='small'
                sx={{
                  ml: -1,
                  color: '#00391c',
                  bgcolor: '#f0f5f2',
                  '&:hover': { bgcolor: '#e0ebe4' },
                }}
              >
                <ArrowBackIcon fontSize='small' />
              </IconButton>
              <Typography
                variant='h5'
                fontWeight='800'
                sx={{ color: '#00391c', fontFamily: 'Kanit, sans-serif' }}
              >
                Verify OTP
              </Typography>
            </Box>

            <Box>
              <Typography
                variant='body1'
                color='text.secondary'
                sx={{ opacity: 0.8 }}
              >
                We sent a 6-digit code to <strong>{email}</strong>
              </Typography>
            </Box>

            {successMessage && (
              <Typography
                variant='body2'
                sx={{
                  color: '#2e7d32',
                  bgcolor: '#e8f5e9',
                  p: 1.5,
                  borderRadius: 2,
                  fontWeight: 500,
                }}
              >
                {successMessage}
              </Typography>
            )}

            <TextField
              label='6-digit OTP'
              variant='outlined'
              fullWidth
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))
              }
              disabled={loading}
              error={!!error}
              helperText={error}
              inputProps={{
                maxLength: 6,
                style: {
                  letterSpacing: 12,
                  fontSize: 24,
                  textAlign: 'center',
                  fontWeight: 600,
                  color: '#00391c',
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <VpnKeyOutlinedIcon sx={{ color: 'action.active' }} />
                  </InputAdornment>
                ),
                sx: { borderRadius: 2, bgcolor: '#f8faf9' },
              }}
            />

            <Button
              variant='contained'
              fullWidth
              onClick={handleVerifyOtp}
              disabled={loading || otp.length !== 6}
              sx={{
                py: 1.8,
                borderRadius: 2,
                backgroundColor: '#00391c',
                fontSize: '1.05rem',
                fontWeight: 600,
                textTransform: 'none',
                boxShadow: '0 8px 20px rgba(0,57,28,0.15)',
                transition: 'all 0.2s',
                '&:hover': {
                  backgroundColor: '#002613',
                  boxShadow: '0 8px 24px rgba(0,57,28,0.25)',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              {loading ? (
                <CircularProgress size={26} color='inherit' />
              ) : (
                'Verify'
              )}
            </Button>

            <Box
              display='flex'
              justifyContent='center'
              alignItems='center'
              mt={0.5}
            >
              <Button
                onClick={handleSendOtp}
                disabled={resendTimer > 0 || loading}
                sx={{
                  textTransform: 'none',
                  color: resendTimer > 0 ? 'text.secondary' : '#00391c',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  '&:hover': {
                    bgcolor: 'transparent',
                    textDecoration: resendTimer > 0 ? 'none' : 'underline',
                  },
                }}
                disableRipple
              >
                {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend OTP'}
              </Button>
            </Box>
          </Box>
        )}

        {step === 'signup' && (
          <Box display='flex' flexDirection='column' gap={3}>
            <Box>
              <Typography
                variant='h4'
                fontWeight='800'
                sx={{
                  color: '#00391c',
                  mb: 1,
                  fontFamily: 'Kanit, sans-serif',
                }}
              >
                Complete Profile
              </Typography>
              <Typography
                variant='body1'
                color='text.secondary'
                sx={{ opacity: 0.8 }}
              >
                We noticed you don't have an account. Please verify your
                details!
              </Typography>
            </Box>

            <Box display='flex' gap={2}>
              <TextField
                label='First Name'
                variant='outlined'
                fullWidth
                value={firstName}
                required
                onChange={(e) => setFirstName(e.target.value)}
              />
              <TextField
                label='Last Name'
                variant='outlined'
                fullWidth
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Box>

            <TextField
              label='Mobile Number'
              variant='outlined'
              fullWidth
              value={mobileNo}
              required
              onChange={(e) => setMobileNo(e.target.value)}
              inputProps={{ maxLength: 10 }}
            />

            <TextField
              label='Shipping Address'
              variant='outlined'
              fullWidth
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              multiline
              rows={2}
            />

            <Button
              variant='contained'
              fullWidth
              onClick={handleRegister}
              disabled={!firstName || !mobileNo}
              sx={{
                py: 1.8,
                mt: 1,
                borderRadius: 2,
                backgroundColor: '#00391c',
                fontSize: '1.05rem',
                fontWeight: 600,
                textTransform: 'none',
                boxShadow: '0 8px 20px rgba(0,57,28,0.15)',
                transition: 'all 0.2s',
                '&:hover': {
                  backgroundColor: '#002613',
                  boxShadow: '0 8px 24px rgba(0,57,28,0.25)',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              Finish Registration & Login
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default LoginOTP;
