import React from 'react';
import { CssBaseline } from '@material-ui/core'

import './App.css';
import Router from './Router'
import Snackbar from './components/Snackbar'
import ConsentDialog from './components/ConsentDialog'

function App() {
  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      <Router />
      <Snackbar/>
      <ConsentDialog />
    </div>
  );
}

export default App;
