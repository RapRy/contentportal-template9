import axios from 'axios'

const url = 'http://localhost:5000/template9'

export const fetchData = (cat) => axios.get(`${url}/categories/${cat}`)
export const updateContentsViaCat = (cat) => axios.get(`${url}/contents/${cat}`)