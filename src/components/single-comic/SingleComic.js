import './single-comic.scss';
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Spinner from '../spinner/Spinner';
import Error from '../error/Error';
import useMarvelService from '../../services/MarvelService';


const SingleComic = () => {

    const {comicId} = useParams();
    const [comic, setComic] = useState(null);

    const {loading, error, getComic, clearError}  = useMarvelService();


    const comicUpdate = () => {
        clearError();
        getComic(comicId)
        .then(setComic);
    }

    let didMount = useRef(false);
    useEffect(() => {
        if (didMount.current) {return} //to protect from executing twice
        didMount.current = true;
        comicUpdate();
    }, []);
    

    return (
        <>  

            {error && <Error/>}
            {loading && <Spinner/>}
            {comic && 
            <>
                <Helmet>
                    <meta
                        name="description"
                        content={comic.name + " - comic book"}
                    />
                    <title>{comic.name}</title>
                </Helmet>
                <View comic={comic}/> 
             </>}
        </>
    )
}

const View = ({comic}) => {
    const navigate = useNavigate();
    let {name, description, thumbnail, pageCount, price} = comic;
    return (
        
        <div className="single-comic">
            <img src={thumbnail} alt={name} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount} pages</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <div  onClick={() => {navigate(-1)}} className="single-comic__back">Go Back</div>
        </div>
    )
}
export default SingleComic;