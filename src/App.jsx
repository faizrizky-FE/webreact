import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Navbar, Footer } from "./layouts/app";
import Home from "./pages/home";
import Produk from "./pages/produk";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produk" element={<Produk />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
