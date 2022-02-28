import React, {
    useState,
    useEffect
} from 'react'

export const FavoriteView = () => {
    const [heros, setHero] = useState()
    const [favoriteHero, setFavoriteHero] = useState([])
    const LocalStorage = () => {
        localStorage.setItem("favorite", JSON.stringify(favoriteHero))
    }

    useEffect(() => {
        if (favoriteHero && favoriteHero.length) {
            LocalStorage()
        }
    }, [favoriteHero])

    const Remove = (id) => {
        let getHero = [...favoriteHero]
        let getHeroIndex = getHero.indexOf(id)
        getHero.splice(getHeroIndex, 1)
        setFavoriteHero(getHero)
    }
    useEffect(() => {
        let getFavoriteFromLS = localStorage.getItem("favorite")
        if (getFavoriteFromLS) {
            getFavoriteFromLS = JSON.parse(getFavoriteFromLS)
            if (getFavoriteFromLS.length) {
                setFavoriteHero(getFavoriteFromLS)
            }
        }
    }, [])
    return(
        <div>
            {favoriteHero &&
                favoriteHero.length &&
                    favoriteHero.map(hero => {
                        return (
                            <div>
                                <h1>{hero}</h1>
                                {favoriteHero.includes(hero)? (
                                <button onClick={() => Remove(hero.id)}>-</button>
                                ): (
                                    <h1>No favorites to show</h1>
                                )
                                }
                            </div>
                            
                        )
                    })   
                         
            }    
        </div>
    )
}