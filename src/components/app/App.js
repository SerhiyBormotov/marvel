import Header from '../header/Header';
import RandomCharacter from '../random-character/RandomCharacter';
import CharacterList from '../charecter-list/CharacterList';
import AsideCharacterInfo from '../aside-character-info/AsideCharacterInfo';
import ComicsList from '../comics-list/ComicsList';
import Banner from '../banner/Banner';
import SingleComic from '../single-comic/SingleComic';


import './app.scss';
import visionImg from '../../resources/img/vision.png';



function App() {
  return (
    <div className="app">
      <Header/>
      <main>
        <RandomCharacter/>
        <div className="char__content">
          <CharacterList/>
          <AsideCharacterInfo/>
        </div>
        <img className="bg-decoration" src={visionImg} alt="vision"></img>
        {/* <Banner/>
        <ComicsList/>
        <SingleComic/> */}
      </main>
    </div>
  );
}

export default App;
