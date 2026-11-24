import { createContext, useContext, useState } from "react";
import DaftarNotifikasi from "../components/DaftarNotifikasi";

const NotifikasiContext = createContext();

export const useNotifikasi = () => useContext(NotifikasiContext);

export function NotifikasiProvider({ children }) {
  const [notifikasi, setNotifikasi] = useState([]);

  const tampilkanNotifikasi = (tipe, pesan) => {
    setNotifikasi((sebelumnya) => [
      ...sebelumnya.slice(-2),
      { id: `${Date.now()}-${Math.random()}`, tipe, pesan },
    ]);
  };

  const tutupNotifikasi = (id) =>
    setNotifikasi((sebelumnya) =>
      sebelumnya.filter((item) => item.id !== id),
    );

  return (
    <NotifikasiContext.Provider value={{ tampilkanNotifikasi }}>
      {children}
      <DaftarNotifikasi notifs={notifikasi} onTutup={tutupNotifikasi} />
    </NotifikasiContext.Provider>
  );
}
