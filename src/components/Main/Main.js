import { useSelector, useDispatch } from 'react-redux'

import * as api from '../../api'
import { fetchDetails } from '../../redux/dataReducer'

const Main = () => {
    const { contents } = useSelector(state => state.data)
    const dispatch = useDispatch()

    const showDetails = async (id) => {
        const { data } = await api.fetchDetails(id)

        dispatch(fetchDetails(data))
    }

    return (
        <div className="bg-white pt-16">
            <div className="grid grid-cols-3 gap-5 px-5 pb-8 relative mx-auto">
                {
                    contents.map((content, i) => (
                        <div key={content._id} className="relative pt-5" onClick={() => showDetails(content._id)}>
                            <div className="contThumb absolute left-1/2 top-0 transform -translate-x-1/2 shadow-contentShadow rounded-lg cursor-pointer">
                                <img className="contThumb object-cover rounded-lg" src={content.thumbnail} alt={content.name} />
                            </div>  
                            <div className="px-2 pb-2 pt-16 5 h-full bg-white rounded-lg shadow-contentShadow">
                                <button className="font-rubik font-normal text-white bg-lightRed py-1 px-2.5 rounded-md text-sm block mb-2.5 mx-auto">Download</button>
                                <p className="font-rubik font-medium text-sm text-center">{content.name}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Main
