import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store/store';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <App />
        <Toaster
          position='top-right'
          containerStyle={{ marginTop: 60 }}
          reverseOrder={true}
        />
      </AuthProvider>
    </Provider>
  </React.StrictMode>,
);
