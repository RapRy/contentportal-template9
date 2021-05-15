import { useSelector } from 'react-redux'

const Preview = () => {
    const { selectedContent } = useSelector(state => state.data)

    return (
        <div className="bg-white rounded-lg mx-5 py-5 relative overflow-hidden shadow-navShadow">
            <span className="font-rubik text-lightRed text-sm font-bold pr-5 pb-7 float-right cursor-pointer">Close</span>
            <div className="clear-right relative z-10 minHeight-144">
                <div className="absolute previewThumb rounded-lg shadow-contentShadow">
                    <img className="object-cover rounded-lg" src={selectedContent.thumbnail} />
                </div>
                <p className="font-rubik text-white text-base font-medium text-right absolute previewP">{selectedContent.name}</p>
            </div>
            <div className="w-9/12 h-full block bg-darkRed absolute top-0 left-0 z-0"></div>
        </div>
    )
}

export default Preview
