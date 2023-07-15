import './App.css';
import {Route, Routes} from 'react-router-dom';
import HomePage from './Pages/HomePage';
import 'semantic-ui-css/semantic.min.css'
import BookPage from './Pages/BookPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<HomePage />}></Route>
        <Route path='/book/:id' element={<BookPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
