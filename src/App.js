import './App.css';
import {Route, Routes} from 'react-router-dom';
import HomePage from './Pages/HomePage';
import 'semantic-ui-css/semantic.min.css'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<HomePage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
