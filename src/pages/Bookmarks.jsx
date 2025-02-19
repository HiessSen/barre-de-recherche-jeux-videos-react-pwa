import React, { useContext } from "react";
import BookmarksContext from "../BookmarksContext";
const Bookmarks = () => {
    const { bookmarks, setBookmarks} = useContext(BookmarksContext);
    const deleteBookmarks = (index) => {
        const tmpBookmarks = [...bookmarks];
        tmpBookmarks.splice(index,1);
        setBookmarks(tmpBookmarks);
    }
    return (
        <>
            <h1 className="text-xl font-bold">Mes favoris :</h1>
            <ul className={"sm:w-full md:w-2/3 mx-auto px-2 text-2xl"}>
                {bookmarks.map((bookmark, index) => (
                    <li className="py-2 px-4 border-b boreder-gray-500" key={index}>
                        <img src={bookmark.background_image} alt="" className="w-24 pr-2"/>
                        {bookmark.name}
                        <button onClick={() => { deleteBookmarks(index) }}>🗑</button>
                    </li>
                ))}
            </ul>
        </>
    )
}
export default Bookmarks;