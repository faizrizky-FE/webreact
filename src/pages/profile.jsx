import { useState } from "react";
import products from "../data/produk";
import useFormValidasi from "../hooks/useFormValidasi";
import { profileSchema, produkSchema } from "../utils/validasiForm";
import { useProduk } from "../context/ProdukContext";

function Profile() {
  const { produkSaya, setProdukSaya } = useProduk();
  const [jumlahProduk, setJumlahProduk] = useState(4);
  const [tampilPopup, setTampilPopup] = useState(false);
  const [fotoProfil, setFotoProfil] = useState(null);
  const [produkEdit, setProdukEdit] = useState(null);

  const kirimPesan = async (data) => {
    console.log("mengirim...");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("berhasil terkirim!");
    console.log(data);
  };
  const simpanProduk = async (data) => {
    const file = data.gambarFile?.[0];

    const gambar = file ? URL.createObjectURL(file) : data.gambarUrl;

    const produkBaru = {
      id: produkEdit ? produkEdit.id : Date.now(),
      nama: data.nama,
      deskripsi: data.deskripsi,
      harga: Number(data.harga),
      gambar,
    };
    setProdukSaya((prev) =>
      produkEdit
        ? prev.map((product) =>
            product.id === produkEdit.id ? produkBaru : product,
          )
        : [...prev, produkBaru],
    );
    setTampilPopup(false);
    setProdukEdit(null);
  };

  const {
    register,
    submitForm,
    errors,
    isSubmitting,
    berhasil,
    gagal,
    resetStatus,
    batalForm,
  } = useFormValidasi(profileSchema, kirimPesan);

  const {
    register: registerProduk,
    submitForm: submitProdukForm,
    errors: errorProduk,
    isSubmitting: sedangMenyimpanProduk,
    reset: resetProduk,
    batalForm: batalProdukForm,
  } = useFormValidasi(produkSchema, simpanProduk);

  return (
    <main className="bg-secondary bg-opacity-10 pb-5 py-5 my-3">
      <div className="container px-0">
        <section className="d-flex align-item-center gap-3 mb-5">
          <div className="mt-2">
            <i
              className="bi bi-person-fill text-primary"
              style={{ fontSize: "60px" }}
            ></i>
          </div>
          <div className="mt-3">
            <div className="lh-4">
              <h1 className="fw-bold my-0">Profile Pengguna</h1>
              <p className="text-secondary my-1">
                kelolas informasi akun dan produk anda di sini.
              </p>
            </div>
          </div>
        </section>
        <section className="mb-4">
          <div className="card rounded-4">
            <div className="card-body">
              <div className="d-flex align-item-center gap-3">
                <div className="d-flex align-item-center px-4 pt-4 gap-3">
                  <div
                    className="mx-2 position-relative border-primary p-1 text-dark bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center"
                    style={{ width: "130px", height: "130px" }}
                  >
                    {fotoProfil ? (
                      <img
                        src={fotoProfil}
                        alt="Foto Profil"
                        className="w-100 h-100 object-fit-cover rounded-circle"
                      />
                    ) : (
                      <i
                        className="bi bi-person-fill text-primary"
                        style={{ fontSize: "100px" }}
                      ></i>
                    )}
                    <label
                      htmlFor="fotoProfil"
                      className="position-absolute bottom-0 end-0 bg-primary text-white rounded-circle d-flex align-items-center justify-content-center border border-3 border-white"
                      style={{ width: "42px", height: "42px" }}
                    >
                      <i className="bi bi-camera-fill"></i>
                    </label>

                    <input
                      type="file"
                      id="fotoProfil"
                      accept="image/*"
                      className="d-none"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setFotoProfil(URL.createObjectURL(file));
                        }
                      }}
                    />
                  </div>
                  <div className="lh-1">
                    <h2 className="fw-bold">Faiz Rizky S.</h2>
                    <p className="text-secondary">
                      <i className="bi bi-envelope"> example@gmail.com</i>
                    </p>
                    <span className="badge rounded-pill bg-primary-subtle text-primary px-3 py-2">
                      <i className="bi bi-shield-shaded"></i> Pengguna
                    </span>
                    <br />
                    <button className="btn btn-text text-danger mt-2">
                      <i className="bi bi-box-arrow-in-left me-1"></i>Logout
                    </button>
                  </div>
                </div>
                <div className="vr ms-5 me-3"></div>
                <div className="pt-4 pb-1 flex-grow-1 me-4">
                  <h5 className="fw-bold mb-3">
                    <i className="bi bi-pencil-square text-primary me-2"></i>
                    Edit Profile
                  </h5>
                  <form onSubmit={submitForm}>
                    <div className="row g-3 mb-4">
                      <div className="col-md-6">
                        <label
                          htmlFor="Nama Lengkap"
                          className="form-label fw-semibold"
                        >
                          Nama Lengkap
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Masukkan Nama Anda"
                          {...register("nama", { onChange: resetStatus })}
                        />
                        {errors.nama && (
                          <small className="text-danger">
                            {errors.nama.message}
                          </small>
                        )}
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
                          placeholder="example@gmail.com"
                          {...register("email", { onChange: resetStatus })}
                        />
                        {errors.email && (
                          <small className="text-danger">
                            {errors.email.message}
                          </small>
                        )}
                      </div>
                    </div>
                    <div className="d-flex align-item-center gap-3 mb-3">
                      <div>
                        <button
                          type="submit"
                          className="btn btn-primary"
                          disabled={isSubmitting}
                        >
                          {!isSubmitting && (
                            <i className="bi bi-floppy ms-2 me-3"></i>
                          )}
                          {isSubmitting ? "mengirim..." : "Simpan Perubahan"}
                        </button>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="btn btn-outline-secondary text-dark"
                          onClick={batalForm}
                        >
                          Batal
                        </button>
                      </div>
                    </div>
                    {berhasil && (
                      <div className="text-success">
                        Berhasil menyimpan perubahan!
                      </div>
                    )}
                    {gagal && (
                      <div className="text-danger">
                        gagal menyimpan perubahan!
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="card rounded-4">
            <div className="container">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="mt-2">
                    <i
                      className="bi bi-box-seam-fill me-3 text-primary"
                      style={{ fontSize: "40px" }}
                    ></i>
                  </div>
                  <div className="mt-2 flex-grow-1">
                    <div className="d-flex align-items-center justify-content-between gap-4">
                      <div>
                        <h3 className="fw-bold my-0">Produk Saya</h3>
                        <p className="text-secondary my-1">
                          Tambahkan, edit, atau hapus produk Anda
                        </p>
                      </div>
                      <div>
                        <button
                          className="btn btn-primary fs-5"
                          onClick={() => {
                            batalProdukForm();
                            setProdukEdit(null);
                            setTampilPopup(true);
                          }}
                        >
                          <i className="bi bi-plus-lg me-2"></i>
                          <small>Tambah Produk</small>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-5">
                <div className="row row-cols-1 row-cols-md-4 g-3 mx-4">
                  {produkSaya.length === 0 ? (
                    <p className="text-secondary text-center py-5">
                      Kamu belum menambahkan produk.
                    </p>
                  ) : (
                    produkSaya.map((product) => (
                      <div className="col" key={product.id}>
                        <div className="card h-100 rounded-4">
                          <div className="card-body">
                            <img
                              src={product.gambar}
                              alt={product.nama}
                              className="img-fluid w-100 mb-3"
                              style={{ height: "150px", objectFit: "contain" }}
                            />
                            <h6 className="fw-bold">{product.nama}</h6>
                            <h6 className="text-primary">
                              Rp {product.harga.toLocaleString("id-ID")}
                            </h6>
                            <div className="d-flex gap-2 mt-3">
                              <button
                                className="btn btn-outline-primary btn-sm"
                                onClick={() => {
                                  setProdukEdit(product);
                                  resetProduk({
                                    nama: product.nama,
                                    deskripsi: product.deskripsi,
                                    harga: product.harga,
                                    gambarFile: undefined,
                                    gambarUrl: product.gambar,
                                  });
                                  setTampilPopup(true);
                                }}
                              >
                                <i className="bi bi-pencil me-2"></i>Edit
                              </button>
                              <button
                                className="btn btn-outline-danger btn-sm"
                                onClick={() => {
                                  setProdukSaya((prev) =>
                                    prev.filter(
                                      (item) => item.id !== product.id,
                                    ),
                                  );
                                }}
                              >
                                <i className="bi bi-trash3 me-2"></i>Hapus
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {tampilPopup && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">
                  {produkEdit ? "Edit Produk" : "Tambah Produk"}
                </h5>

                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    batalProdukForm();
                    setProdukEdit(null);
                    setTampilPopup(false);
                  }}
                ></button>
              </div>

              <div className="modal-body">
                <form action="" onSubmit={submitProdukForm}>
                  <div className="mb-3">
                    <label
                      htmlFor="Nama Produk"
                      className="form-label fw-semibold"
                    >
                      Nama produk
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="masukkan nama produk"
                      {...registerProduk("nama")}
                    />
                    {errorProduk.nama && (
                      <small className="text-danger">
                        {errorProduk.nama.message}
                      </small>
                    )}
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="deskripsi produk"
                      className="form-label fw-semibold"
                    >
                      Deskripsi produk
                    </label>
                    <textarea
                      rows="3"
                      className="form-control"
                      placeholder="tambahkan deskripsi"
                      {...registerProduk("deskripsi")}
                    />
                    {errorProduk.deskripsi && (
                      <small className="text-danger">
                        {errorProduk.deskripsi.message}
                      </small>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="Harga" className="form-label fw-semibold">
                      Harga
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="masukkan harga"
                      {...registerProduk("harga")}
                    />
                    {errorProduk.harga && (
                      <small className="text-danger">
                        {errorProduk.harga.message}
                      </small>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Upload Gambar Produk
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      {...registerProduk("gambarFile")}
                    />
                    {errorProduk.gambarFile && (
                      <small className="text-danger">
                        {errorProduk.gambarFile.message}
                      </small>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Atau Masukkan URL Gambar
                    </label>
                    <input
                      type="url"
                      className="form-control"
                      placeholder="https://contoh.com/gambar.jpg"
                      {...registerProduk("gambarUrl")}
                    />
                    {errorProduk.gambarUrl && (
                      <small className="text-danger">
                        {errorProduk.gambarUrl.message}
                      </small>
                    )}
                  </div>
                  <div className="d-flex justify-content-end gap-2 mt-4">
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => {
                        batalProdukForm();
                        setProdukEdit(null);
                        setTampilPopup(false);
                      }}
                    >
                      Batal
                    </button>

                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={sedangMenyimpanProduk}
                    >
                      {sedangMenyimpanProduk ? "Menyimpan..." : "Simpan Produk"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Profile;
