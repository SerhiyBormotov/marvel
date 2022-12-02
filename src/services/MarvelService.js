class MarvelService {
    _apiBase = "https://gateway.marvel.com:443/v1/public/";
    _apiKey =  "apikey=5598dfc923fad00d435cc55bf7bf3e8d";
    _baseOffset = 210;

    getData = async (url) => {
        const result = await fetch(url);
        if (!result.ok) {
            throw new Error(`Could not fetch with ${url}. Status: ${result.status} `);
        }
        return await result.json();
    }

    getAllCharacters = async (offset = this._baseOffset) => {
        const res = await this.getData(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter);
       
    }
    getCharacter = async (id) => {
        const res = await this.getData(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);        
    }

    _transformCharacter = (char) => {
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
}

export default MarvelService;