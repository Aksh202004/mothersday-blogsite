import React, { useState, createContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import InstagramSection from '../InstagramSection/InstagramSection';
import MobileMenu from '../MobileMenu/MobileMenu';
import './Layout.css';

// Create a context for search state
export const SearchContext = createContext({
  searchQuery: '',
});

const Layout = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const clearSearchQuery = () => {
    setSearchQuery('');
  };

  const toggleMobileMenu = () => {
    setIsMenuOpen(prevIsOpen => {
      const nextIsOpen = !prevIsOpen;
      // Optional: Prevent/Restore body scroll when menu state changes
      document.body.style.overflow = nextIsOpen ? 'hidden' : '';
      return nextIsOpen;
    });
  };

   const closeMobileMenu = () => {
     if (isMenuOpen) { // Only act if menu is currently open
       setIsMenuOpen(false);
       document.body.style.overflow = '';
     }
   };

  // Scroll to top on route change
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    // Provide the search query value to the context
    <SearchContext.Provider value={{ searchQuery }}>
      <div className="layout">
        <Header
          searchQuery={searchQuery}
          onSearchQueryChange={handleSearchQueryChange}
          onClearSearch={clearSearchQuery}
          onMenuClick={toggleMobileMenu}
          isMenuOpen={isMenuOpen}
        />
        {/* Remove 'container' class from main to allow full-width sections */}
        <main className="main-content">
           {/* Render children directly, they will consume the context */}
           {children}
         </main>
         {/* Render InstagramSection before Footer on all pages */}
         <InstagramSection />
         <Footer />
       </div>
       {/* Render Mobile Menu outside the main layout div, pass close handler */}
       <MobileMenu isOpen={isMenuOpen} onClose={closeMobileMenu} />
    </SearchContext.Provider>
  );
};

export default Layout;
