import { useState, useEffect, useRef } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import Error from '../error/Error';

import './comics-list.scss';

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]),
          [offset, setOffset] = useState(20),
          [listEnd, setListEnd] = useState(false);

    const {loading, error, getAllComics} = useMarvelService();

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
            <ul className="comics__grid">
                
                {
                    comicsList.map(({name, thumbnail, price, homepage, id}, index) => {
                        return (
                            <li className="comics__item"
                            key = {index}>
                                <a href={homepage}>
                                    <img src={thumbnail} alt={name} className="comics__item-img"/>
                                    <div className="comics__item-name">{name}</div>
                                    <div className="comics__item-price">{price?`${price}$`:"NOT AVAILABLE"}</div>
                                </a>
                            </li>
                        )
                    })
                }
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

export default ComicsList;