import { useState, useEffect } from "react";
import { useProduk } from "../context/ProdukContext";
import { useKeranjang } from "../context/KeranjangContext";

function Produk({ search }) {
  const { produk, produkSaya } = useProduk();
  const { setKeranjang } = useKeranjang();

  const semuaProduk = [...produk, ...produkSaya];

  const [jumlahProduk, setJumlahProduk] = useState(8);
  const [produkDipilih, setProdukDipilih] = useState(null);
  const [tampilDetail, setTampilDetail] = useState(false);
  const [jumlahBeli, setJumlahBeli] = useState(1);
  const [gambarAktif, setGambarAktif] = useState("");
  const [kategoriDipilih, setKategoriDipilih] = useState([]);
  const [kategoriAktif, setKategoriAktif] = useState([]);
  const [hargaMin, setHargaMin] = useState("");
  const [hargaMax, setHargaMax] = useState("");
  const [hargaMinAktif, setHargaMinAktif] = useState("");
  const [hargaMaxAktif, setHargaMaxAktif] = useState("");

  const kataKunciKategori = {
    hp: "smartphones",
    handphone: "smartphones",
    smartphone: "smartphones",
    laptop: "laptops",
    tablet: "tablets",
    aksesoris: "mobile-accessories",
  };
  const kata = search.toLowerCase().trim();
  const kategoriDicari = kataKunciKategori[kata];
  const hasilPencarian = semuaProduk.filter((item) => {
    const cocokNama = item.nama.toLowerCase().includes(kata);
    const cocokKategori = kategoriDicari && item.kategori === kategoriDicari;

    return cocokNama || cocokKategori;
  });

  const hasilFilterKategori =
    kategoriAktif.length === 0
      ? hasilPencarian
      : hasilPencarian.filter((item) => kategoriAktif.includes(item.kategori));

  const hasilFilterHarga = hasilFilterKategori.filter((item) => {
    const harga = Number(item.harga);
    const min = hargaMinAktif === "" ? 0 : Number(hargaMinAktif);
    const max = hargaMaxAktif === "" ? Infinity : Number(hargaMaxAktif);

    return harga >= min && harga <= max;
  });

  const tambahKeKeranjang = () => {
    setKeranjang((prev) => {
      const produkAda = prev.find((item) => item.id === produkDipilih.id);

      if (produkAda) {
        return prev.map((item) =>
          item.id === produkDipilih.id
            ? { ...item, jumlah: item.jumlah + jumlahBeli }
            : item,
        );
      }

      return [...prev, { ...produkDipilih, jumlah: jumlahBeli }];
    });

    setTampilDetail(false);
  };

  useEffect(() => {
    document.body.style.overflow = tampilDetail ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [tampilDetail]);

  return (
    <main className="py-5 my-5" id="daftar-produk">
      <section>
        <div className="container px-0">
          <h1>Semua Produk</h1>
          <p>Temukan produk pilihan untuk kebutuhan Anda</p>
          <p className="text-secondary">
            Menampilkan {hasilFilterHarga.length} produk
          </p>
        </div>
      </section>

      <section>
        <div className="container px-0">
          <div className="d-flex align-items-center justify-content-between">
            {/* Tombol Filter */}
            <div>
              <button
                className="btn btn-outline-primary text-dark"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasScrolling"
                aria-controls="offcanvasScrolling"
              >
                <i className="bi bi-funnel text-primary me-2"></i>
                Filter Produk
              </button>

              {/* Offcanvas Filter */}
              <div
                className="offcanvas offcanvas-start"
                data-bs-scroll="true"
                data-bs-backdrop="false"
                tabIndex="-1"
                id="offcanvasScrolling"
                aria-labelledby="offcanvasScrollingLabel"
              >
                <div className="offcanvas-header border-bottom">
                  <h5 className="offcanvas-title" id="offcanvasScrollingLabel">
                    <i className="bi bi-bag text-primary me-2"></i>
                    <b>
                      <span className="text-primary">Izz</span>Shop
                    </b>
                  </h5>

                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                </div>

                <div className="offcanvas-body">
                  {/* Kategori */}
                  <div className="mb-3">
                    <button
                      className="btn w-100 d-flex justify-content-between align-items-center fw-bold px-0"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#Kategori"
                      aria-expanded="true"
                      aria-controls="Kategori"
                    >
                      <span>
                        <i className="bi bi-grid me-2 text-primary"></i>
                        Kategori
                      </span>
                      <i className="bi bi-chevron-down"></i>
                    </button>

                    <div className="collapse show mt-3" id="Kategori">
                      <div className="form-check mb-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={kategoriDipilih.includes("smartphones")}
                          onChange={(e) => {
                            setKategoriDipilih((prev) =>
                              e.target.checked
                                ? [...prev, "smartphones"]
                                : prev.filter((item) => item !== "smartphones"),
                            );
                          }}
                          id="Smartphone"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="Smartphone"
                        >
                          Smartphone
                        </label>
                      </div>

                      <div className="form-check mb-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={kategoriDipilih.includes("laptops")}
                          onChange={(e) => {
                            setKategoriDipilih((prev) =>
                              e.target.checked
                                ? [...prev, "laptops"]
                                : prev.filter((item) => item !== "laptops"),
                            );
                          }}
                          id="Laptop"
                        />
                        <label className="form-check-label" htmlFor="Laptop">
                          Laptop
                        </label>
                      </div>

                      <div className="form-check mb-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={kategoriDipilih.includes("tablets")}
                          onChange={(e) => {
                            setKategoriDipilih((prev) =>
                              e.target.checked
                                ? [...prev, "tablets"]
                                : prev.filter((item) => item !== "tablets"),
                            );
                          }}
                          id="Tablet"
                        />
                        <label className="form-check-label" htmlFor="Tablet">
                          Tablet
                        </label>
                      </div>

                      <div className="form-check mb-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={kategoriDipilih.includes(
                            "mobile-accessories",
                          )}
                          onChange={(e) => {
                            setKategoriDipilih((prev) =>
                              e.target.checked
                                ? [...prev, "mobile-accessories"]
                                : prev.filter(
                                    (item) => item !== "mobile-accessories",
                                  ),
                            );
                          }}
                          id="Aksesoris"
                        />
                        <label className="form-check-label" htmlFor="Aksesoris">
                          Aksesoris
                        </label>
                      </div>
                    </div>
                  </div>

                  <hr />

                  {/* Rentang Harga */}
                  <div className="mb-3">
                    <h6 className="fw-bold mb-3">
                      <i className="bi bi-cash-stack me-2 text-primary"></i>
                      Rentang Harga
                    </h6>

                    <div className="d-flex gap-2 align-items-center">
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        value={hargaMin}
                        onChange={(e) => setHargaMin(e.target.value)}
                        placeholder="Min. harga"
                      />
                      <span className="text-secondary">-</span>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        value={hargaMax}
                        onChange={(e) => setHargaMax(e.target.value)}
                        placeholder="Maks. harga"
                      />
                    </div>
                  </div>

                  <hr />

                  {/* Rating */}
                  <div className="mb-3">
                    <h6 className="fw-bold mb-3">
                      <i className="bi bi-star me-2 text-primary"></i>
                      Rating Produk
                    </h6>

                    {["5", "4", "3"].map((nilai) => (
                      <div className="form-check mb-2" key={nilai}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`rating-${nilai}`}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`rating-${nilai}`}
                        >
                          <span className="text-warning">
                            {"★".repeat(Number(nilai))}
                          </span>
                          <span className="text-secondary">
                            {"☆".repeat(5 - Number(nilai))}
                          </span>
                          <small className="text-secondary ms-1">ke atas</small>
                        </label>
                      </div>
                    ))}
                  </div>

                  <hr />

                  {/* Ketersediaan */}
                  <div className="mb-3">
                    <h6 className="fw-bold mb-3">
                      <i className="bi bi-box-seam me-2 text-primary"></i>
                      Ketersediaan
                    </h6>

                    <div className="form-check mb-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="tersedia"
                      />
                      <label className="form-check-label" htmlFor="tersedia">
                        Produk tersedia
                      </label>
                    </div>

                    <div className="form-check mb-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="habis"
                      />
                      <label className="form-check-label" htmlFor="habis">
                        Stok habis
                      </label>
                    </div>
                  </div>

                  <hr />

                  {/* Brand */}
                  <div className="mb-3">
                    <h6 className="fw-bold mb-3">
                      <i className="bi bi-tags me-2 text-primary"></i>
                      Brand
                    </h6>

                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="Cari brand..."
                    />
                    <small className="text-secondary d-block mt-2">
                      Pilihan brand akan ditampilkan di sini.
                    </small>
                  </div>

                  <hr />

                  {/* Tombol Aksi */}
                  <div className="d-flex gap-2">
                    <button
                      type="button"
                      className="btn btn-outline-secondary w-100"
                      onClick={() => {
                        setKategoriDipilih([]);
                        setKategoriAktif([]);
                        setHargaMin("");
                        setHargaMax("");
                      }}
                    >
                      Reset Filter
                    </button>

                    <button
                      type="button"
                      className="btn btn-primary w-100"
                      onClick={() => {
                        setKategoriAktif(kategoriDipilih);
                        setHargaMinAktif(hargaMin);
                        setHargaMaxAktif(hargaMax);
                      }}
                      data-bs-dismiss="offcanvas"
                    >
                      Terapkan
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Dropdown */}
            <div className="d-flex align-items-center gap-2">
              <select
                className="form-select border-primary"
                aria-label="Pilih kategori"
                defaultValue=""
              >
                <option value="">Semua</option>
                <option value="Smartphone">Smartphone</option>
                <option value="Laptop">Laptop</option>
                <option value="Tablet">Tablet</option>
                <option value="Aksesoris">Aksesoris</option>
              </select>

              <select
                className="form-select border-primary"
                aria-label="Urutkan produk"
                defaultValue=""
              >
                <option value="" disabled>
                  Urutkan
                </option>
                <option value="1">Terbaru</option>
                <option value="2">Termurah</option>
                <option value="3">Termahal</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container px-0 pt-3 pb-5">
          <div className="row row-cols-1 row-cols-md-4 g-3">
            {hasilFilterHarga.length === 0 ? (
              <div className="col-12 text-center py-5">
                <i className="bi bi-search fs-1 text-secondary"></i>
                <h5 className="mt-3">Produk tidak ditemukan</h5>
                <p className="text-secondary">
                  Coba gunakan kata kunci lainnya.
                </p>
              </div>
            ) : (
              hasilFilterHarga.slice(0, jumlahProduk).map((product) => {
                const diskon = product.diskon || 0;
                const stok = product.stok ?? 0;

                const hargaAkhir = Math.round(
                  product.harga * (1 - diskon / 100),
                );

                return (
                  <div className="col" key={product.id}>
                    <div
                      className="card h-100 border rounded-3 overflow-hidden"
                      onClick={() => {
                        setProdukDipilih(product);
                        setGambarAktif(product.gambar);
                        setJumlahBeli(1);
                        setTampilDetail(true);
                      }}
                      style={{
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    >
                      {/* Gambar Produk */}
                      <div
                        className="position-relative d-flex justify-content-center align-items-center p-3"
                        style={{
                          height: "210px",
                          backgroundColor: "#f8f9fa",
                        }}
                      >
                        <img
                          src={product.gambar}
                          alt={product.nama}
                          className="img-fluid"
                          style={{
                            width: "100%",
                            height: "175px",
                            objectFit: "contain",
                          }}
                          onError={(e) => {
                            e.target.src = "/gambar-default.png";
                          }}
                        />

                        {diskon > 0 && (
                          <span className="position-absolute top-0 start-0 m-2 badge bg-danger rounded-1 px-2 py-2">
                            -{Math.round(diskon)}%
                          </span>
                        )}

                        <button
                          type="button"
                          className="btn btn-light rounded-circle position-absolute top-0 end-0 m-2 shadow-sm"
                          style={{ width: "35px", height: "35px" }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <i className="bi bi-heart text-secondary"></i>
                        </button>
                      </div>

                      {/* Informasi Produk */}
                      <div className="card-body p-3 d-flex flex-column">
                        <span
                          className="text-secondary mb-1"
                          style={{ fontSize: "11px" }}
                        >
                          {product.kategori} · {product.brand || "Tanpa Brand"}
                        </span>

                        <h6
                          className="fw-semibold text-dark mb-2"
                          style={{
                            fontSize: "14px",
                            minHeight: "20px",
                          }}
                        >
                          {product.nama.split(" ").slice(0, 3).join(" ")}
                          {product.nama.split(" ").length > 3 && "..."}
                        </h6>

                        {/* Rating */}
                        <div className="d-flex align-items-center gap-1 mb-3">
                          <i
                            className="bi bi-star-fill"
                            style={{ color: "#f5a623", fontSize: "12px" }}
                          ></i>

                          <span className="small text-dark">
                            {product.rating ?? "-"}
                          </span>

                          <span className="text-secondary small">|</span>

                          <span className="text-secondary small">
                            {product.ulasan?.length || 0} ulasan
                          </span>
                        </div>

                        {/* Harga */}
                        <div className="mt-auto">
                          <h6
                            className="fw-bold mb-2"
                            style={{ color: "#ee4d2d" }}
                          >
                            Rp {hargaAkhir.toLocaleString("id-ID")}
                          </h6>

                          {/* Status Stok */}
                          <div className="d-flex align-items-center justify-content-between">
                            <span
                              className={`small ${
                                stok > 0 ? "text-success" : "text-danger"
                              }`}
                              style={{ fontSize: "11px" }}
                            >
                              <i
                                className={`bi ${
                                  stok > 0
                                    ? "bi-check-circle-fill"
                                    : "bi-x-circle-fill"
                                } me-1`}
                              ></i>
                              {stok > 0 ? "Stok tersedia" : "Stok habis"}
                            </span>

                            <span
                              className="text-secondary"
                              style={{ fontSize: "11px" }}
                            >
                              {stok > 0 ? `${stok} pcs` : ""}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {jumlahProduk < hasilFilterHarga.length && (
          <div className="text-center pb-5">
            <p
              className="btn btn-text text-secondary"
              onClick={() => setJumlahProduk(hasilFilterHarga.length)}
            >
              — Lihat Lebih Banyak —
            </p>
          </div>
        )}
      </section>

      {tampilDetail &&
        produkDipilih &&
        (() => {
          const diskon = produkDipilih.diskon || 0;
          const hargaAkhir = Math.round(
            produkDipilih.harga * (1 - diskon / 100),
          );
          const subtotal = hargaAkhir * jumlahBeli;
          const stok = produkDipilih.stok ?? 0;

          return (
            <div
              className="modal show d-block"
              tabIndex="-1"
              style={{ backgroundColor: "rgba(15, 23, 42, 0.55)" }}
            >
              <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content rounded-4 border-0 overflow-hidden position-relative">
                  <button
                    className="btn btn-light rounded-circle position-absolute top-0 end-0 m-3 shadow-sm me-4"
                    type="button"
                    onClick={() => setTampilDetail(false)}
                    style={{ zIndex: 20 }}
                  >
                    <i className="bi bi-x-lg"></i>
                  </button>
                  <div
                    className="modal-body p-0"
                    style={{
                      maxHeight: "85vh",
                      overflowY: "auto",
                      overflowX: "hidden",
                    }}
                  >
                    {/* Gambar Produk */}
                    <div
                      className="position-relative d-flex align-items-center justify-content-center p-4"
                      style={{
                        height: "320px",
                        background: "linear-gradient(135deg, #f1f5f9, #e2eaf5)",
                      }}
                    >
                      <button
                        className="btn btn-light rounded-circle position-absolute top-0 start-0 m-3 shadow-sm"
                        type="button"
                        style={{ zIndex: 2 }}
                      >
                        <i className="bi bi-heart text-secondary fs-5"></i>
                      </button>

                      {diskon > 0 && (
                        <span className="badge bg-danger position-absolute bottom-0 start-0 m-3 px-3 py-2">
                          Diskon {Math.round(diskon)}%
                        </span>
                      )}

                      <img
                        src={gambarAktif}
                        alt={produkDipilih.nama}
                        className="img-fluid"
                        style={{
                          width: "100%",
                          height: "260px",
                          objectFit: "contain",
                        }}
                      />
                      <div className="d-flex justify-content-center gap-2 mt-3">
                        {produkDipilih.gambarLain?.map((gambar, index) => (
                          <button
                            key={index}
                            type="button"
                            className={`btn p-1 ${
                              gambarAktif === gambar
                                ? "border border-primary border-2"
                                : "btn-light border"
                            }`}
                            onClick={() => setGambarAktif(gambar)}
                          >
                            <img
                              src={gambar}
                              alt={`Gambar ${index + 1}`}
                              width="55"
                              height="55"
                              style={{ objectFit: "contain" }}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Informasi Produk */}
                    <div className="p-4 p-md-5">
                      {/* Nama dan Rating */}
                      <div className="mb-4">
                        <span className="badge bg-primary bg-opacity-10 text-primary mb-2">
                          {produkDipilih.kategori || "Produk"}
                        </span>

                        <h4 className="fw-bold mb-2">{produkDipilih.nama}</h4>

                        <div className="d-flex align-items-center gap-2">
                          <i className="bi bi-star-fill text-warning"></i>
                          <span className="fw-semibold">
                            {produkDipilih.rating ?? "-"}
                          </span>
                          <span className="text-secondary">·</span>
                          <span className="text-secondary small">
                            {produkDipilih.ulasan?.length || 0} ulasan
                          </span>
                        </div>
                      </div>

                      {/* Harga */}
                      <div
                        className="rounded-3 p-3 mb-4"
                        style={{ backgroundColor: "#fff5f2" }}
                      >
                        <span className="text-secondary small d-block mb-1">
                          Harga Produk
                        </span>

                        <div className="d-flex align-items-center flex-wrap gap-2">
                          <h3
                            className="fw-bold mb-0"
                            style={{ color: "#ee4d2d" }}
                          >
                            Rp {hargaAkhir.toLocaleString("id-ID")}
                          </h3>

                          {diskon > 0 && (
                            <>
                              <span className="text-secondary text-decoration-line-through small">
                                Rp {produkDipilih.harga.toLocaleString("id-ID")}
                              </span>
                              <span className="badge bg-danger">
                                -{Math.round(diskon)}%
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Deskripsi */}
                      <div className="mb-4">
                        <h6 className="fw-bold mb-2">Deskripsi Produk</h6>
                        <p className="text-secondary small mb-0 text-break">
                          {produkDipilih.deskripsi}
                        </p>
                      </div>

                      {/* Ulasan Produk */}
                      <div className="mb-4">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h6 className="fw-bold mb-0">Ulasan Pembeli</h6>

                          <span className="text-secondary small">
                            {produkDipilih.ulasan?.length || 0} ulasan
                          </span>
                        </div>

                        {produkDipilih.ulasan?.length > 0 ? (
                          <div className="d-flex flex-column gap-3">
                            {produkDipilih.ulasan.map((review, index) => (
                              <div key={index} className="border rounded-3 p-3">
                                {/* Nama dan Rating */}
                                <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
                                  <div>
                                    <h6 className="fw-semibold small mb-1">
                                      <i className="bi bi-person-circle me-2 text-secondary"></i>
                                      {review.reviewerName}
                                    </h6>

                                    <div className="d-flex gap-1">
                                      {[1, 2, 3, 4, 5].map((star) => (
                                        <i
                                          key={star}
                                          className={`bi ${
                                            star <= review.rating
                                              ? "bi-star-fill text-warning"
                                              : "bi-star text-secondary"
                                          }`}
                                          style={{ fontSize: "12px" }}
                                        ></i>
                                      ))}
                                    </div>
                                  </div>

                                  <span className="text-secondary small">
                                    {new Date(review.date).toLocaleDateString(
                                      "id-ID",
                                      {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                      },
                                    )}
                                  </span>
                                </div>

                                {/* Komentar */}
                                <p className="text-secondary small mb-0 mt-3">
                                  {review.comment}
                                </p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center bg-light rounded-3 p-4">
                            <i className="bi bi-chat-square-text fs-2 text-secondary"></i>
                            <p className="text-secondary small mb-0 mt-2">
                              Belum ada ulasan untuk produk ini.
                            </p>
                          </div>
                        )}
                      </div>

                      <hr className="my-4" />

                      {/* Informasi Produk */}
                      <h6 className="fw-bold mb-3">Informasi Produk</h6>

                      <div className="row g-3 mb-4">
                        {[
                          ["Brand", produkDipilih.brand],
                          ["Kategori", produkDipilih.kategori],
                          ["SKU", produkDipilih.sku],
                          ["Stok", `${stok} tersedia`],
                          ["Status", produkDipilih.statusStok],
                        ].map(([label, value]) => (
                          <div className="col-6 col-md-4" key={label}>
                            <div className="p-3 rounded-3 h-100 bg-light">
                              <span className="text-secondary small d-block mb-1">
                                {label}
                              </span>
                              <span className="fw-semibold small text-break">
                                {value || "-"}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <hr className="my-4" />

                      {/* Jumlah Pembelian */}
                      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-3">
                        <div>
                          <h6 className="fw-bold mb-1">Jumlah Pembelian</h6>
                          <span className="text-secondary small">
                            Stok tersedia: {stok}
                          </span>
                        </div>

                        <div className="input-group" style={{ width: "135px" }}>
                          <button
                            className="btn btn-outline-secondary"
                            type="button"
                            disabled={jumlahBeli <= 1}
                            onClick={() =>
                              setJumlahBeli((prev) => Math.max(1, prev - 1))
                            }
                          >
                            −
                          </button>

                          <input
                            type="text"
                            className="form-control text-center"
                            value={jumlahBeli}
                            readOnly
                          />

                          <button
                            className="btn btn-outline-secondary"
                            type="button"
                            disabled={jumlahBeli >= stok}
                            onClick={() =>
                              setJumlahBeli((prev) => Math.min(stok, prev + 1))
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Subtotal */}
                      <div className="d-flex justify-content-between align-items-center p-3 rounded-3 bg-light mb-4">
                        <span className="fw-semibold">Total Pembelian</span>
                        <h5
                          className="fw-bold mb-0"
                          style={{ color: "#ee4d2d" }}
                        >
                          Rp {subtotal.toLocaleString("id-ID")}
                        </h5>
                      </div>

                      <hr className="my-4" />

                      {/* Tombol Aksi */}
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-outline-secondary flex-fill"
                          type="button"
                          onClick={() => setTampilDetail(false)}
                        >
                          Tutup
                        </button>

                        <button
                          className="btn btn-primary flex-fill"
                          type="button"
                          disabled={stok <= 0}
                          onClick={tambahKeKeranjang}
                        >
                          <i className="bi bi-cart-plus me-2"></i>
                          Tambah ke Keranjang
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
    </main>
  );
}

export default Produk;
