import React from 'react';
import { CssBaseline } from '@material-ui/core'

import './App.css';
import Router from './Router'

function App() {
  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      <Router />
    </div>
  );
}

export default App;
