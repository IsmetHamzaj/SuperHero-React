import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import "./index.css";

const HomeView = () => {
  const [search, setSearch] = useState("");
  const [heros, setHeros] = useState();
  const [favoriteHeros, setFavoriteHeros] = useState([]);

  const Click = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`https://www.superheroapi.com/api.php/10157652346894910/search/${search}`);
      const data = await response.json();
      setHeros(data.results);
    } catch (error) {
      console.error(error.message);
    }
  };

  const rujeNeLocalStorage = () => {
    localStorage.setItem("favorite", JSON.stringify(favoriteHeros));
  };

  const fshije = (id) => {
    let copy = [...favoriteHeros];
    let index = copy.indexOf(id);
    copy.splice(index, 1);
    setFavoriteHeros(copy);
  };

  useEffect(() => {
    if (favoriteHeros && favoriteHeros.length) {
      rujeNeLocalStorage();
    }
    // eslint-disable-next-line
  }, [favoriteHeros]);

  useEffect(() => {
    let localFavorite = localStorage.getItem("favorite");
    if (localFavorite) {
      localFavorite = JSON.parse(localFavorite);
      if (localFavorite.length) {
        setFavoriteHeros(localFavorite);
      }
    }
  }, []);

  return (
    <div>
      <form onSubmit={(event) => Click(event)}>
        <input
          placeholder="Movie Name"
          type="text"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          value={search}
        />

        <button type="submit">Search</button>
      </form>
      <div>
        {heros &&
          heros.length &&
          heros.map((hero) => {
            return (
              <div key={hero.id} className="hero">
                <h1 className="name">{hero.name}</h1>
                <h1 className="full_name">{hero.biography[`full-name`]}</h1>
                <h1 className="alignment">{hero.biography.alignment}</h1>
                <h1 className="race">{hero.appearance.race}</h1>
                <img src={hero.image.url} alt="" className="image" />
                {favoriteHeros.includes(hero.id) ? (
                  <button onClick={() => fshije(hero.id)}>-</button>
                ) : (
                  <button onClick={() => setFavoriteHeros([...favoriteHeros, hero.id])}>+</button>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

ReactDOM.render(<HomeView />, document.getElementById("root"));
