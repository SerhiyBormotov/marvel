import PropTypes from 'prop-types';
import Skeleton from '../skeleton/Skleton';

import './aside-character-info.scss';

const AsideCharacterInfo = (props) => {
    const char = props.activeChar;

    let skeleton = !(char) ? <Skeleton/> : null,
        content = char ? <View char={char}/> : null;

    return(
        <div className="char__info">
            {skeleton}
            {content}        
        </div>
    )
    
}

const View = ({char}) => {
    let {thumbnail, name, description, homepage, wiki, comics} = char;
    let classNoImage = "",
     comicsListItems = "No comics with the Character was found";

    if (!description) {
        description = "No description of the Character";
    } else if (description.length > 500) {
        description = description.slice(0, 500) + '...';
    }

    if (thumbnail.indexOf('image_not_available') >= 0) {
        classNoImage = "char__no-image";
    }

    if (comics.length > 0) {
        comicsListItems = comics.map((item, index) => {
            return (
                <li className="char__comics-item" key={index}>
                    {item.name}
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
        id: PropTypes.string.isRequired,
        thumbnail:  PropTypes.string,
        homepage:  PropTypes.string,
        wiki:  PropTypes.string,
        comics: PropTypes.array
    })
}

export default AsideCharacterInfo;