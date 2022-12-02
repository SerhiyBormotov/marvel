import { Component } from 'react';
import Header from '../header/Header';
import RandomCharacter from '../random-character/RandomCharacter';
import CharacterList from '../charecter-list/CharacterList';
import AsideCharacterInfo from '../aside-character-info/AsideCharacterInfo';
import ComicsList from '../comics-list/ComicsList';
import Banner from '../banner/Banner';
import SingleComic from '../single-comic/SingleComic';

import './app.scss';
import visionImg from '../../resources/img/vision.png';

class App extends Component {
  state = {
    activeChar: null
  }

  onCharUpdate = (elem, id) => {
    const activeClass = 'char__item_selected';
    this.setState({
      activeChar: id
    })
    
    document.querySelectorAll(`.${activeClass}`).forEach(item => item.classList.remove(activeClass));

    elem.classList.toggle(activeClass);
  }

  render() {
    return (
      <div className="app">
        <Header/>
        <main>
          <RandomCharacter/>
          <div className="char__content">
            <CharacterList onCharUpdate={this.onCharUpdate}/>
            <AsideCharacterInfo activeChar={this.state.activeChar}/>
          </div>
          <img className="bg-decoration" src={visionImg} alt="vision"></img>
          {/* <Banner/>
          <ComicsList/>
          <SingleComic/> */}
        </main>
      </div>
    );
  }
}

export default App;
