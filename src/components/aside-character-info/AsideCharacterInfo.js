import PropTypes from 'prop-types';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import Skeleton from '../skeleton/Skleton';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

import './aside-character-info.scss';

const AsideCharacterInfo = (props) => {
    const char = props.activeChar;
    const refnode=useRef(null);

    return(
        <>
        <SwitchTransition>
            <CSSTransition 
                key = {char ? char.id : "init"} 
                classNames="fade-in" 
                timeout={200} 
                nodeRef={refnode} 
                mountOnEnter 
                unmountOnExit 
                >
                <div className="char__info" ref={refnode}>
                    {char ? <View char={char}/> : <Skeleton/>}       
                </div>
            </CSSTransition>
        </SwitchTransition>    
        </>
    )
    
}

const View = ({char}) => {
    let {thumbnail, name, description, homepage, wiki, comics} = char;
    let classNoImage = "",
     comicsListItems = "No comics with the Character was found";

   if (description.length > 500) {
        description = description.slice(0, 500) + '...';
    }

    if (thumbnail.indexOf('image_not_available') >= 0) {
        classNoImage = "char__no-image";
    }

    if (comics.length > 0) {
        comicsListItems = comics.map((item, index) => {
            const id = item.resourceURI.match(/\/\d+$/)[0].slice(1);
            return (
                <li className="char__comics-item" key={index}>
                    <Link to={'/comics/' + id}>{item.name}</Link>
                </li>
            )
        })
    }   

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} className={classNoImage}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comicsListItems}
            </ul>
        </>        
    )
}

AsideCharacterInfo.propTypes = {
    activeChar: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
        id: PropTypes.number.isRequired,
        thumbnail:  PropTypes.string,
        homepage:  PropTypes.string,
        wiki:  PropTypes.string,
        comics: PropTypes.array
    })
}


export default AsideCharacterInfo;