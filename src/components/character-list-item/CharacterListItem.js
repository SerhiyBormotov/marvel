import './character-list-item.scss';

const CharecterListItem = (props) => {
    const {img, name, active} = props;
    const activeClass = ' char__item_selected';
    return(
    <li className={`char__item${active?activeClass:""}`}>
        <img src={img} alt={name}/>
        <div className="char__name">{name}</div>
    </li>
    )
}
export default CharecterListItem;