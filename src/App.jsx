import { Routes, Route } from "react-router-dom";
import { Navbar, Footer } from "./layouts/app";
import Home from "./pages/home";
import Produk from "./pages/produk";
import Tentang from "./pages/tentang";
import Kontak from "./pages/kontak";
import SolarCursor from "./components/efekCursor";
import Profile from "./pages/profile";
import { ProdukProvider } from "./context/ProdukContext";

function App() {
  return (
    <>
      <ProdukProvider>
        <SolarCursor />
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produk" element={<Produk />} />
          <Route path="/tentang" element={<Tentang />} />
          <Route path="/kontak" element={<Kontak />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>

        <Footer />
      </ProdukProvider>
    </>
  );
}

export default App;
