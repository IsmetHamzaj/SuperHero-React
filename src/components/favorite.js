import {
    useState,
    useEffect
} from 'react'


export const FavoriteView = () => {
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
      return(
        <div>
          <div>
            {favoriteHero &&
              favoriteHero.length &&
              favoriteHero.map((hero) => {
                return(
                  <div key={hero}>
                    <h1 className="name">{hero}</h1>
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