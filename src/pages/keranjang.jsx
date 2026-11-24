import { useState } from "react";
import { useKeranjang } from "../context/KeranjangContext";
import { useNotifikasi } from "../context/NotifikasiContext";

function Keranjang() {
  const { keranjang, setKeranjang } = useKeranjang();
  const { tampilkanNotifikasi } = useNotifikasi();
  const [produkDihapus, setProdukDihapus] = useState(null);

  const formatRupiah = (harga) => "Rp " + harga.toLocaleString("id-ID");

  const ubahJumlah = (id, perubahan) => {
    setKeranjang((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, jumlah: Math.max(1, item.jumlah + perubahan) }
          : item,
      ),
    );
  };

  const hapusProduk = () => {
    if (!produkDihapus) return;
    setKeranjang((prev) => prev.filter((item) => item.id !== produkDihapus.id));
    tampilkanNotifikasi(
      "keranjang-hapus",
      "Produk berhasil dihapus dari keranjang.",
    );
    setProdukDihapus(null);
  };

  const totalProduk = keranjang.reduce((total, item) => total + item.jumlah, 0);

  const totalHarga = keranjang.reduce(
    (total, item) => total + item.harga * item.jumlah,
    0,
  );

  return (
    <main className="bg-secondary bg-opacity-10 pb-4">
      <div className="container px-0 py-5 mt-3">
        <div className="mb-4 mt-2">
          <div className="d-flex align-items-center gap-3 mt-2">
            <i
              className="bi bi-cart3 text-primary"
              style={{ fontSize: "60px" }}
            ></i>
            <div className="mt-3">
              <h1 className="fw-bold mb-1">Keranjang Belanja</h1>
              <p className="text-secondary mb-0">
                Lihat dan atur produk yang ada di keranjang Anda.
              </p>
            </div>
          </div>
        </div>

        <div className="row g-3">
          {/* Daftar Produk */}
          <div className="col-lg-9">
            <div className="card border rounded-4 shadow-sm">
              {keranjang.length > 0 ? (
                <>
                  {/* Judul Kolom */}
                  <div className="row align-items-center px-4 py-3 border-bottom d-none d-md-flex text-secondary fw-semibold">
                    <div className="col-md-5">Produk</div>
                    <div className="col-md-2 text-center">Harga</div>
                    <div className="col-md-2 text-center">Jumlah</div>
                    <div className="col-md-3 text-end">Subtotal</div>
                  </div>

                  {/* Isi Keranjang */}
                  <div className="px-3 px-md-4">
                    {keranjang.map((item) => (
                      <div
                        className="row align-items-center py-4 border-bottom g-3"
                        key={item.id}
                      >
                        {/* Informasi Produk */}
                        <div className="col-12 col-md-5">
                          <div className="d-flex align-items-center gap-3">
                            <div
                              className="rounded-3 d-flex align-items-center justify-content-center flex-shrink-0"
                              style={{
                                width: "90px",
                                height: "90px",
                                backgroundColor: "#ecf4ff",
                              }}
                            >
                              <img
                                src={item.gambar}
                                alt={item.nama}
                                className="img-fluid"
                                style={{
                                  width: "75px",
                                  height: "75px",
                                  objectFit: "contain",
                                }}
                                onError={(e) => {
                                  e.target.src = "/gambar-default.png";
                                }}
                              />
                            </div>

                            <div>
                              <h6 className="fw-bold mb-1">{item.nama}</h6>
                              <p className="text-secondary small mb-0">
                                {item.deskripsi.split(" ").length > 12
                                  ? item.deskripsi
                                      .split(" ")
                                      .slice(0, 12)
                                      .join(" ") + " ..."
                                  : item.deskripsi}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Harga */}
                        <div className="col-6 col-md-2 text-md-center">
                          <span className="d-md-none text-secondary small">
                            Harga
                          </span>
                          <div className="fw-semibold">
                            {formatRupiah(item.harga)}
                          </div>
                        </div>

                        {/* Jumlah */}
                        <div className="col-6 col-md-2">
                          <span className="d-md-none text-secondary small">
                            Jumlah
                          </span>

                          <div
                            className="input-group input-group-sm mx-md-auto"
                            style={{ maxWidth: "125px" }}
                          >
                            <button
                              className="btn btn-light border"
                              type="button"
                              onClick={() => ubahJumlah(item.id, -1)}
                            >
                              −
                            </button>

                            <input
                              type="text"
                              className="form-control text-center"
                              value={item.jumlah}
                              readOnly
                            />

                            <button
                              className="btn btn-light border"
                              type="button"
                              onClick={() => ubahJumlah(item.id, 1)}
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Subtotal dan Hapus */}
                        <div className="col-12 col-md-3">
                          <div className="d-flex align-items-center justify-content-between justify-content-md-end gap-3">
                            <div>
                              <span className="d-md-none text-secondary small">
                                Subtotal
                              </span>
                              <div className="fw-bold">
                                {formatRupiah(item.harga * item.jumlah)}
                              </div>
                            </div>

                            <button
                              className="btn btn-link text-secondary p-1"
                              type="button"
                              onClick={() => setProdukDihapus(item)}
                              title="Hapus produk"
                            >
                              <i className="bi bi-trash3 fs-5"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                /* Keranjang Kosong */
                <div className="text-center py-5 px-3">
                  <i className="bi bi-cart-x text-secondary display-1"></i>
                  <h5 className="fw-bold mt-3">Keranjang masih kosong</h5>
                  <p className="text-secondary mb-0">
                    Yuk, pilih produk yang ingin kamu beli.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Ringkasan Belanja */}
          <div className="col-lg-3">
            <div className="card border rounded-4 shadow-sm p-4">
              <h4 className="fw-bold mb-4">Ringkasan Belanja</h4>

              <div className="d-flex justify-content-between mb-3">
                <span className="text-secondary">Total Produk</span>
                <span className="fw-semibold">{totalProduk} Barang</span>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-4">
                <span className="text-secondary">Total Harga</span>
                <h4 className="text-primary fw-bold mb-0">
                  {formatRupiah(totalHarga)}
                </h4>
              </div>

              <hr />

              <button
                className="btn btn-primary btn-lg w-100 rounded-3 mt-2"
                type="button"
                disabled={keranjang.length === 0}
              >
                <i className="bi bi-bag-check me-2"></i>
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>

      {produkDihapus && (
        <>
          <div
            className="modal fade show d-block"
            role="dialog"
            aria-modal="true"
            aria-labelledby="konfirmasi-hapus-keranjang"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="konfirmasi-hapus-keranjang">
                    Hapus dari Keranjang?
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Batal"
                    onClick={() => setProdukDihapus(null)}
                  />
                </div>
                <div className="modal-body">
                  <i className="bi bi-exclamation-triangle-fill text-warning me-2"></i>
                  Produk <strong>{produkDihapus.nama}</strong> akan dihapus dari
                  keranjang.
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setProdukDihapus(null)}
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={hapusProduk}
                  >
                    Ya, Hapus
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </main>
  );
}

export default Keranjang;
