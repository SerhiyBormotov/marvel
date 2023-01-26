import { useState } from 'react';
import { Helmet } from 'react-helmet';
import ErrorBoundary from '../error-boundary/ErrorBoundary';
import RandomCharacter from '../random-character/RandomCharacter';
import CharacterList from '../charecter-list/CharacterList';
import AsideCharacterInfo from '../aside-character-info/AsideCharacterInfo';
import FindCharacter from '../find-character/FindCharacter';
import visionImg from '../../resources/img/vision.png';

const MainPage = () => {
    const [activeChar, setActiveChar] = useState(null); 

    const onCharUpdate = (char) => {   
     setActiveChar(char);
    }
    
    return (
        <>
        <Helmet>
          <meta
            name="description"
            content="Marvel information portal App"
          />
          <title>Marvel information portal</title>
        </Helmet>
        <ErrorBoundary>
          <RandomCharacter/>
        </ErrorBoundary>
        <div className="char__content">
          <ErrorBoundary>
            <CharacterList onCharUpdate={onCharUpdate}/>
          </ErrorBoundary>
          <div>
            <ErrorBoundary>
              <AsideCharacterInfo activeChar={activeChar}/>
            </ErrorBoundary> 
            <FindCharacter/>
          </div>
        </div> 

        <img className="bg-decoration" src={visionImg} alt="vision"></img>
      </>
    )
}

export default MainPage;