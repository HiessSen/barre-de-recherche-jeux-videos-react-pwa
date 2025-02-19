import './App.css';
import Home from './pages/Home';
import {useEffect, useState, useRef} from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorMessage from './pages/ErrorMessage';
import Details from './pages/Details';
import BookmarksContext  from "./BookmarksContext.jsx";
import Bookmarks from "./pages/Bookmarks.jsx";
import MyShop from "./pages/MyShop.jsx";
function App() {
  // Je gère l'affichage du bouton d'installation
  const [canInstall, setCanInstall] = useState(false);
  // Réference pour stocker l'évenement d'installation
  const deferredPrompt = useRef(null);
  useEffect(() => {
    // Fonction appelée quand l'application peut être installée
    const handleBeforeInstallPrompt = (e) => {
      // Empêche l'affichage automatique du prompt
      e.preventDefault();
      // Stocke l'événement pour une utilisation ultérieure
      deferredPrompt.current = e;
      // Affiche notre bouton d'installation
      setCanInstall(true)
    };
    // Écoute l'événement d'installation
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    // Nettoyage à la destruction du composant
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);
  // Fonction appelée quand l'utilisateur clique sur le bouton d'installation
  const handleInstallClick = async () => {
    if (!deferredPrompt.current) {
      return;
    }
    // Affiche le prompt d'installation natif
    const result = await deferredPrompt.current.prompt();
    console.log(`Installation ${result.outcome}`);
    // Réinitialise l'état
    deferredPrompt.current = null;
    setCanInstall(false)
  };
  const [bookmarks, setBookmarks] = useState(() => {
    const savedBookmarks = localStorage.getItem('bookmarks');
    return savedBookmarks ? JSON.parse(savedBookmarks) : [];
  });
  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
  }, [bookmarks])
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <ErrorMessage />
    },
    {
      path: "details/:slug",
      element: <Details />
    },

    {
      path: "/bookmarks",
      element: <Bookmarks />
    },
    {
      path: "/shop",
      element: <MyShop />
    },
  ], { basename: "/barre-de-recherche-jeux-videos-react-pwa" })
  return (
      <BookmarksContext.Provider value={{ bookmarks, setBookmarks }}>
        {/* Affiche le bouton d'installation si disponible */}
        {canInstall && (
            <div className="bg-gray-300 shadow-gray-700 p-4 flex items-center">
              <div className="flex-grow text-center">
                Voulez-vous installer l'application sur votre appareil ?
              </div>
              <button
                  className="px-4 py-2 rounded text-white bg-teal-600"
                  onClick={handleInstallClick}
              >
                Installer
              </button>
            </div>
        )}
        <RouterProvider router={router} />
      </BookmarksContext.Provider>
  );
}
export default App;