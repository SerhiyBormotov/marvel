import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Spinner from '../spinner/Spinner';
import Header from '../header/Header';
import './app.scss';

const ErrorPage = lazy(() => import('../pages/404-page/404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleComic = lazy(() => import('../single-comic/SingleComic'));
const ComicsList = lazy(() => import('../comics-list/ComicsList'));

const App = () => {


  return (
    <Router>
      <div className="app">
        <Header/>
        <main>
            <Suspense fallback={<Spinner/>}>
            <Routes>
                <Route path='/' element={<MainPage/>}/>
                <Route path='/comics' element={<ComicsPage/>}>
                  <Route index element={<ComicsList/>}/>
                  <Route path=':comicId' element={<SingleComic/>}/>
                </Route>
                <Route path='*' element={<ErrorPage/>}/>
            </Routes>
          </Suspense> 
        </main>
      </div>
    </Router>
  );
}

export default App;
