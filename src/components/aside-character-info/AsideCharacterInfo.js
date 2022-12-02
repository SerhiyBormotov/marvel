import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skleton';
import Error from '../error/Error';
import MarvelService from '../../services/MarvelService';

import './aside-character-info.scss';


class AsideCharacterInfo extends Component {
    state = {
        char: null,
        loading: false,
        error: false
    }

    componentDidMount() {
        this.charUpdate();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.activeChar !== this.props.activeChar) {
            this.charUpdate();
        }
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
        let id = this.props.activeChar;
            if (id) {
                this.onLoading();
                this.marvelService.getCharacter(id)
                .then(this.updateState)
                .catch(this.onError);
            }
        }

    render() {
        let {char, error, loading} = this.state;

        let errorMessage = error ? <Error/> : null,
            loadingMessage = loading ? <Spinner/> : null,
            skeleton = !(error || loading || char) ? <Skeleton/> : null,
            content = !(error || loading || !char) ? <View char={char}/> : null;
        return(
            <div className="char__info">
                {errorMessage}
                {skeleton}
                {loadingMessage}
                {content}        
            </div>
        )
    }
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

export default AsideCharacterInfo;