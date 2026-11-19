import { createContext, useContext, useState } from "react";

const KeranjangContext = createContext();

export const useKeranjang = () => useContext(KeranjangContext);

export function KeranjangProvider({ children }) {
  const [keranjang, setKeranjang] = useState([]);

  return (
    <KeranjangContext.Provider value={{ keranjang, setKeranjang }}>
      {children}
    </KeranjangContext.Provider>
  );
}
