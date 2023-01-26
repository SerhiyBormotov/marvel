import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
    const _apiBase = "https://gateway.marvel.com:443/v1/public/",
          _apiKey =  "apikey=5598dfc923fad00d435cc55bf7bf3e8d",
          _baseCharOffset = 210,
          _baseComicsOffset = 20

    const {loading, error, request, clearError} = useHttp();

    const getAllCharacters = async (offset = _baseCharOffset) => {
      //  console.log("getAll");
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
       
    }
    const getAllComics = async (offset = _baseComicsOffset) => {
       // console.log("getAllComics");
        const res = await request(`${_apiBase}comics?noVariants=true&limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComic);       
    }
    const getComic = async (id) => {
       // console.log("getComic");
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComic(res.data.results[0]);       
    }
    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
       // console.log("getId");
        return _transformCharacter(res.data.results[0]);        
    }
    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
       // console.log("getName");
       if (res.data.results.length === 0) {
        return { id: null}
       } else {
        return _transformCharacter(res.data.results[0]);
       }        
    }

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
            description: char.description || 'There is no description for the Character',
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    const _transformComic = (comic) => {
        return {
            id: comic.id,
            name: comic.title,
            thumbnail: comic.thumbnail.path + "." + comic.thumbnail.extension,
            description: comic.description || 'There is no description for the Comic',
            pageCount: comic.pageCount || 0,
            price: comic.prices[0].price ? (comic.prices[0].price + '$') : ("Not available")
        }
    }

    return {loading,
            error, 
            getAllCharacters, 
            getCharacter, 
            getAllComics, 
            getComic, 
            getCharacterByName, 
            clearError};
}

export default useMarvelService;