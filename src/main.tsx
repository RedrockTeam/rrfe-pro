import './index.css';

import { StyleProvider } from '@ant-design/cssinjs';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import App from './App';

const rootElement: HTMLElement = document.getElementById('root')!;
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <StyleProvider hashPriority="high">
      <HashRouter>
        <App />
      </HashRouter>
    </StyleProvider>
  </React.StrictMode>
);
