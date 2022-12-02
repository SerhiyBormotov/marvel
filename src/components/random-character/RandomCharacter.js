import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import Error from '../error/Error';

import './random-character.scss';
import mjolnirImg from '../../resources/img/mjolnir.png';



class RandomCharacter extends Component {

    state = {
        char: {},
        loading: true,
        error: false
    }

    componentDidMount() {
        this.charUpdate();
    }

    marvelService = new MarvelService();

    updateState = (char) => {
        this.setState({
            char, 
            loading: false
        });

    }

    onLoading = () => {
        this.setState({
            loading: true
        });
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        });

    }

    charUpdate = () => {
        const id = Math.round(Math.random() * (1011400 - 1011100) + 1011100);
        this.onLoading();
        this.marvelService.getCharacter(id)
        .then(this.updateState)
        .catch(this.onError);
    }

    render() {
        let {char, loading, error} = this.state;
        
        let errorMessage = error ? <Error/> : null,
            loadingMessage = loading ? <Spinner/> : null,
            content = !(error || loading) ? <View char={char}/> : null;


        return (        
            <div className="randomchar">
               {loadingMessage}
               {errorMessage}
               {content} 
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
                    onClick={this.charUpdate}>
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnirImg} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

const View = ({char}) => {

    let {name, thumbnail, description, homepage, wiki} = char;
    let classNoImage = '';

    if (!description) {
        description = "No description of the Character"
    } else if (description.length > 200) {
        description = description.slice(0, 200) + '...';
    }

    if (thumbnail.indexOf('image_not_available') >= 0) {
        classNoImage = "randomchar__img_no-image";
    }

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt={name} className={"randomchar__img " + classNoImage}/>
            <div className="randomchar__info">
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
        </div>
    )
}

export default RandomCharacter;