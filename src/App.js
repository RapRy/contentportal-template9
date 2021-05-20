import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import _ from 'lodash'

import { fetchData } from './redux/dataReducer'

import * as api from './api'

import Header from './components/Header/Header'
import Navigation from './components/Navigation/Navigation'
import Main from './components/Main/Main'
import Preview from './components/Preview/Preview'

function App() {

  const dispatch = useDispatch()
  const [test, set] = useState({})

  useEffect(() => {
    try {
      const fetchInitial = async () => {
        const { data } = await api.fetchData('Apps')

        set(data.activeCat)
    
        dispatch(fetchData(data))
      }

      fetchInitial()
    } catch (error) {
      console.log(error)
    }

    
  }, [dispatch])

  return (
    !_.isEmpty(test) &&
      <div>
        <Router>
          <Header />
          <Navigation />
          <Switch>
            <Route exact path="/">
              <Redirect to={`/Category/${test.catName}/${test.subCategories[0].subCatName}`} />
            </Route>
            <Route exact path="/Category/:cat/:subcat">
              <Main />
            </Route>
            <Route exact path="/Content/:id">
              <Preview />
            </Route>
            <Route exact path="/Search/:search">
              <Main />
            </Route>
          </Switch>
        </Router>
      </div>
  );
}

export default App;