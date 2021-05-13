import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { fetchData } from './redux/dataReducer'

import * as api from './api'

import Header from './components/Header/Header'
import Navigation from './components/Navigation/Navigation'
import Main from './components/Main/Main'

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
      <Header />
      <Navigation />
      <Main />
    </div>
  );
}

export default App;