import HomeView from "./components/home"
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'


const App = () => {
    return(
        <Router>
        <div>
            
            <div>
            <HomeView />
            <Routes>
                <Route path="/">
                    <HomeView />
                </Route>
            </Routes>
            </div>
        </div>
        </Router>
    )
}

export default App
