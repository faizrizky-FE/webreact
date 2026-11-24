import { useState } from "react";
import "./Notifikasi.css";

const DURASI = 4000; // lama tampil (ms)

// Tentukan judul, ikon, dan warna sesuai tipe
function ambilTampilan(tipe) {
  if (tipe === "wishlist-hapus") {
    return {
      judul: "Wishlist",
      ikon: "bi-heartbreak-fill",
      warna: "secondary",
    };
  }
  if (tipe === "keranjang-hapus") {
    return {
      judul: "Keranjang",
      ikon: "bi-cart-x-fill",
      warna: "secondary",
    };
  }
  if (tipe.startsWith("wishlist")) {
    return { judul: "Wishlist", ikon: "bi-heart-fill", warna: "danger" };
  }
  return { judul: "Keranjang", ikon: "bi-cart-check-fill", warna: "success" };
}

export default function Notifikasi({ id, tipe, pesan, onTutup }) {
  const { judul, ikon, warna } = ambilTampilan(tipe);
  const [keluar, setKeluar] = useState(false);

  // Mainkan animasi keluar dulu, baru hapus
  function tutup() {
    if (keluar) return;
    setKeluar(true);
    setTimeout(onTutup, 250);
  }

  return (
    <div
      className={`notif notif-${warna} ${keluar ? "keluar" : ""}`}
      role="alert"
      data-notif-id={id}
    >
      {/* Ikon bulat */}
      <div className="notif-ikon">
        <i className={`bi ${ikon}`} />
      </div>

      {/* Isi pesan */}
      <div className="flex-grow-1">
        <strong className="d-block">{judul}</strong>
        <div className="text-secondary small">{pesan}</div>
      </div>

      {/* Tombol tutup */}
      <button
        type="button"
        className="btn-close"
        onClick={tutup}
        aria-label="Tutup"
      />

      {/* Progress bar: kalau animasinya selesai, notif ditutup */}
      <div
        className="notif-progress"
        style={{ animationDuration: `${DURASI}ms` }}
        onAnimationEnd={tutup}
      />
    </div>
  );
}
