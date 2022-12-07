import { useState, useEffect, useRef} from 'react';
import PropTypes from "prop-types";
import Spinner from '../spinner/Spinner';
import Error from '../error/Error';
import useMarvelService from '../../services/MarvelService';
import './character-list.scss';


const CharacterList = (props) => {

    const [charList, setCharList] = useState([]),
          [offset, setOffset] = useState(210),
          [listEnd, setListEnd] = useState(false);

    const {loading, error, getAllCharacters} = useMarvelService();   

    const onCharListLoaded = (newCharList) => {
        setCharList([...charList, ...newCharList]);
        setOffset(offset => offset + 9);
        setListEnd(newCharList.length < 9);
    }

    const onRequest = (offset) => {
        getAllCharacters(offset)
        .then(onCharListLoaded);
    }

    let refArr = useRef([]);

    const onCharClick = (i, char) => {
        const activeClass = 'char__item_selected';
        refArr.current.forEach(item => item.classList.remove(activeClass))
        refArr.current[i].classList.add(activeClass);
        props.onCharUpdate(char);
    }

    let didMount = useRef(false);
    useEffect(() => {
        if (didMount.current) {return} //to protect from executing twice
        didMount.current = true;
        onRequest();
    }, []);
    
    
    let loadingMessage = (loading && (charList.length === 0)) ? <Spinner/> : null,   //Check if Char List is empty
        errorMessage = error ? <Error/> : null;

    return (
        <div className="char__list">
            
            {loadingMessage}
            {errorMessage}
            <ul className="char__grid">
                { charList.map((char, i) => {
                    return (
                        <li 
                        className="char__item"
                        onFocus={() => onCharClick(i, char)}
                        onClick={e => e.currentTarget.focus()}
                        tabIndex = {0}
                        key={char.id}
                        ref={el => refArr.current[i] = el}>
                            <img src={char.thumbnail} alt={char.name}/>
                            <div className="char__name">{char.name}</div>
                        </li>  
                    )
                })}
            </ul>
            
            <button 
            className="button button__main button__long"
            onClick={() => onRequest(offset)}
            disabled={loading}
            style={{display: listEnd ? "none" : "block"}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )

}


CharacterList.propTypes = {
    onCharUpdate: PropTypes.func.isRequired
}

export default CharacterList;