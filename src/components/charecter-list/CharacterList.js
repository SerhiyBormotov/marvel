import { Component } from 'react';
import CharecterListItem from '../character-list-item/CharacterListItem';
import Spinner from '../spinner/Spinner';
import Error from '../error/Error';
import MarvelService from '../../services/MarvelService';
import './character-list.scss';


class CharacterList extends Component {
    state = {
        charList: [],
        loading: true
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.loadCharList();
    }

    loadCharList = () => {
        this.marvelService.getAllCharacters()
        .then(this.onCharListLoaded)
        .catch(this.onError);
    }

    onCharListLoaded = (charList) => {
        this.setState({
            charList, 
            loading: false 
        })
    }

    onError = () => {
        this.setState({
            error: true, 
            loading: false 
        })
    }

    render () {
        let {charList, loading, error} = this.state;
        let characterListItems = charList.map(({name, thumbnail, id}) => {
            return (
                <CharecterListItem name={name} thumbnail={thumbnail} key={id} id= {id} onCharUpdate={this.props.onCharUpdate}/>
            )
        })


        if (error) {return  <Error/>;}
        if (loading) {return <Spinner/>;}
    
    
        return (
            <div className="char__list">
                <ul className="char__grid">
                    {characterListItems}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )

    }
}

export default CharacterList;