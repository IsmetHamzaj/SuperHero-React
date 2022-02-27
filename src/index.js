import React from 'react'
import ReactDOM from 'react-dom';

import './index.css';




const HomeView = () => {
  const [search, setSearch] = React.useState("")
  const [hero, setHero] = React.useState()
  
  const Click = async(event, props) => {
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

  const Local = () => {

    const [item, setItem] = React.useState('')

    const data = fetch(`https://www.superheroapi.com/api.php/10157652346894910/644`)
      .then(res =>{ 
        res.json()
        .then(data => {
          setItem(data)
        })
      })

        localStorage.setItem('name', data)
        localStorage.setItem('full_name', data)
        localStorage.setItem('alignment',data)
        localStorage.setItem('race',data)
        localStorage.setItem('image',data)

  }
  
  return(
    <div>
      <input placeholder="Movie Name" type="text" onChange={(e) => {setSearch(e.target.value)}} value={search} />
      <button onClick={Click}>Search</button>
      <div>
        {hero &&
          hero.length &&
          hero.map((hero) => {
            return(
              <div key={hero.id}>
                <h1 className="name">{hero.name}</h1>
                <h1 className="full_name">{hero.biography[`full-name`]}</h1>
                <h1 className="alignment">{hero.biography.alignment}</h1>
                <h1 className="race">{hero.appearance.race}</h1>
                <img src={hero.image.url} alt="" className="image" />
                <button onClick={Local}>+</button>
              </div>
            )
        })}
      </div>
    </div>
  );
}


ReactDOM.render(
  <HomeView/>,
  document.getElementById('root')
);