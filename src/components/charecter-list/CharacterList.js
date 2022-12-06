import React, { Component } from 'react';
import PropTypes from "prop-types"
import Spinner from '../spinner/Spinner';
import Error from '../error/Error';
import MarvelService from '../../services/MarvelService';
import './character-list.scss';


class CharacterList extends Component {
    state = {
        charList: [],
        loading: true,
        error: false,
        offset: 210,
        newLoading: false,
        listEnd: false
    }

   itemRef = React.createRef();

    marvelService = new MarvelService();

    componentDidMount() {
        if (this.didMount) {return} //to protect from executing twice
        this.didMount = true;

        this.onRequest();      
    }


    onRequest = (offset) => {
        this.onCharListLoading();        
        this.marvelService.getAllCharacters(offset)
        .then(this.onCharListLoaded)
        .catch(this.onError);
    }
    
    onCharListLoading = () => {
        this.setState({
            newLoading:true
        })
    }

    onCharListLoaded = (newCharList) => {

        this.setState(({offset, charList}) => ({
                charList: [...charList, ...newCharList], 
                loading: false,
                newLoading: false,
                offset: offset + 9,
                listEnd: newCharList.length < 9
            }))
    }

    onError = () => {
        this.setState({
            error: true, 
            loading: false 
        })
    }

    onCharClick = (elem, char) => {
        const activeClass = 'char__item_selected';
        document.querySelectorAll(`.${activeClass}`).forEach(item => item.classList.remove(activeClass));    
        elem.classList.toggle(activeClass);
        this.props.onCharUpdate(char);
    }

    render () {
        let {charList, loading, error, offset, newLoading, listEnd} = this.state;

        let loadingMessage = loading ? <Spinner/> : null,
            errorMessage = error ? <Error/> : null,
            content = null;

        if (!(loading || error)) {
            content = (
                <ul className="char__grid">
                   { charList.map((char) => {
                        return (
                            <CharecterListItem 
                            char={char}
                            key={char.id} 
                            onCharClick={this.onCharClick}
                            />
                        )
                    })}
                </ul>
            )
        }
        
        return (
            <div className="char__list">
                
                {loadingMessage}
                {errorMessage}
                {content}
                
                <button 
                className="button button__main button__long"
                onClick={() => this.onRequest(offset)}
                disabled={newLoading}
                style={{display: listEnd ? "none" : "block"}}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )

    }
}

class CharecterListItem extends Component {
    componentWillUnmount(){
        console.log('unmount');
    }

    render() {
        const {char, onCharClick} = this.props;
        return(
            <li 
            className="char__item"
            onFocus={(e) => onCharClick(e.currentTarget, char)}
            tabIndex = {0}>
                <img src={char.thumbnail} alt={char.name}/>
                <div className="char__name">{char.name}</div>
            </li>        
        )
    }
}

CharacterList.propTypes = {
    onCharUpdate: PropTypes.func.isRequired
}

export default CharacterList;