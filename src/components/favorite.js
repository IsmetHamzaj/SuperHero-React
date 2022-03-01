import {
    useState,
    useEffect
} from 'react'


export const FavoriteView = async () => {
    const [favoriteHero, setFavoriteHero] = useState([])
    const Remove = (id) => {
        let getHero = [...favoriteHero]
        let getHeroIndex = getHero.indexOf(id)
        getHero.splice(getHeroIndex, 1)
        setFavoriteHero(getHero)
    }
    const LocalStorage = () => {
        localStorage.setItem("favorite", JSON.stringify(favoriteHero))
    }
    useEffect(() => {
        if (favoriteHero && favoriteHero.length) {
            LocalStorage()
        }
    }, [favoriteHero])
    useEffect(() => {
        let getFavoriteFromLS = localStorage.getItem("favorite")
        if (getFavoriteFromLS) {
            getFavoriteFromLS = JSON.parse(getFavoriteFromLS)
            if (getFavoriteFromLS.length) {
                setFavoriteHero(getFavoriteFromLS)
            }
        }
    }, [])
    useEffect(() => {
            let getId = JSON.parse(localStorage.getItem("favorite"))
            // console.log(getId)
            let heroes = []
            for (const id of getId) {
                let response = fetch(`https://www.superheroapi.com/api.php/10157652346894910/${id}`)
                console.log(response)
                const data = response.json()
                setFavoriteHero(heroes.push(data))
            }
            
    }, [])
    console.log(favoriteHero)
    return(
    <div>
        <div>
            {favoriteHero  &&
                favoriteHero.length &&
                favoriteHero.map((hero) => {
                    return(
                        <div key={hero}>
                            <h1 className="name">{hero.id}</h1>
                            {favoriteHero.includes(hero.id)? (
                                <button style={{backgroundColor: 'white', color: 'white', border: 'none'}}>-</button>
                            ): (
                                <button onClick={() => {Remove(hero.id)}}>-</button>
                            )}
                        </div>
                    )
                })}
        </div>
    </div>
    );
}