import Notifikasi from "./notifikasi";

export default function DaftarNotifikasi({ notifs, onTutup }) {
  return (
    <div className="daftar-notif">
      {notifs.map((n) => (
        <Notifikasi
          key={n.id}
          id={n.id}
          tipe={n.tipe}
          pesan={n.pesan}
          onTutup={() => onTutup(n.id)}
        />
      ))}
    </div>
  );
}
