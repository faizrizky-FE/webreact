import { Link } from "react-router-dom";
import { useProduk } from "../context/ProdukContext";

// Data kategori
const kategori = [
  { nama: "HP", nilai: "smartphones", icon: "bi-phone", warna: "primary" },
  { nama: "Laptop", nilai: "laptops", icon: "bi-laptop", warna: "info" },
  { nama: "Tablet", nilai: "tablets", icon: "bi-tablet", warna: "success" },
  {
    nama: "Aksesoris",
    nilai: "mobile-accessories",
    icon: "bi-headphones",
    warna: "warning",
  },
];

// Data keunggulan
const keunggulan = [
  {
    judul: "Pilihan Produk",
    isi: "Berbagai pilihan produk untuk kebutuhanmu.",
    icon: "bi-box-seam",
    warna: "primary",
  },
  {
    judul: "Belanja Nyaman",
    isi: "Tampilan belanja yang sederhana dan mudah digunakan.",
    icon: "bi-shield-check",
    warna: "success",
  },
  {
    judul: "Layanan Pelanggan",
    isi: "Siap membantu kebutuhan informasi produk.",
    icon: "bi-headset",
    warna: "info",
  },
];

// Hitung harga setelah diskon
const hitungHargaAkhir = (produk) =>
  Math.round(produk.harga * (1 - (produk.diskon || 0) / 100));

// Judul section (dipakai 2 kali)
function JudulSection({ judul, deskripsi }) {
  return (
    <div className="d-flex justify-content-between align-items-end mb-4">
      <div>
        <h4 className="fw-bold mb-1">{judul}</h4>
        <p className="text-secondary mb-0">{deskripsi}</p>
      </div>

      <Link to="/produk" className="text-decoration-none fw-semibold">
        Lihat Semua →
      </Link>
    </div>
  );
}

