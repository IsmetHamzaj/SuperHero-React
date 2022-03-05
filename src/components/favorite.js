import {
    useState,
    useEffect
} from 'react'

import './favorite.css'


const removeItem = (oldFavs = [], id) => {
    const favoriteIds = JSON.parse(localStorage.getItem("favorite") || []);
    const newFavorites = favoriteIds.filter(fId => fId !== id)
    localStorage.setItem("favorite", JSON.stringify(newFavorites))

    return oldFavs.filter(fav => fav.id !== id)
}

export const FavoriteView = () => {
    const [favorites, setFavorites] = useState([]);
    const remove = (id) => {
        setFavorites(oldFavs => removeItem(oldFavs, id))
    }

    useEffect(() => {
        const favoriteIds = JSON.parse(localStorage.getItem("favorite") || []);

        favoriteIds.forEach(id => {
            fetch(`https://www.superheroapi.com/api.php/10157652346894910/${id}`)
                .then(res => res.json())
                .then(res => setFavorites(oldItems => ([res, ...oldItems]))
        )
    })
    }, [])

    return(
    <div className='parent'>
        <div>
            {favorites.map(hero =>(
                        <div key={hero.id} className='container'>
                            <img src={hero.image.url} alt="" className="image" />
                            <h1 className="name">{hero.name}</h1>
                            <h1>{hero.biography['full-name']}</h1>
                            <h1 className="alignment">{hero.biography.alignment}</h1>
                            <h1 className="race">{hero.appearance.race}</h1>
                            <button onClick={() => remove(hero.id)}>-</button>
                        </div>
                    )
                )}
        </div>
    </div>
    );
}


