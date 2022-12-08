import Header from '../header/Header';
import { MainPage, ComicsPage, ErrorPage, SingleComicPage } from '../pages';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';




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
            <Route path='/comics/:comicId' element={<SingleComicPage/>}/>           
            <Route path='*' element={<ErrorPage/>}/>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
