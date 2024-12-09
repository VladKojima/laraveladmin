import { useState } from 'react';
import './App.css';
import { ObjectTable } from './components/objTable';

function App() {
  const [objs, setObjs] = useState([{ id: 1, name: 'Honda', price: 1000 }, { id: 2, name: 'Alex', price: 2000 }]);

  return (
    <div className="App">
      <header>
        <p>Управление контентом</p>
      </header>

      <ObjectTable editableColumns={true} objects={objs} onSave={setObjs} />
    </div>
  );
}

export default App;
