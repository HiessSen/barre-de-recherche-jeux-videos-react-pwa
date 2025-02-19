import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import BookmarksContext from '../BookmarksContext';
const Home = () => {
    const [games, setGames] = React.useState([]);
    const [searchText, setSearchText] = React.useState('');
    const { bookmarks, setBookmarks } = useContext(BookmarksContext);
    const handleSearch = (e) => {
        e.preventDefault();
        const apiKey = '554dcd406e9942af81436f1e34922610'
        const url = `https://api.rawg.io/api/games?key=${apiKey}&search=${encodeURI(searchText)}`;
        fetch(url)
            .then( response => response.json())
            .then(data => setGames(data.results))
            .catch(() => {alert('Une erreur est survenue')})
    }
    const toggleBookmark = (game) => {
        if (bookmarks.some(b => b.id === game.id)) {
            setBookmarks(bookmarks.filter(b => b.id !== game.id));
        } else {
            setBookmarks([...bookmarks, game]);
        }
    };
    return (
        <> {/* Un fragment doit être ajouté pour ne retourner qu'un seul composant */}
            <form className="my-2 sm:w-full md:w-2/3 mx-auto flex px-2 text-2xl" onSubmit={handleSearch}>
                <input type="text" className="form-control border border-gray-200 pr-20" autoFocus={true} onInput={e=>{ setSearchText(e.target.value)}} value={searchText} placeholder='Rechercher' />
                <button type="submit" className="bg-blue-700 rounded-r text-white px-4 py-2">Rechercher</button>
            </form>
            <div className="flex justify-around">
                <Link className="bg-blue" to={'/bookmarks'}>Favoris</Link>
                <Link className="bg-blue" to={'/shop'}>Mes magasins</Link>
            </div>
            <ul className="sm:w-full md:w-2/3 mx-auto px-2 text-2xl">
                {games.map(game=>(
                    <li className="border-b border-gray-500" key={game.id}>
                        <Link to={`/details/${game.slug}`} className='flex py-2 px-4'>
                            <img src={game.background_image} alt="" className="w-24 pr-2"/>
                            <div className="text-2xl font-bold flex-grow">{game.name}</div>
                            <div>{game.rating}</div>
                        </Link>
                        <button onClick={() => toggleBookmark(game)}>{bookmarks.some(b => b.id === game.id) ? '★' : '☆'}</button>
                    </li>
                ))}
            </ul>
        </>
    )
}
export default Home;