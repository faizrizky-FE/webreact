import { Routes, Route, useNavigate } from "react-router-dom";
import { Navbar, Footer } from "./layouts/app";
import { useState } from "react";
import Home from "./pages/home";
import Produk from "./pages/produk";
import Tentang from "./pages/tentang";
import Kontak from "./pages/kontak";
import SolarCursor from "./components/efekCursor";
import Profile from "./pages/profile";
import Keranjang from "./pages/keranjang";
import Wishlist from "./pages/whishlist";

function App() {
  const [search, setSearch] = useState("");
  const [tampilSaran, setTampilSaran] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    const kategori = [
      "Smartphone",
      "Handphone",
      "Laptop",
      "Tablet",
      "Aksesoris",
    ];
    const kata = search.toLowerCase().trim();
    const hasil = kategori.find((item) => item.toLowerCase().startsWith(kata));
    setTampilSaran(false);

    if (hasil) {
      setSearch(hasil);
    }

    navigate("/produk#daftar-produk");
  };

  return (
    <>
      <SolarCursor />
      <Navbar
        search={search}
        setSearch={setSearch}
        onSearch={handleSearch}
        tampilSaran={tampilSaran}
        setTampilSaran={setTampilSaran}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/produk" element={<Produk search={search} />} />
        <Route path="/tentang" element={<Tentang />} />
        <Route path="/kontak" element={<Kontak />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/keranjang" element={<Keranjang />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
