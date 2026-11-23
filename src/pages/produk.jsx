import { useState, useEffect } from "react";
import { useProduk } from "../context/ProdukContext";
import { useKeranjang } from "../context/KeranjangContext";
import { useLocation } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";

const filterAwal = {
  kategori: [],
  hargaMin: "",
  hargaMax: "",
  rating: [],
  ketersediaan: [],
  brand: [],
};

const daftarKategori = [
  { nilai: "smartphones", label: "Smartphone" },
  { nilai: "laptops", label: "Laptop" },
  { nilai: "tablets", label: "Tablet" },
  { nilai: "mobile-accessories", label: "Aksesoris" },
];

function Produk({ search }) {
  const { search: locationSearch } = useLocation();
  const kategoriUrl = new URLSearchParams(locationSearch).get("kategori");
  const { produk, produkSaya } = useProduk();
  const { setKeranjang } = useKeranjang();
  const { wishlist, setWishlist } = useWishlist();

  const semuaProduk = [...produk, ...produkSaya];
  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const sudahAda = prev.some(
        (item) => item.id === product.id && item.nama === product.nama,
      );

      return sudahAda
        ? prev.filter(
            (item) => item.id !== product.id || item.nama !== product.nama,
          )
        : [...prev, product];
    });
  };
  const daftarBrand = [
    ...new Set(semuaProduk.map((item) => item.brand).filter(Boolean)),
  ];

  const [halamanAktif, setHalamanAktif] = useState(1);
  const [nomorAwal, setNomorAwal] = useState(1);
  const produkPerHalaman = 12;
  const [urutkan, setUrutkan] = useState("");
  const [produkDipilih, setProdukDipilih] = useState(null);
  const [jumlahBeli, setJumlahBeli] = useState(1);
  const [gambarAktif, setGambarAktif] = useState("");
  const [filterDraft, setFilterDraft] = useState(filterAwal);
  const [filterAktif, setFilterAktif] = useState(filterAwal);

  useEffect(() => {
    const kategoriValid = daftarKategori.some(
      (item) => item.nilai === kategoriUrl,
    );

    const filterBaru = {
      ...filterAwal,
      kategori: kategoriValid ? [kategoriUrl] : [],
    };

    setFilterDraft(filterBaru);
    setFilterAktif(filterBaru);
    setCariBrand("");
  }, [kategoriUrl]);

  const [cariBrand, setCariBrand] = useState("");
  const [tampilSaranBrand, setTampilSaranBrand] = useState(false);

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

  const hasilFilter = semuaProduk.filter((item) => {
    const cocokNama = item.nama.toLowerCase().includes(kata);
    const cocokKategori = kategoriDicari && item.kategori === kategoriDicari;
    if (!cocokNama && !cocokKategori) return false;
    if (
      filterAktif.kategori.length > 0 &&
      !filterAktif.kategori.includes(item.kategori)
    )
      return false;

    const harga = Number(item.harga);
    const min = filterAktif.hargaMin === "" ? 0 : Number(filterAktif.hargaMin);
    const max =
      filterAktif.hargaMax === "" ? Infinity : Number(filterAktif.hargaMax);
    if (harga < min || harga > max) return false;
    if (
      filterAktif.rating.length > 0 &&
      !filterAktif.rating.some((nilai) => (Number(item.rating) || 0) >= nilai)
    )
      return false;

    const stok = Number(item.stok) || 0;
    if (
      filterAktif.ketersediaan.length > 0 &&
      !filterAktif.ketersediaan.some((status) =>
        status === "tersedia" ? stok > 0 : stok <= 0,
      )
    )
      return false;

    if (filterAktif.brand.length > 0 && !filterAktif.brand.includes(item.brand))
      return false;

    return true;
  });

  hasilFilter.sort((a, b) => {
    if (urutkan === "termurah") return a.harga - b.harga;
    if (urutkan === "termahal") return b.harga - a.harga;
    if (urutkan === "terbaru") return b.id - a.id;

    return 0;
  });

  const totalHalaman = Math.ceil(hasilFilter.length / produkPerHalaman);
  const nomorAkhir = Math.min(nomorAwal + 2, totalHalaman);
  const produkDitampilkan = hasilFilter.slice(
    (halamanAktif - 1) * produkPerHalaman,
    halamanAktif * produkPerHalaman,
  );

  const toggleKategori = (nilai, dicentang) => {
    setFilterDraft((prev) => ({
      ...prev,
      kategori: dicentang
        ? [...prev.kategori, nilai]
        : prev.kategori.filter((k) => k !== nilai),
    }));
  };

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

    setProdukDipilih(null);
  };

  useEffect(() => {
    document.body.style.overflow = produkDipilih ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [produkDipilih]);

  useEffect(() => {
    setHalamanAktif(1);
    setNomorAwal(1);
  }, [search, filterAktif, urutkan]);

  useEffect(() => {
    if (halamanAktif > nomorAwal + 2) {
      setNomorAwal(halamanAktif - 2);
    } else if (halamanAktif < nomorAwal) {
      setNomorAwal(halamanAktif);
    }
  }, [halamanAktif, nomorAwal]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [halamanAktif]);

  return (
    <main className="py-5 my-5" id="daftar-produk">
      <section>
        <div className="container px-0">
          <h1>Semua Produk</h1>
          <p>Temukan produk pilihan untuk kebutuhan Anda</p>
          <p className="text-secondary">
            Menampilkan {hasilFilter.length} produk
          </p>
        </div>
      </section>

      <section>
        <div className="container px-0">
          <div className="d-flex align-items-center justify-content-between">
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
                      {daftarKategori.map((k) => (
                        <div className="form-check mb-2" key={k.nilai}>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={k.nilai}
                            checked={filterDraft.kategori.includes(k.nilai)}
                            onChange={(e) =>
                              toggleKategori(k.nilai, e.target.checked)
                            }
                          />

                          <label className="form-check-label" htmlFor={k.nilai}>
                            {k.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <hr />

                  <div className="mb-3">
                    <h6 className="fw-bold mb-3">
                      <i className="bi bi-cash-stack me-2 text-primary"></i>
                      Rentang Harga
                    </h6>

                    <div className="d-flex gap-2 align-items-center">
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        value={filterDraft.hargaMin}
                        onChange={(e) =>
                          setFilterDraft((prev) => ({
                            ...prev,
                            hargaMin: e.target.value,
                          }))
                        }
                        placeholder="Min. harga"
                      />

                      <span className="text-secondary">-</span>

                      <input
                        type="number"
                        className="form-control form-control-sm"
                        value={filterDraft.hargaMax}
                        onChange={(e) =>
                          setFilterDraft((prev) => ({
                            ...prev,
                            hargaMax: e.target.value,
                          }))
                        }
                        placeholder="Maks. harga"
                      />
                    </div>
                  </div>

                  <hr />

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
                          checked={filterDraft.rating.includes(Number(nilai))}
                          onChange={(e) =>
                            setFilterDraft((prev) => ({
                              ...prev,
                              rating: e.target.checked
                                ? [...prev.rating, Number(nilai)]
                                : prev.rating.filter(
                                    (r) => r !== Number(nilai),
                                  ),
                            }))
                          }
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
                        checked={filterDraft.ketersediaan.includes("tersedia")}
                        onChange={(e) =>
                          setFilterDraft((prev) => ({
                            ...prev,
                            ketersediaan: e.target.checked
                              ? [...prev.ketersediaan, "tersedia"]
                              : prev.ketersediaan.filter(
                                  (status) => status !== "tersedia",
                                ),
                          }))
                        }
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
                        checked={filterDraft.ketersediaan.includes("habis")}
                        onChange={(e) =>
                          setFilterDraft((prev) => ({
                            ...prev,
                            ketersediaan: e.target.checked
                              ? [...prev.ketersediaan, "habis"]
                              : prev.ketersediaan.filter(
                                  (status) => status !== "habis",
                                ),
                          }))
                        }
                      />
                      <label className="form-check-label" htmlFor="habis">
                        Stok habis
                      </label>
                    </div>
                  </div>

                  <hr />

                  <div className="mb-3">
                    <h6 className="fw-bold mb-3">
                      <i className="bi bi-tags me-2 text-primary"></i>
                      Brand
                    </h6>
                    <div className="position-relative">
                      <input
                        type="text"
                        className="form-control pe-5"
                        placeholder="Cari brand..."
                        value={cariBrand}
                        onChange={(e) => {
                          setCariBrand(e.target.value);
                          setTampilSaranBrand(true);
                          setFilterDraft((prev) => ({
                            ...prev,
                            brand: [],
                          }));
                        }}
                        onFocus={() => setTampilSaranBrand(true)}
                      />

                      {cariBrand && (
                        <button
                          type="button"
                          className="btn-close position-absolute top-50 end-0 translate-middle-y me-3"
                          onClick={() => {
                            setCariBrand("");
                            setFilterDraft((prev) => ({
                              ...prev,
                              brand: [],
                            }));
                            setTampilSaranBrand(false);
                          }}
                        />
                      )}
                    </div>
                    {tampilSaranBrand &&
                      cariBrand.trim() &&
                      daftarBrand
                        .filter((brand) =>
                          brand.toLowerCase().includes(cariBrand.toLowerCase()),
                        )
                        .map((brand) => (
                          <button
                            key={brand}
                            type="button"
                            className="btn btn-light border w-100 text-start mt-1"
                            onClick={() => {
                              setCariBrand(brand);
                              setFilterDraft((prev) => ({
                                ...prev,
                                brand: [brand],
                              }));
                              setTampilSaranBrand(false);
                            }}
                          >
                            {brand}
                          </button>
                        ))}
                  </div>

                  <hr />

                  <div className="d-flex gap-2">
                    <button
                      type="button"
                      className="btn btn-outline-secondary w-100"
                      onClick={() => {
                        setFilterDraft(filterAwal);
                        setFilterAktif(filterAwal);
                        setCariBrand("");
                        setTampilSaranBrand(false);
                      }}
                    >
                      Reset Filter
                    </button>

                    <button
                      type="button"
                      className="btn btn-primary w-100"
                      onClick={() => setFilterAktif(filterDraft)}
                      data-bs-dismiss="offcanvas"
                    >
                      Terapkan
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center gap-2">
              <select
                className="form-select border-primary"
                value={filterAktif.kategori[0] || ""}
                onChange={(e) =>
                  setFilterAktif((prev) => ({
                    ...prev,
                    kategori: e.target.value ? [e.target.value] : [],
                  }))
                }
              >
                <option value="">Semua</option>
                <option value="smartphones">Smartphone</option>
                <option value="laptops">Laptop</option>
                <option value="tablets">Tablet</option>
                <option value="mobile-accessories">Aksesoris</option>
              </select>

              <select
                className="form-select border-primary"
                value={urutkan}
                onChange={(e) => setUrutkan(e.target.value)}
                aria-label="Urutkan produk"
                defaultValue=""
              >
                <option value="">Urutkan</option>
                <option value="terbaru">Terbaru</option>
                <option value="termurah">Termurah</option>
                <option value="termahal">Termahal</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container px-0 pt-3 pb-5">
          <div className="row row-cols-1 row-cols-md-4 g-3">
            {hasilFilter.length === 0 ? (
              <div className="col-12 text-center py-5">
                <i className="bi bi-search fs-1 text-secondary"></i>
                <h5 className="mt-3">Produk tidak ditemukan</h5>
                <p className="text-secondary">
                  Coba gunakan kata kunci lainnya.
                </p>
              </div>
            ) : (
              produkDitampilkan.map((product) => {
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
                      }}
                      style={{
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    >
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
                          className="btn btn-light rounded-circle position-absolute top-0 end-0 m-2 shadow-sm d-flex align-items-center justify-content-center"
                          style={{ width: "35px", height: "35px" }}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlist(product);
                          }}
                        >
                          <i
                            className={`bi ${
                              wishlist.some(
                                (item) =>
                                  item.id === product.id &&
                                  item.nama === product.nama,
                              )
                                ? "bi-heart-fill text-danger"
                                : "bi-heart text-secondary"
                            } pt-1`}
                          ></i>
                        </button>
                      </div>

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

                        <div className="mt-auto">
                          <h6
                            className="fw-bold mb-2"
                            style={{ color: "#ee4d2d" }}
                          >
                            Rp {hargaAkhir.toLocaleString("id-ID")}
                          </h6>

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
        {totalHalaman > 1 && (
          <nav className="d-flex justify-content-center pb-5">
            <ul className="pagination mb-0">
              <li
                className={`page-item ${halamanAktif === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => setHalamanAktif((prev) => prev - 1)}
                  disabled={halamanAktif === 1}
                >
                  <i className="bi bi-chevron-left"></i>
                </button>
              </li>

              {Array.from(
                { length: nomorAkhir - nomorAwal + 1 },
                (_, i) => nomorAwal + i,
              ).map((halaman) => (
                <li
                  key={halaman}
                  className={`page-item ${halamanAktif === halaman ? "active" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => setHalamanAktif(halaman)}
                  >
                    {halaman}
                  </button>
                </li>
              ))}

              <li
                className={`page-item ${halamanAktif === totalHalaman ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => setHalamanAktif((prev) => prev + 1)}
                  disabled={halamanAktif === totalHalaman}
                >
                  <i className="bi bi-chevron-right"></i>
                </button>
              </li>
            </ul>
          </nav>
        )}
      </section>

      {produkDipilih &&
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
                    onClick={() => setProdukDipilih(null)}
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
                    <div
                      className="position-relative d-flex align-items-center justify-content-center p-4"
                      style={{
                        height: "320px",
                        background: "linear-gradient(135deg, #f1f5f9, #e2eaf5)",
                      }}
                    >
                      <button
                        type="button"
                        className="btn btn-light rounded-circle position-absolute top-0 end-0 m-2 shadow-sm d-flex align-items-center justify-content-center"
                        style={{ width: "35px", height: "35px" }}
                        onClick={() => toggleWishlist(produkDipilih)}
                      >
                        <i
                          className={`bi ${
                            wishlist.some(
                              (item) =>
                                item.id === produkDipilih.id &&
                                item.nama === produkDipilih.nama,
                            )
                              ? "bi-heart-fill text-danger"
                              : "bi-heart text-secondary"
                          } pt-1`}
                        ></i>
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

                    <div className="p-4 p-md-5">
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

                      <div className="mb-4">
                        <h6 className="fw-bold mb-2">Deskripsi Produk</h6>
                        <p className="text-secondary small mb-0 text-break">
                          {produkDipilih.deskripsi}
                        </p>
                      </div>

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

                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-outline-secondary flex-fill"
                          type="button"
                          onClick={() => setProdukDipilih(null)}
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
