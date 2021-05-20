import axios from 'axios'

const url = 'http://localhost:5000/template9'

export const fetchData = (cat) => axios.get(`${url}/categories/${cat}`)
export const updateContentsViaCat = (cat, subcat) => axios.get(`${url}/contents/${cat}/${subcat}`)
export const updateContentsViaSubcat = (subcat, cat) => axios.get(`${url}/contents/${cat}/${subcat}`)
export const fetchDetails = (id) => axios.get(`${url}/contents/details/${id}`)
export const searchResult = (val) => axios.get(`${url}/contents/search/${val}`)