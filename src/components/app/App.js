import { useState } from 'react';
import Header from '../header/Header';
import RandomCharacter from '../random-character/RandomCharacter';
import CharacterList from '../charecter-list/CharacterList';
import AsideCharacterInfo from '../aside-character-info/AsideCharacterInfo';
import ComicsList from '../comics-list/ComicsList';
import Banner from '../banner/Banner';
import SingleComic from '../single-comic/SingleComic';
import ErrorBoundary from '../error-boundary/ErrorBoundary';

import './app.scss';
import visionImg from '../../resources/img/vision.png';

const App = () => {
  // const [activeChar, setActiveChar] = useState(null); 

  // const onCharUpdate = (char) => {   
  //   setActiveChar(char);
  // }

  return (
    <div className="app">
      <Header/>
      <main>
        {/* <ErrorBoundary>
          <RandomCharacter/>
        </ErrorBoundary>
        <div className="char__content">
          <ErrorBoundary>
            <CharacterList onCharUpdate={onCharUpdate}/>
          </ErrorBoundary>
          <ErrorBoundary>
            <AsideCharacterInfo activeChar={activeChar}/>
          </ErrorBoundary> */}
        {/* </div> */}
        <Banner/>
        <ComicsList/>
      {/* <SingleComic/> */}
      <img className="bg-decoration" src={visionImg} alt="vision"></img>
      </main>
    </div>
  );
}

export default App;
