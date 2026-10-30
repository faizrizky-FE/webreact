export function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top border-bottom">
      <div className="container-fluid">
        <a className="navbar-brand ms-5 " style={{ fontSize: "25px" }} href="#">
          <i className="bi bi-bag text-primary"></i>
          <b>
            <span className="text-primary"> Izz</span>Shop
          </b>
        </a>
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
        <div
          className="collapse navbar-collapse justify-content-center"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav text-center mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Produk
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Tentang
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Kontak
              </a>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </form>
          <a href="" className="mx-3 fs-4 text-dark">
            <i className="bi bi-cart3"></i>
          </a>
        </div>
      </div>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="bg-light border-top mt-5 pt-5 pb-3">
      <div className="container">
        <div className="row g-4 mb-4">
          {/* Informasi toko */}
          <div className="col-12 col-md-6 col-lg-4">
            <a href="/" className="text-decoration-none text-dark fs-4 fw-bold">
              <i className="bi bi-bag text-primary"></i>{" "}
              <span className="text-primary">Izz</span>Shop
            </a>

            <p className="text-secondary mt-3">
              Solusi belanja online untuk kebutuhan modern Anda.
            </p>

            <div className="d-flex gap-3 fs-5">
              <a href="#" className="text-dark">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="text-dark">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="text-dark">
                <i className="bi bi-youtube"></i>
              </a>
              <a href="#" className="text-dark">
                <i className="bi bi-twitter-x"></i>
              </a>
            </div>
          </div>

          {/* Navigasi */}
          <div className="col-6 col-md-3 col-lg-2">
            <h6 className="fw-bold mb-3">Navigasi</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/" className="text-secondary text-decoration-none">
                  Beranda
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="/produk"
                  className="text-secondary text-decoration-none"
                >
                  Produk
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#tentang"
                  className="text-secondary text-decoration-none"
                >
                  Tentang
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#kontak"
                  className="text-secondary text-decoration-none"
                >
                  Kontak
                </a>
              </li>
            </ul>
          </div>

          {/* Bantuan */}
          <div className="col-6 col-md-3 col-lg-2">
            <h6 className="fw-bold mb-3">Bantuan</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" className="text-secondary text-decoration-none">
                  Cara Belanja
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-secondary text-decoration-none">
                  Pengiriman
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-secondary text-decoration-none">
                  Pembayaran
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-secondary text-decoration-none">
                  FAQ
                </a>
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

        {/* Copyright */}
        <hr />

        <div className="d-flex flex-column flex-md-row justify-content-between gap-2 text-secondary small">
          <span>© 2026 IzzShop. Semua hak dilindungi.</span>
          <span>Dibuat dengan ❤️ menggunakan React + Vite</span>
        </div>
      </div>
    </footer>
  );
}
