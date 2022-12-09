import Header from '../header/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Spinner from '../spinner/Spinner';
import './app.scss';

const ErrorPage = lazy(() => import('../pages/404-page/404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleComicPage = lazy(() => import('../pages/single-comic-page/SingleComicPage'));

const App = () => {
  return (
    <Router>
      <div className="app">
        <Header/>
        <main>
          <Suspense fallback={<Spinner/>}>
            <Routes>
              <Route path='/' element={<MainPage/>}/>
              <Route path='/comics' element={<ComicsPage/>}/>
              <Route path='/comics/:comicId' element={<SingleComicPage/>}/>           
              <Route path='*' element={<ErrorPage/>}/>
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
}

export default App;
