import { useState } from 'react';
import './App.css';
import { Viewer } from './components/viewer';
import { LoginPage } from './pages/login';

function App() {
  const [hasToken, setHasToken] = useState(!!sessionStorage.getItem('token'));

  return (
    <div className="App">
      <header>
        <p>Управление контентом</p>
      </header>
      {
        hasToken
          ? <Viewer />
          : <LoginPage onLogin={() => setHasToken(true)} />
      }
    </div>
  );
}

export default App;
