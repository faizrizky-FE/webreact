import { Navbar, Footer } from "./layouts/app";
import products from "./data/produk";
function App() {
  return (
    <>
      <Navbar />

      <main>
        <section className="py-5 my-3">
          <div className="container px-0 pt-5">
            <div
              className="card border-0 rounded-4 overflow-hidden"
              style={{ backgroundColor: "#eceeffc2" }}
            >
              <div className="card-body  d-flex align-items-center justify-content-between gap-4 p-0">
                <div className="ms-5 my-5">
                  <span className="badge rounded-pill bg-primary-subtle text-primary px-3 py-2">
                    Produk Terbaik
                  </span>
                  <h1 className="fw-bold">
                    Belanja Mudah
                    <br />
                    Hidup Lebih Praktis
                  </h1>
                  <p>
                    Temukan berbagai produk kebutuhan sehari-hari <br />
                    dengan harga terbaik dan kuailitas terjamin
                  </p>
                  <a href="">
                    <button type="button" class="btn btn-primary">
                      Belanja Sekarang →
                    </button>
                  </a>
                </div>
                <img
                  src="/gambar3.jpg"
                  alt="Laptop modern"
                  className="mt-5 pt-5"
                  width="500"
                  height="350"
                  style={{
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="container px-0 my-5">
            <div className="container text-center">
              <div className="row row-cols-7">
                <div className="col">
                  <a
                    href=""
                    className="bg-primary bg-opacity-10 rounded-5  d-inline-flex align-items-center justify-content-center"
                    style={{ width: "105px", height: "78px" }}
                  >
                    <i class="bi bi-phone fs-1 text-primary"></i>
                  </a>
                  <br />
                  <p className="fw-bold">Smartphone</p>
                </div>
                <div className="col">
                  <a
                    href=""
                    className="bg-primary bg-opacity-10 rounded-5  d-inline-flex align-items-center justify-content-center"
                    style={{ width: "105px", height: "78px" }}
                  >
                    <i class="bi bi-laptop fs-1 text-info"></i>
                  </a>
                  <br />
                  <p className="fw-bold">Laptop</p>
                </div>
                <div className="col">
                  <a
                    href=""
                    className="bg-primary bg-opacity-10 rounded-5  d-inline-flex align-items-center justify-content-center"
                    style={{ width: "105px", height: "78px" }}
                  >
                    <i class="bi bi-headphones fs-1 text-secondary"></i>
                  </a>
                  <br />
                  <p className="fw-bold ">Headphone</p>
                </div>
                <div className="col">
                  <a
                    href=""
                    className="bg-primary bg-opacity-10 rounded-5  d-inline-flex align-items-center justify-content-center"
                    style={{ width: "105px", height: "78px" }}
                  >
                    <i class="bi bi-smartwatch fs-1 text-success"></i>
                  </a>
                  <br />
                  <p className="fw-bold">Smartwach</p>
                </div>
                <div className="col">
                  <a
                    href=""
                    className="bg-primary bg-opacity-10 rounded-5  d-inline-flex align-items-center justify-content-center"
                    style={{ width: "105px", height: "78px" }}
                  >
                    <i class="bi bi-camera fs-1 text-primary"></i>
                  </a>
                  <br />
                  <p className="fw-bold">Camera</p>
                </div>
                <div className="col">
                  <a
                    href=""
                    className="bg-primary bg-opacity-10 rounded-5  d-inline-flex align-items-center justify-content-center"
                    style={{ width: "105px", height: "78px" }}
                  >
                    <i class="bi bi-controller fs-1 text-warning"></i>
                  </a>
                  <br />
                  <p className="fw-bold">Gaming</p>
                </div>
                <div className="col">
                  <a
                    href=""
                    className="bg-primary bg-opacity-10 rounded-5  d-inline-flex align-items-center justify-content-center"
                    style={{ width: "105px", height: "78px" }}
                  >
                    <i class="bi bi-bag-check fs-1 text-primary"></i>
                  </a>
                  <br />
                  <p className="fw-bold">Aksesoris</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="container px-0">
            <div className="d-flex align-items-center justify-content-between">
              <h2 className="fw-bold">Produk</h2>
              <a href="" className="fw-bold text-dark">
                Lihat Semua Produk
              </a>
            </div>
          </div>
          <div className="container pt-3 pb-5">
            <div className="row row-cols-1 row-cols-md-4 g-4">
              {products.slice(0, 4).map((product) => (
                <div className="col" key={product.id}>
                  <div className="card h-100 shadow-sm rounded-1 border-0 overflow-hidden rounded-4">
                    <div
                      className="d-flex justify-content-center align-items-center py-4 position-relative"
                      style={{ backgroundColor: "#ecf4ff98" }}
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
                        <i class="bi bi-cart-plus mx-2"></i> Beli Sekarang
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default App;
