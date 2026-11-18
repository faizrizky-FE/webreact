import { createContext, useContext, useState, useEffect } from "react";
import { getProduk } from "../services/produkServices";

const ProdukContext = createContext();

export const useProduk = () => useContext(ProdukContext);

export function ProdukProvider({ children }) {
  const [produk, setProduk] = useState([]);
  const [produkSaya, setProdukSaya] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ambilProduk = async () => {
      try {
        const [smartphone, laptop, tablet, aksesoris] = await Promise.all([
          getProduk("smartphone"),
          getProduk("laptop"),
          getProduk("tablet"),
          getProduk("aksesoris"),
        ]);

        setProduk(
          [
            ...smartphone.data.products,
            ...laptop.data.products,
            ...tablet.data.products,
            ...aksesoris.data.products,
          ].map((product) => ({
            id: product.id,
            nama: product.title,
            deskripsi: product.description,
            harga: product.price,
            gambar: product.thumbnail,
          })),
        );
      } catch (error) {
        setError("Gagal mengambil produk");
      } finally {
        setLoading(false);
      }
    };

    ambilProduk();
  }, []);

  return (
    <ProdukContext.Provider
      value={{
        produk,
        setProduk,
        produkSaya,
        setProdukSaya,
        error,
        loading,
      }}
    >
      {children}
    </ProdukContext.Provider>
  );
}
