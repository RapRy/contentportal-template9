import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import { fetchData } from './redux/dataReducer'

import * as api from './api'

import Header from './components/Header/Header'
import Navigation from './components/Navigation/Navigation'
import Main from './components/Main/Main'
import Preview from './components/Preview/Preview'

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    try {
      const fetchInitial = async () => {
        const { data } = await api.fetchData('Games')
    
        dispatch(fetchData(data))
      }

      fetchInitial()

    } catch (error) {
      console.log(error)
    }

    
  }, [dispatch])

  return (
    <div>
      <Router>
        <Header />
        <Navigation />
        <Switch>
          <Route exact path="/">
            <Redirect to="/Category/Apps/Dating" />
          </Route>
          <Route exact path="/Category/:cat/:subcat">
            <Main />
          </Route>
          <Route exact path="/Content/:id">
            <Preview />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;