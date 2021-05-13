import axios from 'axios'

const url = 'http://localhost:5000'

export const fetchData = (cat) => axios.get(`${url}/categories/${cat}`)