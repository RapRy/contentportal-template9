const Screenshots = ({ images }) => {
    return (
        <div className="relative z-10 pt-7 px-5">
            <span className="float-right text-white text-sm font-rubik customMarginRight spanAfter">Screenshots</span>
            <div className="clear-right pt-5 overflow-x-hidden whitespace-nowrap cur">
                {
                    images.map((image, i) => <img className="w-11/12 inline-block mr-3 last:mr-0" key={i} src={image} alt={`screenshot-${i + 1}`} />)
                }
            </div>
            <div className="w-9/12 pr-2.5 pt-2">
                <input className="customScrollbar" type="range" min="0" max="" value="0" step="1"/>
            </div>
        </div>
    )
}

export default Screenshots