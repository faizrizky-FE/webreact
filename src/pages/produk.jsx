import { useState } from "react";
import { useProduk } from "../context/ProdukContext";
import { useKeranjang } from "../context/KeranjangContext";

function Produk() {
  const { produk, produkSaya } = useProduk();
  const { setKeranjang } = useKeranjang();

  const semuaProduk = [...produk, ...produkSaya];
  const [jumlahProduk, setJumlahProduk] = useState(8);
  const [produkDipilih, setProdukDipilih] = useState(null);
  const [tampilDetail, setTampilDetail] = useState(false);
  const [jumlahBeli, setJumlahBeli] = useState(1);

  const tambahKeKeranjang = () => {
  setKeranjang((prev) => {
    const produkAda = prev.find(
      (item) => item.id === produkDipilih.id,
    );

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

  return (
    <main className="py-5 my-5">
      <section>
        <div className="container px-0">
          <h1>Semua Produk</h1>
          <p>Temukan produk pilihan untuk kebutuhan Anda</p>
          <p className="text-secondary">
            Menampilkan {semuaProduk.length} produk
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
                <span>
                  <i className="bi bi-funnel text-primary me-2"></i>
                </span>{" "}
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
                <div className="offcanvas-header">
                  <h5 className="offcanvas-title" id="offcanvasScrollingLabel">
                    <i className="bi bi-bag text-primary"></i>
                    <b>
                      <span className="text-primary"> Izz</span>Shop
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
                  <div>
                    <button
                      className="btn w-100 d-flex justify-content-between align-items-center fw-bold"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#Kategori"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                    >
                      Kategori
                      <i className="bi bi-chevron-down"></i>
                    </button>

                    <div className="collapse show" id="Kategori">
                      <div className="card card-body border-0">
                        <div className="form-check mb-2">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
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
                            value=""
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
                            value=""
                            id="Headphone"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="Headphone"
                          >
                            Headphone
                          </label>
                        </div>
                        <div className="form-check mb-2">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="Smartwach"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="Smartwach"
                          >
                            Smartwach
                          </label>
                        </div>
                        <div className="form-check mb-2">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="Camera"
                          />
                          <label className="form-check-label" htmlFor="Camera">
                            Camera
                          </label>
                        </div>
                        <div className="form-check mb-2">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="Gaming"
                          />
                          <label className="form-check-label" htmlFor="Gaming">
                            Gaming
                          </label>
                        </div>
                        <div className="form-check mb-2">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="Aksesoris"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="Aksesoris"
                          >
                            Aksesoris
                          </label>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <button
                      className="btn w-100 d-flex justify-content-between align-items-center fw-bold"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#Renhar"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                    >
                      Rentang Harga
                      <i className="bi bi-chevron-down"></i>
                    </button>
                    <div className="collapse show" id="Renhar">
                      <div className="d-flex gap-2 align-items-center">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Rp 0"
                        />

                        <span>-</span>

                        <input
                          type="text"
                          className="form-control"
                          placeholder="Rp 10.000.000"
                        />
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between align-items-center gap-3">
                    <button type="button" className="btn btn-primary w-100">
                      Reset filter
                    </button>
                    <button type="button" className="btn btn-primary w-100">
                      Terapkan
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between gap-3">
              <div>
                <select
                  className="form-select border-primary"
                  aria-label="Default select example"
                  defaultValue=""
                >
                  <option value="">Semua Kategori</option>
                  <option value="1">Smartphone</option>
                  <option value="2">Laptop</option>
                  <option value="3">Tablet</option>
                  <option value="4">Headphone</option>
                  <option value="5">Smartwach</option>
                  <option value="6">Speaker</option>
                  <option value="7">Charger & aksesoris</option>
                </select>
              </div>
              <div>
                <select
                  className="form-select border-primary"
                  aria-label="Default select example"
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
        </div>
      </section>

      <section>
        <div className="container px-0 pt-3 pb-5">
          <div className="row row-cols-1 row-cols-md-4 g-4">
            {semuaProduk.slice(0, jumlahProduk).map((product) => (
              <div className="col" key={product.id}>
                <div
                  className="card h-100 shadow-sm rounded-1 border-0 overflow-hidden rounded-4"
                  onClick={() => {
                    setProdukDipilih(product);
                    setJumlahBeli(1);
                    setTampilDetail(true);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <div
                    className="d-flex justify-content-center align-items-center py-4 position-relative"
                    style={{ backgroundColor: "#ecf4ffaf" }}
                  >
                    <img
                      src={product.gambar}
                      alt={product.nama}
                      className="img-fluid"
                      style={{ height: "180px", objectFit: "contain" }}
                      onError={(e) => {
                        e.target.src = "/gambar-default.png";
                      }}
                    />
                    <button
                      className="btn btn-light rounded-circle position-absolute top-0 end-0 m-2"
                      type="button"
                    >
                      <i className="bi bi-heart text-secondary"></i>
                    </button>
                  </div>
                  <div className="card-body">
                    <h6 className="card-title fw-bold">
                      {product.nama.split(" ").length > 3
                        ? product.nama.split(" ").slice(0, 3).join(" ") + " ..."
                        : product.nama}
                    </h6>
                    <div
                      className="text-secondary overflow-auto mb-3"
                      style={{ height: "80px" }}
                    >
                      {product.deskripsi}
                    </div>
                    <h6 className="text-primary">
                      Rp {product.harga.toLocaleString("id-ID")}
                    </h6>
                    <button className="btn btn-primary w-100">
                      <i className="bi bi-cart-plus mx-2"></i> Beli Sekarang
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {jumlahProduk < semuaProduk.length && (
          <div className="text-center pb-5">
            <p
              className="btn btn-text text-secondary"
              onClick={() => setJumlahProduk(semuaProduk.length)}
            >
              — Lihat Lebih Banyak —
            </p>
          </div>
        )}
      </section>

      {tampilDetail && produkDipilih && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-xl modal-dialog-centered">
            <div className="modal-content rounded-4 border-0 overflow-hidden">
              <div className="modal-body p-0">
                <div className="row g-0">
                  {/* Gambar Produk */}
                  <div
                    className="col-md-4 border-end d-flex align-items-center justify-content-center px-0 py-5 position-relative"
                    style={{
                      backgroundColor: "#ecf4ffaf",
                    }}
                  >
                    <button
                      className="btn btn-light rounded-circle position-absolute top-0 start-0 m-3"
                      type="button"
                    >
                      <i className="bi bi-heart text-secondary fs-4"></i>
                    </button>
                    <img
                      src={produkDipilih.gambar}
                      alt={produkDipilih.nama}
                      className="img-fluid"
                      style={{ maxHeight: "300px", objectFit: "contain" }}
                    />
                  </div>

                  {/* Informasi Produk */}
                  <div className="col-md-8 p-5 position-relative">
                    <button
                      className="btn btn-light rounded-circle position-absolute top-0 end-0 m-3"
                      type="button"
                      onClick={() => setTampilDetail(false)}
                    >
                      <i className="bi bi-x-lg fs-4"></i>
                    </button>
                    <h4 className="fw-bold mb-3">{produkDipilih.nama}</h4>

                    <p className="text-secondary text-break">
                      {produkDipilih.deskripsi}
                    </p>

                    <h5 className="text-primary fw-bold mb-3">
                      Rp {produkDipilih.harga.toLocaleString("id-ID")}
                    </h5>

                    <hr />

                    {/* Jumlah Produk */}
                    <div className="d-flex align-items-center gap-3 my-4">
                      <span className="fw-semibold">Jumlah:</span>

                      <div className="input-group" style={{ width: "130px" }}>
                        <button
                          className="btn btn-outline-secondary"
                          type="button"
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
                          onClick={() => setJumlahBeli((prev) => prev + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Subtotal */}
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <span className="fw-semibold">Subtotal:</span>

                      <h5 className="text-primary fw-bold mb-0">
                        Rp{" "}
                        {(produkDipilih.harga * jumlahBeli).toLocaleString(
                          "id-ID",
                        )}
                      </h5>
                    </div>

                    <hr />

                    {/* Tombol Aksi */}
                    <div className="d-flex justify-content-end gap-2 mt-4">
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={() => setTampilDetail(false)}
                      >
                        Batal
                      </button>

                      <button className="btn btn-primary" type="button" onClick={tambahKeKeranjang}>
                        <i className="bi bi-cart-plus me-2"></i>
                        Tambah ke Keranjang
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Produk;
