import products from "../data/produk";
import { useState } from "react";

function Produk() {
  const [jumlahProduk, setJumlahProduk] = useState(8);
  return (
    <main className="py-5 my-5">
      <section>
        <div className="container px-0">
          <h1>Semua Produk</h1>
          <p>Temukan produk pilihan untuk kebutuhan Anda</p>
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
                tabindex="-1"
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
                    <button type="button" class="btn btn-primary w-100">Reset filter</button>
                    <button type="button" class="btn btn-primary w-100">Terapkan</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between gap-3">
              <div>
                <select
                  className="form-select border-primary"
                  aria-label="Default select example"
                >
                  <option selected>Semua Kategori</option>
                  <option value="1">Smartphone</option>
                  <option value="2">Laptop</option>
                  <option value="3">Headphone</option>
                  <option value="4">Smartwach</option>
                  <option value="5">Camera</option>
                  <option value="6">Gaming</option>
                  <option value="7">Aksesoris</option>
                </select>
              </div>
              <div>
                <select
                  className="form-select border-primary"
                  aria-label="Default select example"
                >
                  <option selected>Urutkan</option>
                  <option value="1">Terlaris</option>
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
            {products.slice(0, jumlahProduk).map((product) => (
              <div className="col" key={product.id}>
                <div className="card h-100 shadow-sm rounded-1 border-0 overflow-hidden rounded-4">
                  <div
                    className="d-flex justify-content-center align-items-center py-4 position-relative"
                    style={{ backgroundColor: "#ecf4ffaf" }}
                  >
                    <i
                      className={`${product.icon} text-dark`}
                      style={{ fontSize: "100px" }}
                    ></i>
                    <button
                      className="btn btn-light rounded-circle position-absolute top-0 end-0 m-2"
                      type="button"
                    >
                      <i className="bi bi-heart text-secondary"></i>
                    </button>
                  </div>
                  <div className="card-body ">
                    <h6 className="card-title fw-bold">{product.nama}</h6>
                    <p className="card-text text-secondary">
                      {product.deskripsi}
                    </p>
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
        {jumlahProduk < products.length && (
          <div className="text-center pb-5">
            <p
              className="btntext-dark px-4 fw-bold"
              onClick={() => setJumlahProduk(products.length)}
            >
              — Lihat Lebih Banyak —
            </p>
          </div>
        )}
      </section>
    </main>
  );
}

export default Produk;
