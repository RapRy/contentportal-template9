import Search from './Search'

const Header = () => {
    return (
        <div className="bg-gradient-to-r from-darkRed to-lightRed px-5 pt-7 pb-12">
            <h1 className="text-4xl font-medium font-rubik text-center pb-5 text-white">Powerland</h1>
            <Search />
        </div>
    )
}

export default Header
