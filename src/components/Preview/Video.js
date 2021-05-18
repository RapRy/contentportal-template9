const Media = ({ videoFile }) => {
    return (
        <div className="relative z-10 pt-7 px-5">
            <span className="float-right text-white text-sm font-rubik customMarginRight spanAfter">Video Preview</span>
            <div className="clear-right pt-5">
                <video className="rounded-md shadow-contentShadow max-w-full" preload="metadata" controlsList="nodownload" disablePictureInPicture controls>
                    <source src={videoFile} type="video/mp4" />
                </video>
            </div>
        </div>
    )
}

export default Media
