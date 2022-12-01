import { Component } from 'react';
import MarvelService from '../../services/MarvelService';

import './random-character.scss';
import mjolnirImg from '../../resources/img/mjolnir.png';



class RandomCharacter extends Component {
    constructor (props) {
        super(props);
        this.charUpdate();
    }

    marvelService = new MarvelService();

    state = {
        char: {}
    }

    updateState = (char) => {
        this.setState({char});
    }

    charUpdate = () => {
        const id = Math.round(Math.random() * (1011400 - 1011100) + 1011100);
        this.marvelService.getCharacter(id)
        .then(this.updateState);
    }

    render() {
        let {char : {name, thumbnail, description, homepage, wiki}} = this.state;

        if (!description) {
            description = "No description of the Character"
        } else if (description.length > 200) {
            description = description.slice(0, 200) + '...';
        }

        return (
            <div className="randomchar">
                <div className="randomchar__block">
                    <img src={thumbnail} alt={name} className="randomchar__img"/>
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

export default RandomCharacter;