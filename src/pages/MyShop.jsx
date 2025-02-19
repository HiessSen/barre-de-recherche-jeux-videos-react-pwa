import React, { useState, useEffect } from "react";
import haversine from "../../libraries/haversine-distance-main/haversine";
const Shop = () => {
    const [shops, setShops] = useState([]);
    const [location, setLocation] = useState({ latitude: null, longitude: null });
    useEffect(() => {
        const url = `https://formacitron.github.io/shopslist/shops.json`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setShops(data); // Utilisez directement les données si elles sont un tableau de magasins
            })
            .catch(() => {
                alert("Une erreur est survenue");
            });
        navigator.geolocation.getCurrentPosition(
            (position) => {
                let latitude = position.coords.latitude;
                let longitude = position.coords.longitude;
                setLocation({ latitude, longitude });
            },
            (error) => {
                console.error("Erreur:", error);
            }
        );
    }, []); // Ajoutez un tableau de dépendances vide pour exécuter ce code une seule fois
    const sortedShops = shops
        .map(shop => ({
            ...shop,
            distance: haversine(
                { latitude: location.latitude, longitude: location.longitude },
                { latitude: shop.gps_lat, longitude: shop.gps_lng }
            )
        }))
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 10);
    return (
        <>
            <h1 className="text-xl font-bold">Mes magasins :</h1>
            <ul className="sm:w-full md:w-2/3 mx-auto px-2 text-2xl">
                {sortedShops.length > 0 ? (
                    sortedShops.map((shop, id) => (
                        <React.Fragment key={id}>
                            <li className="py-2 px-4 border-b border-gray-500">
                                <div className="flex justify-between">
                                    <p className="text-left w-50">Magasin n° {id + 1} : </p>
                                    <p>{shop.name}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p>Ville : {shop.city}</p>
                                    <p>Distance : {(shop.distance/1000).toFixed(2)} km</p>
                                </div>
                            </li>
                        </React.Fragment>
                    ))
                ) : (
                    <li className="py-2 px-4 border-b border-gray-500">Aucun magasin trouvé</li>
                )}
            </ul>
        </>
    );
};
export default Shop;