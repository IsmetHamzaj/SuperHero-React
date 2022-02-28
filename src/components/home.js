import {useState, useEffect} from 'react'


export const HomeView = () => {
    const [search, setSearch] = useState("")
    const [heros, setHero] = useState()
    const [favoriteHero, setFavoriteHero] = useState([])
    const Click = async(event) => {
      event.preventDefault()
      fetch(`https://www.superheroapi.com/api.php/10157652346894910/search/${search}`)
        .then((res) => {
          res.json()
          .then((data) => {
            setHero(data.results);
          });
        })
        .catch((error) => {
          console.error(error.message)
        })
    }
  
    const LocalStorage = () => {
      localStorage.setItem("favorite", JSON.stringify(favoriteHero))
    }
    
    useEffect(() => {
      if(favoriteHero && favoriteHero.length) {
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
      if(getFavoriteFromLS) {
        getFavoriteFromLS = JSON.parse(getFavoriteFromLS)
        if(getFavoriteFromLS.length) {
          setFavoriteHero(getFavoriteFromLS)
        }
      }
    }, [])
    return(
      <div>
        <form onSubmit={(event) => Click(event)}>
        <input placeholder="Movie Name" type="text" onChange={(e) => {setSearch(e.target.value)}} value={search} />
        <button type="submit">Search</button>
        </form>
        <div>
          {heros &&
            heros.length &&
            heros.map((hero) => {
              return(
                <div key={hero.id}>
                  <h1 className="name">{hero.name}</h1>
                  <h1 className="full_name">{hero.biography[`full-name`]}</h1>
                  <h1 className="alignment">{hero.biography.alignment}</h1>
                  <h1 className="race">{hero.appearance.race}</h1>
                  <img src={hero.image.url} alt="" className="image" />
                  {favoriteHero.includes(hero.id)? (
                    <button style={{backgroundColor: 'white', color: 'white', border: 'none'}}>+</button>
                  ): (
                    <button onClick={() => {setFavoriteHero([...favoriteHero, hero.id])}}>+</button>
                  )}
                </div>
              )
          })}
        </div>
      </div>
    );
}