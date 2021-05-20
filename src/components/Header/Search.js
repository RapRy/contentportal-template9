import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import * as api from '../../api'
import { updateContents } from '../../redux/dataReducer'

const Search = () => {

    const [inputVal, setVal] = useState("")

    const dispatch = useDispatch()

    const history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { data } = await api.searchResult(inputVal)

        dispatch(updateContents(data))

        history.push(`/Search/${inputVal}`)
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="max-w-screen-sm grid grid-cols-1frAuto mx-auto">
                    <input onChange={(e) => setVal(e.target.value)} className="text-rubik rounded-tl-lg rounded-bl-lg py-2.5 px-5 text-sm font-medium text-black" type="text" name="search" placeholder="Search..." required />
                    <button className="text-rubik rounded-tr-lg rounded-br-lg py-2.5 px-3.5 text-sm font-medium text-black bg-gray-1 cursor-pointer" type="submit">Search</button>
            </div>
        </form>
    )
}

export default Search
