import * as React from 'react';
import './App.css';
import ButtonAppBar from "./components/AppBar";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <ButtonAppBar/>
      </div>
    </ThemeProvider>
  );
}

export default App;