function Home() {
  const { produk } = useProduk();

  return (
    <main>
      {/* Efek hover kartu */}
      <style>{`
        .kartu-hover {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .kartu-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 0.75rem 1.5rem rgba(0, 0, 0, 0.12) !important;
        }
      `}</style>

      {/* Hero */}
      <section className="py-5 my-3">
        <div className="container px-0 pt-5">
          <div
            className="rounded-4 overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #eef2ff, #dbe7ff)",
            }}
          >
            <div className="row align-items-center g-0">
              {/* Teks */}
              <div className="col-lg-6 p-4 p-md-5">
                <span className="badge rounded-pill bg-primary-subtle text-primary px-3 py-2 mb-3">
                  <i className="bi bi-stars me-1"></i>
                  Produk Terbaik
                </span>

                <h1 className="display-5 fw-bold">
                  Belanja Mudah,
                  <br />
                  <span className="text-primary">Hidup Lebih Praktis</span>
                </h1>

                <p className="fs-5 text-secondary mb-4">
                  Temukan berbagai produk kebutuhan sehari-hari dengan harga
                  terbaik dan kualitas terjamin.
                </p>

                <div className="mb-4">
                  <Link to="/produk" className="btn btn-primary px-4 py-2">
                    Belanja Sekarang →
                  </Link>
                </div>

                <div className="d-flex gap-4">
                  <div className="text-center">
                    <h4 className="fw-bold mb-0">{produk.length}+</h4>
                    <small className="text-secondary">Produk</small>
                  </div>
                  <div className="text-center">
                    <h4 className="fw-bold mb-0">{kategori.length}</h4>
                    <small className="text-secondary">Kategori</small>
                  </div>
                </div>
              </div>

              {/* Gambar */}
              <div className="col-lg-6 d-none d-lg-flex justify-content-end align-self-end">
                <img
                  src="/gambar3.jpg"
                  alt="Produk elektronik"
                  width="500"
                  height="350"
                  className="d-block"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kategori */}
      <section className="my-5">
        <div className="container px-0">
          <JudulSection
            judul="Kategori Pilihan"
            deskripsi="Temukan produk sesuai kebutuhanmu"
          />

          <div className="row row-cols-2 row-cols-md-4 g-3">
            {kategori.map((item) => (
              <div className="col" key={item.nama}>
                <Link
                  to={`/produk?kategori=${item.nilai}`}
                  className="text-decoration-none text-dark"
                >
                  <div className="card kartu-hover border-0 shadow-sm rounded-4 h-100">
                    <div className="card-body d-flex align-items-center gap-3 p-4">
                      <div
                        className={`bg-${item.warna} bg-opacity-10 rounded-4 d-flex align-items-center justify-content-center flex-shrink-0`}
                        style={{ width: "65px", height: "65px" }}
                      >
                        <i
                          className={`bi ${item.icon} fs-2 text-${item.warna}`}
                        ></i>
                      </div>

                      <div>
                        <h6 className="fw-bold mb-1">{item.nama}</h6>
                        <small className="text-secondary">
                          Jelajahi produk
                        </small>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Produk Pilihan */}
      <section className="py-4">
        <div className="container px-0">
          <JudulSection
            judul="Produk Pilihan"
            deskripsi="Produk menarik yang bisa kamu temukan"
          />

          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
            {produk.slice(0, 4).map((product) => {
              const diskon = product.diskon || 0;

              return (
                <div className="col" key={product.id}>
                  <div className="card kartu-hover h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                    {/* Gambar */}
                    <div
                      className="position-relative d-flex justify-content-center align-items-center p-3"
                      style={{ backgroundColor: "#f5f8ff", height: "220px" }}
                    >
                      <img
                        src={product.gambar}
                        alt={product.nama}
                        className="img-fluid"
                        style={{
                          width: "100%",
                          height: "190px",
                          objectFit: "contain",
                        }}
                      />

                      {diskon > 0 && (
                        <span className="badge bg-danger position-absolute top-0 start-0 m-3">
                          -{Math.round(diskon)}%
                        </span>
                      )}
                    </div>

                    {/* Info */}
                    <div className="card-body d-flex flex-column">
                      <h6 className="fw-bold mb-2 text-truncate">
                        {product.nama}
                      </h6>

                      {/* Rating */}
                      <div className="d-flex align-items-center gap-1 mb-2">
                        <i
                          className="bi bi-star-fill"
                          style={{ color: "#f5a623", fontSize: "12px" }}
                        ></i>
                        <small>{product.rating ?? "-"}</small>
                      </div>

                      {/* Deskripsi maksimal 2 baris */}
                      <p
                        className="text-secondary small mb-3"
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {product.deskripsi}
                      </p>

                      <div className="mt-auto">
                        {/* Harga */}
                        <div className="d-flex align-items-center flex-wrap gap-2 mb-3">
                          <h6
                            className="fw-bold mb-0"
                            style={{ color: "#ee4d2d" }}
                          >
                            Rp{" "}
                            {hitungHargaAkhir(product).toLocaleString("id-ID")}
                          </h6>

                          {diskon > 0 && (
                            <small className="text-secondary text-decoration-line-through">
                              Rp {Number(product.harga).toLocaleString("id-ID")}
                            </small>
                          )}
                        </div>

                        <Link
                          to="/produk"
                          className="btn btn-outline-primary w-100"
                        >
                          Lihat Produk
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Banner Promo */}
      <section className="my-5">
        <div className="container px-0">
          <div
            className="rounded-4 p-4 p-md-5 overflow-hidden"
            style={{ background: "linear-gradient(120deg, #0d6efd, #4c83ed)" }}
          >
            <div className="row align-items-center">
              <div className="col-md-8 text-white">
                <span className="badge bg-light text-primary mb-3">
                  Temukan Favoritmu
                </span>

                <h2 className="fw-bold">Saatnya Upgrade Perangkatmu!</h2>

                <p className="mb-4">
                  Temukan berbagai pilihan perangkat elektronik untuk mendukung
                  aktivitas sehari-hari.
                </p>

                <Link
                  to="/produk"
                  className="btn btn-light text-primary fw-semibold px-4"
                >
                  Jelajahi Produk
                </Link>
              </div>

              <div className="col-md-4 text-center mt-4 mt-md-0">
                <i
                  className="bi bi-bag-check text-white"
                  style={{ fontSize: "110px" }}
                ></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Keunggulan */}
      <section className="my-5">
        <div className="container px-0">
          <div className="text-center mb-4">
            <h4 className="fw-bold">Kenapa Belanja di IzzShop?</h4>
            <p className="text-secondary">
              Pengalaman belanja yang mudah dan nyaman
            </p>
          </div>

          <div className="row row-cols-1 row-cols-md-3 g-4">
            {keunggulan.map((item) => (
              <div className="col" key={item.judul}>
                <div className="card kartu-hover border-0 shadow-sm rounded-4 h-100 text-center">
                  <div className="card-body py-4">
                    <div
                      className={`bg-${item.warna} bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center`}
                      style={{ width: "70px", height: "70px" }}
                    >
                      <i
                        className={`bi ${item.icon} text-${item.warna} fs-2`}
                      ></i>
                    </div>

                    <h6 className="fw-bold mt-3">{item.judul}</h6>
                    <p className="text-secondary small mb-0">{item.isi}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ajakan */}
      <section className="my-5 pb-5">
        <div className="container px-0">
          <div className="text-center bg-light rounded-4 p-5">
            <h3 className="fw-bold">Sudah Menemukan Produk Favoritmu?</h3>
            <p className="text-secondary">
              Jelajahi katalog IzzShop dan temukan produk yang kamu butuhkan.
            </p>

            <Link to="/produk" className="btn btn-primary px-4">
              Lihat Semua Produk
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
