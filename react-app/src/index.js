import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'

import { ContextProvider } from './context/Context';


//Initialyze time ago

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
    <App />
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

