import { z } from "zod";

export const kontakSchema = z.object({
  nama: z
    .string()
    .min(3, "masukkan minimal 3 karakter")
    .max(20, "nama tidak boleh lebih dari 20 karakter"),
  email: z.string().email("email tidak valid"),
  topik: z.string().min(1, "wajib memilih salah satu"),
  pesan: z.string().min(100, "minimal 100 karakter"),
});

export const profileSchema = z.object({
  nama: z
    .string()
    .min(8, "masukkan minimal 8 karakter")
    .max(20, "maksimal 20 karakter"),
  email: z.string().email("email tidak valid"),
});

export const produkSchema = z
  .object({
    nama: z.string().min(3, "minimal 3 karakter"),
    deskripsi: z.string().min(10, "deskripsi minimal 10 karakter"),
    harga: z.coerce.number().positive("harga minimal 1"),
    gambarFile: z.any().optional(),
    gambarUrl: z.string().url("url tidak valid").or(z.literal("")).optional(),
  })
  .refine(
    (data) => data.gambarFile?.length > 0 || Boolean(data.gambarUrl?.trim()),
    {
      message: "silahkan upload gambar atau masukkan url gambar",
      path: ["gambarFile"],
    },
  );
