import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
    const _apiBase = "https://gateway.marvel.com:443/v1/public/",
          _apiKey =  "apikey=5598dfc923fad00d435cc55bf7bf3e8d",
          _baseOffset = 210;

    const {loading, error, request, clearError} = useHttp();

    const getAllCharacters = async (offset = _baseOffset) => {
        console.log("getAll");
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
       
    }
    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        console.log("getId");
        return _transformCharacter(res.data.results[0]);        
    }

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
            description: char.description,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    return {loading, error, getAllCharacters, getCharacter, clearError}
}

export default useMarvelService;