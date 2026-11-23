import { createContext, useContext, useState } from "react";

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  return (
    <WishlistContext.Provider value={{ wishlist, setWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}
