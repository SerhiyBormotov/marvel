import './comics-list.scss';
import ComicsListItem from '../comics-list-item/ComicsListItem';
import xmenImg from '../../resources/img/x-men.png';

const ComicsList = () => {

    const comicsListData = [
        {name: 'ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB', price: 9.99, img: xmenImg, href: "#"},
        {name: 'ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB', price: "", img: xmenImg, href: "#"},
        {name: 'ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB', price: 9.99, img: xmenImg, href: "#"},
        {name: 'ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB', price: 9.99, img: xmenImg, href: "#"},
        {name: 'ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB', price: 9.99, img: xmenImg, href: "#"},
        {name: 'ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB', price: 9.99, img: xmenImg, href: "#"},
        {name: 'ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB', price: 9.99, img: xmenImg, href: "#"},
        {name: 'ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB', price: 9.99, img: xmenImg, href: "#"}
    ]

    const comicsListItems = comicsListData.map((item) => {
        return (
            <ComicsListItem {...item}/>
        )
    })
    return (
        <div className="comics__list">
            <ul className="comics__grid">
                {comicsListItems}
            </ul>
            <button className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;