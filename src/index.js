import React from 'react'
import ReactDOM from 'react-dom';

import './index.css';




const HomeView = (results, search) => {

  const [hero, setHero] = React.useState({
    data: {},
    loading: true
  })
  
  const Click = (search) => {
    const data = fetch(`https://www.superheroapi.com/api.php/10157652346894910/search/${search}`)
      .then((res) => {
        res.json()
      })
      .catch((err => {
        throw new Error('Failed to load heroes')
      }))
      setHero({
        results: data || [],
        loading: false,
        search: search || ''
      })
      
  }

  return(
    <div>
      <input placeholder="Movie Name" type="text" name="search" defaultValue={search} />
      <button onClick={Click}>Search</button>
      <div>
        {
          hero.loading?'':
          hero.results.name
        }
      </div>
    </div>
  );
}


ReactDOM.render(
  <HomeView/>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals