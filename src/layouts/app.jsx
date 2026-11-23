import { Link, NavLink, useNavigate } from "react-router-dom";
import { useProduk } from "../context/ProdukContext";
import { useState } from "react";

export function Navbar({
  search,
  setSearch,
  onSearch,
  tampilSaran,
  setTampilSaran,
}) {
  const { produk, produkSaya } = useProduk();
  const navigate = useNavigate();

  const [bukaPencarian, setBukaPencarian] = useState(false);

  const semuaProduk = [...produk, ...produkSaya];

  const saranKategori = [
    "Smartphone",
    "Handphone",
    "Laptop",
    "Tablet",
    "Aksesoris",
  ];

  const hasilSaranKategori = saranKategori.filter((kategori) =>
    kategori.toLowerCase().includes(search.toLowerCase()),
  );

  const saranProduk = semuaProduk
    .filter((item) => item.nama.toLowerCase().includes(search.toLowerCase()))
    .slice(0, 5);

  const pilihSaran = (kata) => {
    setSearch(kata);
    setTampilSaran(false);
    setBukaPencarian(false);
    navigate("/produk");
  };

  const tutupPencarian = () => {
    setBukaPencarian(false);
    setTampilSaran(false);
    setSearch("");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top border-bottom shadow-sm">
      <div className="container">
        {/* Logo */}
        <Link
          className="navbar-brand fw-bold fs-4"
          to="/"
          onClick={tutupPencarian}
        >
          <i className="bi bi-bag text-primary me-1"></i>
          <span className="text-primary">Izz</span>Shop
        </Link>

        {/* Toggle Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* Menu */}
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-lg-2 text-center">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/produk">
                Produk
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/tentang">
                Tentang
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/kontak">
                Kontak
              </NavLink>
            </li>
          </ul>

          {/* Action */}
          <div className="d-flex align-items-center justify-content-center gap-2">
            {/* Pencarian */}
            <div className="position-relative d-flex align-items-center gap-2">
              <form
                onSubmit={onSearch}
                role="search"
                className="d-flex align-items-center"
              >
                <input
                  type="search"
                  className="form-control rounded-pill"
                  placeholder="Cari produk..."
                  aria-label="Cari produk"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onFocus={() => setTampilSaran(true)}
                  style={{
                    width: bukaPencarian ? "220px" : "0px",
                    opacity: bukaPencarian ? 1 : 0,
                    padding: bukaPencarian ? "0.375rem 0.75rem" : 0,
                    border: bukaPencarian ? undefined : 0,
                    transition: "all 0.3s ease",
                    pointerEvents: bukaPencarian ? "auto" : "none",
                  }}
                />
              </form>

              <button
                type="button"
                className="btn btn-light rounded-circle d-flex align-items-center justify-content-center gap-2"
                style={{ width: "40px", height: "40px" }}
                onClick={() => {
                  if (bukaPencarian) {
                    tutupPencarian();
                  } else {
                    setBukaPencarian(true);
                  }
                }}
                aria-label={
                  bukaPencarian ? "Tutup pencarian" : "Buka pencarian"
                }
              >
                <i
                  className={`bi ${bukaPencarian ? "bi-x-lg" : "bi-search"}`}
                ></i>
              </button>

              {/* Autocomplete */}
              {bukaPencarian && tampilSaran && search.trim() !== "" && (
                <div
                  className="position-absolute top-100 end-0 bg-white border rounded-3 shadow mt-2 overflow-hidden"
                  style={{ width: "260px", zIndex: 1050 }}
                >
                  {hasilSaranKategori.map((kategori) => (
                    <button
                      key={kategori}
                      type="button"
                      className="w-100 text-start px-3 py-2 border-0 border-bottom bg-white"
                      onClick={() => pilihSaran(kategori)}
                    >
                      <i className="bi bi-tag me-2 text-secondary"></i>
                      {kategori}
                    </button>
                  ))}

                  {saranProduk.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className="w-100 text-start px-3 py-2 border-0 border-bottom bg-white"
                      onClick={() => pilihSaran(item.nama)}
                    >
                      <i className="bi bi-box-seam me-2 text-secondary"></i>
                      {item.nama}
                    </button>
                  ))}

                  {hasilSaranKategori.length === 0 &&
                    saranProduk.length === 0 && (
                      <div className="text-center text-secondary p-3">
                        Produk tidak ditemukan
                      </div>
                    )}
                </div>
              )}
            </div>

            {/* Wishlist */}
            <NavLink to="/wishlist" className="mx-2 fs-5 text-danger">
              <i className="bi bi-heart"></i>
            </NavLink>

            {/* Keranjang */}
            <NavLink to="/keranjang" className="mx-2 fs-5 text-warning">
              <i className="bi bi-cart3"></i>
            </NavLink>

            {/* Profile */}
            <NavLink to="/profile" className="mx-2 fs-4 text-primary">
              <i className="bi bi-person-circle"></i>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="bg-light border-top pt-5 pb-3">
      <div className="container">
        <div className="row g-4 mb-4">
          {/* Informasi toko */}
          <div className="col-12 col-md-6 col-lg-4">
            <NavLink
              to="/"
              className="text-decoration-none text-dark fs-4 fw-bold"
            >
              <i className="bi bi-bag text-primary"></i>{" "}
              <span className="text-primary">Izz</span>Shop
            </NavLink>

            <p className="text-secondary mt-3">
              Solusi belanja online untuk kebutuhan modern Anda.
            </p>

            <div className="d-flex gap-3 fs-5">
              <NavLink to="#" className="text-dark">
                <i className="bi bi-instagram"></i>
              </NavLink>
              <NavLink to="#" className="text-dark">
                <i className="bi bi-facebook"></i>
              </NavLink>
              <NavLink to="#" className="text-dark">
                <i className="bi bi-youtube"></i>
              </NavLink>
              <NavLink to="#" className="text-dark">
                <i className="bi bi-twitter-x"></i>
              </NavLink>
            </div>
          </div>

          {/* Navigasi */}
          <div className="col-6 col-md-3 col-lg-2">
            <h6 className="fw-bold mb-3">Navigasi</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <NavLink to="/" className="text-secondary text-decoration-none">
                  Beranda
                </NavLink>
              </li>
              <li className="mb-2">
                <NavLink
                  to="/produk"
                  className="text-secondary text-decoration-none"
                >
                  Produk
                </NavLink>
              </li>
              <li className="mb-2">
                <NavLink
                  to="/tentang"
                  className="text-secondary text-decoration-none"
                >
                  Tentang
                </NavLink>
              </li>
              <li className="mb-2">
                <NavLink
                  to="/kontak"
                  className="text-secondary text-decoration-none"
                >
                  Kontak
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Bantuan */}
          <div className="col-6 col-md-3 col-lg-2">
            <h6 className="fw-bold mb-3">Bantuan</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <NavLink to="#" className="text-secondary text-decoration-none">
                  Cara Belanja
                </NavLink>
              </li>
              <li className="mb-2">
                <NavLink to="#" className="text-secondary text-decoration-none">
                  Pengiriman
                </NavLink>
              </li>
              <li className="mb-2">
                <NavLink to="#" className="text-secondary text-decoration-none">
                  Pembayaran
                </NavLink>
              </li>
              <li className="mb-2">
                <NavLink to="#" className="text-secondary text-decoration-none">
                  FAQ
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-12 col-lg-4">
            <h6 className="fw-bold mb-3">Newsletter</h6>
            <p className="text-secondary">Dapatkan info promo terbaru</p>

            <form className="input-group" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                className="form-control"
                placeholder="Masukkan email Anda"
                aria-label="Email"
              />
              <button className="btn btn-primary" type="submit">
                <i className="bi bi-send"></i>
              </button>
            </form>
          </div>
        </div>

        <hr />

        <div className="d-flex flex-column flex-md-row justify-content-between gap-2 text-secondary small">
          <span>© 2026 IzzShop. Semua hak dilindungi.</span>
          <span>Dibuat dengan ❤️ menggunakan React + Vite</span>
        </div>
      </div>
    </footer>
  );
}
