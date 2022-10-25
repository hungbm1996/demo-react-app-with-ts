import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { TemplateLayout } from './components/TemplateLayout';
import { store } from './states/config-store';

export const App = React.memo(() => {
  return <BrowserRouter>
    <Provider store={ store }>
      <TemplateLayout />
    </Provider>
  </BrowserRouter>;
});
