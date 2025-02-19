import { useParams } from 'react-router-dom';
import {useEffect, useState, useContext} from 'react';
import BookmarksContext from "../BookmarksContext.jsx";
const Details = () => {
    const params = useParams();
    const [game, setGame] = useState(null);
    const { bookmarks, setBookmarks } = useContext(BookmarksContext);
    useEffect(() => {
        const apiKey = '554dcd406e9942af81436f1e34922610';
        const url = `https://api.rawg.io/api/games/${params.slug}?key=${apiKey}`;
        fetch(url)
            .then(response => response.json())
            .then(data => setGame(data))
            .catch(() => { alert('Une erreur est survenue') });
    }, [params.slug]);
    const toggleBookmark = (game) => {
        if (bookmarks.some(b => b.id === game.id)) {
            setBookmarks(bookmarks.filter(b => b.id !== game.id));
        } else {
            setBookmarks([...bookmarks, game]);
        }
    };
    return (
        <>
            {game ? (
                <div>
                    <h1 className="text-xl font-bold">{game.name}</h1>
                    <p dangerouslySetInnerHTML={{ __html: game.description }}></p>
                    <img src={game.background_image} alt="" className="w-200 m-auto mt-20"/>
                    <button onClick={() => toggleBookmark(game)}>{bookmarks.some(b => b.id === game.id) ? '★' : '☆'}</button>
                </div>
            ) : (
                <p>Chargement...</p>
            )}
        </>
    );
}
export default Details;