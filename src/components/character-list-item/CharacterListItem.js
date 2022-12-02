import './character-list-item.scss';

const CharecterListItem = (props) => {
    const {thumbnail, name, id, onCharUpdate} = props;
    return(
    <li 
    className="char__item"
    onClick={(e) => onCharUpdate(e.currentTarget, id)}>
        <img src={thumbnail} alt={name}/>
        <div className="char__name">{name}</div>
    </li>
    )
}
export default CharecterListItem;