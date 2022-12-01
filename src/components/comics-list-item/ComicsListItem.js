import './comics-list-item.scss'

const ComicsListItem = (props) => {
    let {name, price, img, href} = props;
    return (
        <li className="comics__item">
            <a href={href}>
                <img src={img} alt={name} className="comics__item-img"/>
                <div className="comics__item-name">{name}</div>
                <div className="comics__item-price">{price?`${price}$`:"NOT AVAILABLE"}</div>
            </a>
        </li>
    )
}

export default ComicsListItem;