import {
    HomeView
} from "./components/home"
import {
    FavoriteView
} from "./components/favorite"
import {
    Route,
    Routes
} from 'react-router-dom'


function App() {
    return(
        <div>
            <ul style={{display: 'flex', justifyContent: 'center', justifyContent: "space-between", listStyle: 'none'}}>
                <li>
                    <a href="/" style={{textDecoration: 'none', color: 'black'}}>Home</a>
                </li>
                <li>
                    <a href="/favorite" style={{textDecoration: 'none', color: 'black', listStyle: 'none'}}>Favorite</a>
                </li>
            </ul>
        <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/favorite" element={<FavoriteView />} />
        </Routes>
        </div>
    )
}

export default App
