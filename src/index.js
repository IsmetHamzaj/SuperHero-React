import React from 'react'
import ReactDOM from 'react-dom';

import './index.css';




const HomeView = (results) => {

  const [hero, setHero] = React.useState({
    data: {},
    loading: true
  })
  
  const Click = async(search) => {
    const data = fetch(`https://www.superheroapi.com/api.php/10157652346894910/search/${search}`)
      .then((res) => {
        res.json()
      })
      .catch((err => {
        throw new Error('Failed to load heroes')
      }))
      setHero({
        results: data || [],
        loading: false
      })      
  }

  return(
    <div>
      <input placeholder="Movie Name" type="text" name="search"  />
      <button onClick={Click}>Search</button>
      <div>
        {
          hero.loading?'':
          hero.results.data.name
        }
      </div>
    </div>
  );
}


ReactDOM.render(
  <HomeView/>,
  document.getElementById('root')
);