import { Component } from 'react';
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
          <ErrorBoundary>
            <RandomCharacter/>
          </ErrorBoundary>
          <div className="char__content">
            {/* <ErrorBoundary> */}
              <CharacterList onCharUpdate={this.onCharUpdate}/>
            {/* </ErrorBoundary> */}
            <ErrorBoundary>
              <AsideCharacterInfo activeChar={this.state.activeChar}/>
            </ErrorBoundary>
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
