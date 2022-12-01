import './character-list.scss';
import abyssImg from '../../resources/img/abyss.jpg'
import CharecterListItem from '../character-list-item/CharacterListItem';

const CharacterList = () => {
    let characterListData = [
        {name: 'Abyss', img: abyssImg, active:false},
        {name: 'Abyss', img: abyssImg, active:true},
        {name: 'Abyss', img: abyssImg, active:false},
        {name: 'Abyss', img: abyssImg, active:false},
        {name: 'Abyss', img: abyssImg, active:false},
        {name: 'Abyss', img: abyssImg, active:false},
        {name: 'Abyss', img: abyssImg, active:false},
        {name: 'Abyss', img: abyssImg, active:false},
        {name: 'Abyss', img: abyssImg, active:false}        
    ]

    let characterListItems = characterListData.map(({name, img, active}, index) => {
        return (
            <CharecterListItem name={name} img={img} active={active} key={index}/>
        )
    })


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

export default CharacterList;