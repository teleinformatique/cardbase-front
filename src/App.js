import React from "react"
import {AppBar, Typography, Toolbar} from '@material-ui/core';
import Login from './components/Login';

const App = () => {

  return(
    <div className="App">
      <AppBar color="default" position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit">Cardatabase List</Typography>
        </Toolbar>
      </AppBar>
      <Login />
    </div>
    
  )
}

export default App