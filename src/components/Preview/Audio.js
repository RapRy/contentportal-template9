const Audio = ({ audioFile }) => {
    return (
        <div className="relative z-10 pt-7 px-5">
            <span className="float-right text-white text-sm font-rubik customMarginRight spanAfter">Audio Preview</span>
            <div className="clear-right mt-12 bg-audioBg rounded-md shadow-contentShadow ">
                <audio className="w-full" preload="metadata" controlsList="nodownload" disablePictureInPicture controls>
                    <source src={audioFile} type="video/mp4" />
                </audio>
            </div>
        </div>
    )
}

export default Audio
