import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Spinner from '../spinner/Spinner';
import Header from '../header/Header';
import './app.scss';

const ErrorPage = lazy(() => import('../pages/404-page/404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SinglePage = lazy(() => import('../pages/single-page/SinglePage'));


const App = () => {


  return (
    <Router 
    // basename='/projects/marvel'
    >
      <div className="app">
        <Header/>
        <main>
            <Suspense fallback={<Spinner/>}>
            <Routes>
                <Route path='/' element={<MainPage/>}/>
                <Route path='/comics' >
                  <Route index element={<ComicsPage/>}/>
                  <Route path=':id' element={<SinglePage target="comic"/>}/>
                </Route>
                <Route path=':id' element={<SinglePage target="char"/>}/>
                <Route path='*' element={<ErrorPage/>}/>
            </Routes>
          </Suspense> 
        </main>
      </div>
    </Router>
  );
}

export default App;
