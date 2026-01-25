// src/utils/ambilSoal.js

export const ambilSoalById = (data, daftarId) => {
  // Cek apakah datanya ada
  if (!data) return [];

  // Cari item yang "ID SOAL"-nya cocok dengan daftarId
  return daftarId
    .map((id) => data.find((item) => item["ID SOAL"] === id))
    .filter((item) => item !== undefined); // Hapus yang kosong jika ID salah ketik
};