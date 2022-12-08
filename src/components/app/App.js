import Header from '../header/Header';
import { MainPage, ComicsPage } from '../pages';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import SingleComic from '../single-comic/SingleComic';


import './app.scss';


const App = () => {
  return (
    <Router>
      <div className="app">
        <Header/>
        <main>
          <Routes>
            <Route path='/' element={<MainPage/>}/>
            <Route path='/comics' element={<ComicsPage/>}/>
          </Routes>
        {/* <SingleComic/> */}
        </main>
      </div>
    </Router>
  );
}

export default App;
