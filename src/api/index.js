import axios from 'axios'

// const url = 'https://port-template-1.herokuapp.com/template9'
// const url = 'http://localhost:5000';
const url = 'https://downloadstoreportal.herokuapp.com'

export const fetchData = () => axios.get(`${url}/categories`)
// export const updateContentsViaCat = (cat, subcat) => axios.get(`${url}/contents/${cat}/${subcat}`)
export const updateContentsViaSubcat = (subcat, cat) => axios.get(`${url}/contents/${cat}/${subcat}`)
export const fetchDetails = (id) => axios.get(`${url}/contents/details/${id}`)
export const searchResult = (val) => axios.get(`${url}/contents/search?keyword=${val}&key=name`)