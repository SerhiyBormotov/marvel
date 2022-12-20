import { useState, useRef, useEffect, Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import Error from '../error/Error';

import './random-character.scss';
import mjolnirImg from '../../resources/img/mjolnir.png';

const RandomCharacter = () => {
    const [char, setChar] = useState(null);

    const {loading, error, getCharacter, clearError}  = useMarvelService();


    const charUpdate = () => {
        clearError();
        const id = Math.round(Math.random() * (1011400 - 1011100) + 1011100);
        getCharacter(id)
        .then(setChar);
    }

    let didMount = useRef(false);
    useEffect(() => {
        if (didMount.current) {return} //to protect from executing twice
        didMount.current = true;
        charUpdate();
    }, []);
    const showContent = !(!char || loading || error);
    const refnode=useRef(null);

    return (        
        <div className="randomchar">
            {loading && <Spinner/>}
            {error && <Error/>}

            <CSSTransition 
            classNames="fade-in" 
            timeout={500} 
            nodeRef={refnode} 
            in={showContent} 
            mountOnEnter 
            unmountOnExit 
            exit={false}>
                <div className="randomchar__block" ref={el => refnode.current = el}>
                    <View char={char}/>
                </div>
            </CSSTransition> 

            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button 
                className="button button__main"
                onClick={charUpdate}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnirImg} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

class View extends Component {
    render() {
        let {name, thumbnail, description, homepage, wiki} = this.props.char;
        let classNoImage = '';
        if (description.length > 180) {
            description = description.slice(0, 100) + '...';
        }

        if (thumbnail.indexOf('image_not_available') >= 0) {    
            classNoImage = "randomchar__img_no-image";
        }

        return (
            <>
                <img src={thumbnail} alt={name} className={"randomchar__img " + classNoImage} />
                <div className="randomchar__info" >
                    <p className="randomchar__name">{name}</p>
                    <p className="randomchar__descr">
                        {description}
                    </p>
                    <div className="randomchar__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </>
            )
    }


    
}

export default RandomCharacter;