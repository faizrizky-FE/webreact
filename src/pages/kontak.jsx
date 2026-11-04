function Kontak() {
  return (
    <main className="py-5 my-5">
      <section>
        <div className="container px-0">
          <div className="mb-4">
            <h1 className="fw-bold">Ada yang bisa kami bantu?</h1>
            <p className="text-secondary mb-0">
              Sampaikan pertanyaan atau masukan Anda. Kami siap membantu seputar
              produk dan pengalaman berbelanja di IzzShop.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-lg-5">
              <div
                className="card border-0 rounded-4 h-100"
                style={{ backgroundColor: "#eceeffc2" }}
              >
                <div className="card-body p-4 p-md-5">
                  <h2 className="h4 fw-bold mb-3">Hubungi tim kami</h2>
                  <p className="text-secondary mb-4">
                    Pilih topik yang ingin Anda tanyakan, lalu kirimkan pesan
                    melalui formulir. Sertakan detail yang diperlukan agar kami
                    dapat memahami kebutuhan Anda.
                  </p>

                  <div className="d-flex align-items-start gap-3 mb-4">
                    <div className="bg-white rounded-3 p-3">
                      <i className="bi bi-box-seam text-primary fs-5"></i>
                    </div>
                    <div>
                      <h3 className="h6 fw-bold mb-1">Informasi produk</h3>
                      <p className="text-secondary small mb-0">
                        Tanyakan detail dan pilihan produk.
                      </p>
                    </div>
                  </div>
                  <div className="d-flex align-items-start gap-3 mb-4">
                    <div className="bg-white rounded-3 p-3">
                      <i className="bi bi-cart-check text-primary fs-5"></i>
                    </div>
                    <div>
                      <h3 className="h6 fw-bold mb-1">Bantuan pemesanan</h3>
                      <p className="text-secondary small mb-0">
                        Sampaikan pertanyaan seputar proses belanja.
                      </p>
                    </div>
                  </div>
                  <div className="d-flex align-items-start gap-3">
                    <div className="bg-white rounded-3 p-3">
                      <i className="bi bi-chat-dots text-primary fs-5"></i>
                    </div>
                    <div>
                      <h3 className="h6 fw-bold mb-1">Saran dan masukan</h3>
                      <p className="text-secondary small mb-0">
                        Kami terbuka untuk saran demi pengalaman yang lebih
                        baik.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="card border-0 shadow-sm rounded-4">
                <div className="card-body p-4 p-md-5">
                  <h2 className="h4 fw-bold mb-4">Kirim pesan</h2>
                  <form>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label
                          htmlFor="nama"
                          className="form-label fw-semibold"
                        >
                          Nama
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="nama"
                          name="nama"
                          placeholder="Nama Anda"
                          autoComplete="name"
                        />
                      </div>
                      <div className="col-md-6">
                        <label
                          htmlFor="email"
                          className="form-label fw-semibold"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          placeholder="nama@email.com"
                          autoComplete="email"
                        />
                      </div>
                      <div className="col-12">
                        <label
                          htmlFor="topik"
                          className="form-label fw-semibold"
                        >
                          Topik
                        </label>
                        <select
                          className="form-select"
                          id="topik"
                          name="topik"
                          defaultValue=""
                        >
                          <option value="" disabled>
                            Pilih topik pesan
                          </option>
                          <option value="produk">Informasi produk</option>
                          <option value="pemesanan">Bantuan pemesanan</option>
                          <option value="masukan">Saran dan masukan</option>
                          <option value="lainnya">Lainnya</option>
                        </select>
                      </div>
                      <div className="col-12">
                        <label
                          htmlFor="pesan"
                          className="form-label fw-semibold"
                        >
                          Pesan
                        </label>
                        <textarea
                          className="form-control"
                          id="pesan"
                          name="pesan"
                          rows="5"
                          placeholder="Ceritakan kebutuhan atau pertanyaan Anda"
                        ></textarea>
                      </div>
                      <div className="col-12">
                        <button type="button" className="btn btn-primary">
                          Kirim Pesan <i className="bi bi-send ms-2"></i>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Kontak;
