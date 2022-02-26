import React from 'react'
import ReactDOM from 'react-dom';

import './index.css';




const HomeView = (results) => {

  const [hero, setHero] = React.useState({
    data: []
  })
  
  const Click = async(search) => {
    const data = fetch(`https://www.superheroapi.com/api.php/10157652346894910/search/${search}`)
      .then((res) => {
        res.json()
      })
      .then((data) => {
        setHero({
          data
        })
      })
  }

  
  return(
    <div>
      <input placeholder="Movie Name" type="text" name="search"  />
      <button onClick={Click}>Search</button>
      <div>
        {
          hero.map((heroes) => {
            return(
              <h1>{heroes.name}</h1>
            )
          })
        }
      </div>
    </div>
  );
}


ReactDOM.render(
  <HomeView/>,
  document.getElementById('root')
);