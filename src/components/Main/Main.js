import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, Link } from 'react-router-dom'

import * as api from '../../api'
import { updateDetails, updateContents } from '../../redux/dataReducer'

const Main = () => {
    const { contents } = useSelector(state => state.data)
    const dispatch = useDispatch()

    const { cat, subcat, search } = useParams()

    const showDetails = async (id) => {
        const { data } = await api.fetchDetails(id)

        dispatch(updateDetails(data))
    }

    useEffect(() => {        
        try {

            const updateContentList = async (subcat, cat, search) => {
                if(search !== undefined){
                    const { data } = await api.searchResult(search)
                    dispatch(updateContents(data))
                }else{
                    const { data } = await api.updateContentsViaSubcat(subcat, cat)
                    dispatch(updateContents(data))
                }

            }

            if(search !== undefined){
                updateContentList(undefined, undefined, search)
            }else{
                updateContentList(subcat, cat, undefined)
            }

        } catch (error) {
            console.log(error)
        }
        
    }, [cat, subcat, search, dispatch])

    return (
        <div className="bg-white pt-16 sm:pt-28">
            {
                (contents.length > 0) ?
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-5 px-5 pb-8 relative mx-auto">
                        {
                            contents.map((content, i) => (
                                <div className="relative pt-5" key={content._id}>
                                    <Link to={`/Content/${content._id}`}>
                                        <div onClick={() => showDetails(content._id)} className="contThumb absolute left-1/2 top-0 transform -translate-x-1/2 shadow-contentShadow rounded-lg cursor-pointer">
                                            <img className="contThumb object-cover rounded-lg" src={content.thumbnail} alt={content.name} />
                                        </div>  
                                    </Link>
                                    <div className="px-3 pb-3 pt-16 5 h-full bg-white rounded-lg shadow-contentShadow">
                                        <button className="font-rubik font-normal text-white bg-lightRed py-1 px-2.5 rounded-md text-sm block mb-2.5 mx-auto">Download</button>
                                        <p className="font-rubik font-medium text-sm text-center">{content.name}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    :   
                    <h1 className="font-rubik text-black text-center font-bold text-xl">
                        { (search !== undefined) ? `No result for "${search}"` : `No content available for ${subcat}` }
                    </h1>
            }
            
        </div>
    )
}

export default Main
