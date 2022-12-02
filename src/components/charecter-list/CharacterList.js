import { Component } from 'react';
import PropTypes from "prop-types"
import CharecterListItem from '../character-list-item/CharacterListItem';
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

    render () {
        let {charList, loading, error, offset, newLoading, listEnd} = this.state;

        let loadingMessage = loading ? <Spinner/> : null,
            errorMessage = error ? <Error/> : null,
            content = null;

        if (!(loading || error)) {
            content = (
                <ul className="char__grid">
                   { charList.map(({name, thumbnail, id}) => {
                        return (
                            <CharecterListItem 
                            name={name} 
                            thumbnail={thumbnail} 
                            key={id} 
                            id={id} 
                            onCharUpdate={this.props.onCharUpdate}/>
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

CharacterList.propTypes = {
    onCharUpdate: PropTypes.func.isRequired
}

export default CharacterList;