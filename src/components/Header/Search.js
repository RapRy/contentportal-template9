const Search = () => {
    return (
        <div className="container grid grid-cols-1frAuto mx-auto">
            <input className="text-rubik rounded-tl-lg rounded-bl-lg py-2.5 px-5 text-sm font-medium text-black" type="text" name="search" placeholder="Search..." />
            <button className="text-rubik rounded-tr-lg rounded-br-lg py-2.5 px-3.5 text-sm font-medium text-black bg-gray-1 cursor-pointer" type="button">Search</button>
        </div>
    )
}

export default Search
