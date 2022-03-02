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
    // useEffect(() => {
    //     let getFavoriteFromLS = localStorage.getItem("favorite")
    //     if (getFavoriteFromLS) {
    //         getFavoriteFromLS = JSON.parse(getFavoriteFromLS)
    //         if (getFavoriteFromLS.length) {
    //             setFavoriteHero(getFavoriteFromLS)
    //         }
    //     }
    // }, [])
    useEffect(() => {
        let getId = JSON.parse(localStorage.getItem("favorite"));
        (async () => {
          const heros = [];
          for await (const id of getId) {
            await (async () => {
              const response = await fetch(`https://www.superheroapi.com/api.php/10157652346894910/${id}`);
              const data = await response.json();
              heros.push(data);
            })();
          }
          setFavoriteHero(heros);
        })();
      }, []);

    return(
    <div>
        <div>
            {favoriteHero &&
                //favoriteHero.length &&
                    favoriteHero.map((hero) => {
                    return(
                        <div key={hero.id}>
                            <h1 className="name">{hero.name}</h1>
                            <h1 className="full_name">{hero.biography[`full-name`]}</h1>
                            <h1 className="alignment">{hero.biography.alignment}</h1>
                            <h1 className="race">{hero.appearance.race}</h1>
                            <img src={hero.image.url} alt="" className="image" />

                            {/* {favoriteHero.includes(hero.id)? (
                                <button style={{backgroundColor: 'white', color: 'white', border: 'none'}}>-</button>
                            ): (
                                <button onClick={() => {Remove(hero.id)}}>-</button>
                            )} */}
                        </div>
                    )
                })}
        </div>
    </div>
    );
}