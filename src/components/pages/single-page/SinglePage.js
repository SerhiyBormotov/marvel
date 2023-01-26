import './single-page.scss';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../../spinner/Spinner';
import Error from '../../error/Error';
import Banner from '../../banner/Banner';
import SingleCharLayout from './SingleCharLayout';
import SingleComicLayout from './SingleComicLayout';
import useMarvelService from '../../../services/MarvelService';

const SinglePage = ({target}) => {

    const {id} = useParams();
    const [data, setData] = useState(null);

    const {loading, error, getComic, getCharacter, clearError}  = useMarvelService();


    const dataUpdate = () => {
        clearError();
        let response;
        switch (target) {
            case "comic":
                response = getComic(id);
                break
            case "char":
                response = getCharacter(id);
                break;
            default:
                throw (new Error('Unexpected target for single page') );
        }
        response.then(setData);
    }

    let didMount = useRef(false);
    useEffect(() => {
        if (didMount.current) {return} //to protect from executing twice
        didMount.current = true;
        dataUpdate();
    }, []);    

    return (
        <>  
            <Banner/>
            {error && <Error/>}
            {loading && <Spinner/>}
            {data && target === "char" && <SingleCharLayout data = {data}/>}
            {data && target === "comic" && <SingleComicLayout data = {data}/>}
            
        </>
    )
}


export default SinglePage;