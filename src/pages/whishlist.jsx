import { useWishlist } from "../context/WishlistContext";
import { useKeranjang } from "../context/KeranjangContext";

function Wishlist() {
  const { wishlist, setWishlist } = useWishlist();
  const { setKeranjang } = useKeranjang();

  const beliSekarang = (product) => {
    setKeranjang((prev) => {
      const produkAda = prev.find(
        (item) => item.id === product.id && item.nama === product.nama,
      );

      if (produkAda) {
        return prev.map((item) =>
          item.id === product.id && item.nama === product.nama
            ? { ...item, jumlah: item.jumlah + 1 }
            : item,
        );
      }

      return [...prev, { ...product, jumlah: 1 }];
    });
  };

  return (
    <main className="py-5 my-5" id="wishlist">
      <section>
        <div className="container px-0">
          <h1 className="fw-bold">Wishlist Saya</h1>
          <p className="text-secondary">Kumpulan produk yang kamu sukai.</p>
          <p className="text-secondary">Menampilkan {wishlist.length} produk</p>
        </div>
      </section>

      <section>
        <div className="container px-0 pb-5">
          {wishlist.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-heart text-danger display-1"></i>
              <h5 className="fw-bold mt-3">Wishlist masih kosong</h5>
              <p className="text-secondary">Yuk, temukan produk favoritmu!</p>
            </div>
          ) : (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
              {wishlist.map((product) => {
                const diskon = product.diskon || 0;
                const stok = product.stok ?? 0;

                const hargaAkhir = Math.round(
                  product.harga * (1 - diskon / 100),
                );

                return (
                  <div className="col" key={`${product.id}-${product.nama}`}>
                    <div className="card h-100 border rounded-3 overflow-hidden">
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
                          className="btn rounded-circle position-absolute top-0 end-0 m-2 shadow-sm d-flex align-items-center justify-content-center fs-5"
                          onClick={() =>
                            setWishlist((prev) =>
                              prev.filter(
                                (item) =>
                                  item.id !== product.id ||
                                  item.nama !== product.nama,
                              ),
                            )
                          }
                        >
                          <i className="bi bi-trash text-danger"></i>
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

                          <div className="d-flex align-items-center justify-content-between mb-3">
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

                          <button
                            type="button"
                            className="btn btn-primary btn-sm w-100"
                            disabled={stok <= 0}
                            onClick={() => beliSekarang(product)}
                          >
                            <i className="bi bi-cart-plus me-2"></i>
                            Beli Sekarang
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Wishlist;
