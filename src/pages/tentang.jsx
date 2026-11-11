import { Link } from "react-router-dom";

function Tentang() {
  return (
    <main className="py-5 my-5">
      <section className="py-4">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <span className="text-primary fw-semibold text-uppercase small">
                Tentang IzzShop
              </span>
              <h1 className="display-4 fw-bold mt-3 mb-4">
                Kenalan dengan <span className="text-primary">IzzShop</span>
              </h1>
              <p className="text-secondary mb-4">
                IzzShop adalah toko online yang menyediakan berbagai produk
                elektronik dan teknologi untuk kebutuhan sehari-hari, mulai dari
                laptop dan smartphone hingga aksesori.
              </p>
              <Link
                to="/produk"
                className="btn btn-primary rounded-pill px-4 py-2"
              >
                Lihat koleksi <i className="bi bi-arrow-up-right ms-2"></i>
              </Link>
            </div>

            <div className="col-lg-6">
              <div
                className="rounded-5 p-4 p-md-5 position-relative overflow-hidden"
                style={{ backgroundColor: "#eceeffc2", minHeight: "360px" }}
              >
                <div className="position-relative z-1">
                  <span className="badge rounded-pill bg-white text-primary px-3 py-2">
                    IzzShop
                  </span>
                  <div className="d-flex justify-content-center align-items-center py-4">
                    <div
                      className="bg-white rounded-circle d-flex justify-content-center align-items-center shadow-sm"
                      style={{ width: "210px", height: "210px" }}
                    >
                      <i
                        className="bi bi-bag-heart text-primary"
                        style={{ fontSize: "96px" }}
                      ></i>
                    </div>
                  </div>
                  <div className="bg-white rounded-4 p-3 shadow-sm">
                    <div className="d-flex align-items-center gap-3">
                      <i className="bi bi-stars text-primary fs-3"></i>
                      <div>
                        <p className="fw-bold mb-1">Toko online elektronik</p>
                        <p className="text-secondary small mb-0">
                          Produk teknologi untuk kerja, belajar, dan hiburan.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="position-absolute rounded-circle bg-primary bg-opacity-10"
                  style={{
                    width: "260px",
                    height: "260px",
                    top: "-90px",
                    right: "-70px",
                  }}
                ></div>
                <div
                  className="position-absolute rounded-circle bg-primary bg-opacity-10"
                  style={{
                    width: "160px",
                    height: "160px",
                    bottom: "-70px",
                    left: "-50px",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row g-4 align-items-stretch">
            <div className="col-lg-4">
              <div className="h-100 pe-lg-4">
                <span className="text-primary fw-semibold text-uppercase small">
                  Latar belakang
                </span>
                <h2 className="fw-bold mt-3">
                  Satu tempat untuk kebutuhan teknologi.
                </h2>
                <p className="text-secondary mb-3">
                  IzzShop dibangun sebagai etalase online agar pengunjung dapat
                  melihat beragam perangkat dan aksesori dalam satu tempat.
                  Katalog kami mencakup kategori seperti laptop, smartphone,
                  headphone, kamera, hingga perlengkapan komputer.
                </p>
                <p className="text-secondary mb-0">
                  Kami ingin proses memilih produk terasa lebih jelas: kenali
                  kategorinya, baca informasi yang tersedia, lalu tentukan
                  pilihan yang sesuai dengan kebutuhan Anda.
                </p>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="card h-100 border-0 shadow-sm rounded-4">
                    <div className="card-body p-4">
                      <div className="d-flex align-items-center gap-3 mb-3">
                        <span className="bg-primary bg-opacity-10 rounded-3 p-3">
                          <i className="bi bi-grid text-primary fs-4"></i>
                        </span>
                        <h3 className="h5 fw-bold mb-0">Katalog beragam</h3>
                      </div>
                      <p className="text-secondary mb-0">
                        Lihat pilihan perangkat dan aksesori teknologi dalam
                        beberapa kategori.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card h-100 border-0 shadow-sm rounded-4">
                    <div className="card-body p-4">
                      <div className="d-flex align-items-center gap-3 mb-3">
                        <span className="bg-primary bg-opacity-10 rounded-3 p-3">
                          <i className="bi bi-search text-primary fs-4"></i>
                        </span>
                        <h3 className="h5 fw-bold mb-0">Informasi produk</h3>
                      </div>
                      <p className="text-secondary mb-0">
                        Setiap produk menampilkan harga dan deskripsi agar Anda
                        punya informasi dasar sebelum memilih.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card h-100 border-0 shadow-sm rounded-4">
                    <div className="card-body p-4">
                      <div className="d-flex align-items-center gap-3 mb-3">
                        <span className="bg-primary bg-opacity-10 rounded-3 p-3">
                          <i className="bi bi-lightning-charge text-primary fs-4"></i>
                        </span>
                        <h3 className="h5 fw-bold mb-0">
                          Jelajahi dengan mudah
                        </h3>
                      </div>
                      <p className="text-secondary mb-0">
                        Kunjungi halaman Produk untuk melihat katalog dan
                        menemukan kategori yang dicari.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card h-100 border-0 shadow-sm rounded-4">
                    <div className="card-body p-4">
                      <div className="d-flex align-items-center gap-3 mb-3">
                        <span className="bg-primary bg-opacity-10 rounded-3 p-3">
                          <i className="bi bi-heart text-primary fs-4"></i>
                        </span>
                        <h3 className="h5 fw-bold mb-0">Bantuan terbuka</h3>
                      </div>
                      <p className="text-secondary mb-0">
                        Punya pertanyaan atau masukan? Sampaikan melalui halaman
                        Kontak IzzShop.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Tentang;
