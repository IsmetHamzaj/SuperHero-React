import ReactDOM from 'react-dom';
import './index.css';

export async function webApi(context) {
  const search = context.query.search;
  let superHeros = {}

  if(search) {
    superHeros = await fetch(`https://www.superheroapi.com/api.php/10157652346894910/search/${search}`)
      .then(res => res.json())
      .catch((err) => {
        throw new Error('Failed to load heroes')
      })
  }
  console.log('super heroes results:', superHeros.results)
  return {
    props: {
      error: superHeros.error || null,
      results: superHeros.results || [],
      search: search || ''
    }
  }
}



const HomeView = ({error, results, search}) => {
  return(
    <div>
      <div>
        <div>
          <form>
            <input type="text" placeholder="Movie-Name" name="search" defaultValue={search} />
            <button type="submit">Search</button>
          </form>
        </div>
        <div>
          {
              results > 0
                ? (
                  <ul>
                    {results.map(hero => (
                      <li key={hero.id}>
                        <div>
                          <img src={hero.image.url} alt="superhero"/>
                          <button value={hero.id}>+</button>
                        </div>
                        <div>
                            <div className='heroname'>{hero.name}</div>
                            <div className='fullName'>{hero.biography['full-name']}</div>
                            <div className='alignment'>{hero.biography.alignment}</div>
                            <div className='race'>{hero.appearance.race}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )
                : <div>{error || 'Search your favorite'}</div>
          }
        </div>
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