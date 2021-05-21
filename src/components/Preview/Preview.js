import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, Link } from 'react-router-dom'

import * as api from '../../api'
import { updateDetails } from '../../redux/dataReducer'

import Screenshots from './Screenshots'
import Video from './Video'
import Audio from './Audio'

import videoFile from '../../assets/video.mp4'
import audioFile from '../../assets/music.mp3'

const Preview = () => {
    const { selectedContent } = useSelector(state => state.data)
    const dispatch = useDispatch()
    const { id } = useParams()

    useEffect(() => {

        try {
            const showDetails = async (id) => {
                const { data } = await api.fetchDetails(id)
        
                dispatch(updateDetails(data))
            }

            showDetails(id)
        } catch (error) {
            console.log(error)
        }
    
    }, [id])

    return (
            <div className="bg-white rounded-lg mx-5 lg:mx-auto py-5 relative overflow-hidden shadow-navShadow my-16 sm:mt-28 max-w-screen-md">
                <Link onClick={() => dispatch(updateDetails({}))} to={`/Category/${selectedContent.catName}/${selectedContent.subCatName}`} className="font-rubik text-lightRed text-sm font-bold pr-5 pb-7 float-right cursor-pointer">Close</Link>
                <div className="clear-right relative z-10 minHeight-144">
                    <div className="absolute previewThumb rounded-lg shadow-contentShadow">
                        <img className="object-cover rounded-lg" src={selectedContent.thumbnail} alt={selectedContent.name} />
                    </div>
                    <p className="font-rubik text-white text-base font-medium text-right absolute previewP">{selectedContent.name}</p>
                    <button className="bg-gradient-to-tl from-yellow to-orange rounded-md py-2.5 px-5 font-rubik text-base text-white font-medium absolute bottom-0 customRight">Download</button>
                </div>
                <div className="relative z-10 pt-9 px-5">
                    <span className="float-right text-white text-sm font-rubik customMarginRight spanAfter">Description</span>
                    <div className="clear-right pt-5 customMarginRight">
                        <p className="font-rubik text-justify text-white text-sm">{selectedContent.description}</p>
                    </div>
                </div>
                { selectedContent.filename === "apk" && <Screenshots images={selectedContent.screenshots} /> }
                { selectedContent.filename === "mp4" && <Video videoFile={videoFile} /> }
                { selectedContent.filename === "mp3" && <Audio audioFile={audioFile} /> }
                <div className="w-9/12 h-full block bg-darkRed absolute top-0 left-0 z-0"></div>
            </div>
    )
}

export default Preview
