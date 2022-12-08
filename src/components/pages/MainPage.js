import { useState } from 'react';
import ErrorBoundary from '../error-boundary/ErrorBoundary';
import RandomCharacter from '../random-character/RandomCharacter';
import CharacterList from '../charecter-list/CharacterList';
import AsideCharacterInfo from '../aside-character-info/AsideCharacterInfo';
import visionImg from '../../resources/img/vision.png';

const MainPage = () => {
    const [activeChar, setActiveChar] = useState(null); 

    const onCharUpdate = (char) => {   
     setActiveChar(char);
    }
    
    return (
        <>
        <ErrorBoundary>
          <RandomCharacter/>
        </ErrorBoundary>
        <div className="char__content">
          <ErrorBoundary>
            <CharacterList onCharUpdate={onCharUpdate}/>
          </ErrorBoundary>
          <ErrorBoundary>
            <AsideCharacterInfo activeChar={activeChar}/>
          </ErrorBoundary> 
        </div> 

        <img className="bg-decoration" src={visionImg} alt="vision"></img>
      </>
    )
}

export default MainPage;