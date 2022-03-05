import {useState, useEffect} from 'react'
import './home.css';

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
  
    useEffect(() => {
      if(favoriteHero && favoriteHero.length) {
        localStorage.setItem("favorite", JSON.stringify(favoriteHero))
      }
    }, [favoriteHero])

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
      <div className='parent'>
        <form className='form' onSubmit={(event) => Click(event)}>
        <input placeholder="Movie Name" type="text" className='searchInput' onChange={(e) => {setSearch(e.target.value)}} value={search} />
        <button type="submit" className='searchBtn'>Search</button>
        </form>
        <div>
          {heros &&
            heros.length &&
            heros.map((hero) => {
              return(
                <div key={hero.id} className='container'>
                  <img src={hero.image.url} alt="" className="image" />
                  <h1 className="name">{hero.name}</h1>
                  <h1 className="full_name">{hero.biography[`full-name`]}</h1>
                  <h1 className="alignment">{hero.biography.alignment}</h1>
                  <h1 className="race">{hero.appearance.race}</h1>
                  {favoriteHero.includes(hero.id)? (
                    null
                  ): (
                    <button onClick={() => {setFavoriteHero([ hero.id, ...favoriteHero])}}>+</button>
                  )}
                </div>
              )
          })}
        </div>
      </div>
    );
}