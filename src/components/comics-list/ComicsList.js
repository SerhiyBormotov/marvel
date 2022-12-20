import { useState, useEffect, useRef, createRef } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import Error from '../error/Error';

import './comics-list.scss';

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]),
          [offset, setOffset] = useState(20),
          [listEnd, setListEnd] = useState(false);

    const {loading, error, getAllComics} = useMarvelService();

    const refArr = [];

    const onComicsListLoaded = (newComicsList) => {
        setComicsList([...comicsList, ...newComicsList]);
        setOffset(offset => offset + 8);
        setListEnd(newComicsList.length < 8);
    }

    const onRequest = (offset) => {
        getAllComics(offset)
        .then(onComicsListLoaded);
    }

    let didMount = useRef(false);
    useEffect(() => {
        if (didMount.current) {return} //to protect from executing twice
        didMount.current = true;
        onRequest();
    }, []);

    return (
        <div className="comics__list">
            {/* Check if Char List is empty */}
            {(loading && (comicsList.length === 0)) && <Spinner/> }  
            {error && <Error/>}
            <TransitionGroup className="comics__grid" component={'ul'}>                
                {
                    comicsList.map(({name, thumbnail, price,  id}, index) => {
                        refArr[index] = createRef();
                        return (
                            <CSSTransition nodeRef={refArr[index]} classNames="roll-in" timeout={500} key={index}>
                                <li className="comics__item"
                                key={index}
                                ref={refArr[index]} >
                                    <a href={"/comics/" + id}>
                                        <img src={thumbnail} alt={name} className="comics__item-img"/>
                                        <div className="comics__item-name">{name}</div>
                                        <div className="comics__item-price">{price}</div>
                                    </a>
                                </li>
                            </CSSTransition>
                        )
                    })
                }
            </TransitionGroup>
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

export default ComicsList;