import React from 'react';
import ReactDOM from 'react-dom/client';
import store from './Redux/store';
import { Provider } from 'react-redux';
import App from './App';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { GoogleOAuthProvider } from '@react-oauth/google';


const element = document.getElementById("root")
const root = ReactDOM.createRoot(element)
//1057379667464-eqri6ab2uaf7g9dgdblro9p8nhg63ive.apps.googleusercontent.com
//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
root.render(
  <GoogleOAuthProvider clientId='1057379667464-eqri6ab2uaf7g9dgdblro9p8nhg63ive.apps.googleusercontent.com'>
    <Provider store={store}>
      <App />
    </Provider>
  </GoogleOAuthProvider>
);
