# Aset gambar Gua Laumehe

Letakkan file asli di folder ini dengan nama berikut. File yang belum ada akan
otomatis diganti placeholder berlabel "PLACEHOLDER — Foto asli belum diunggah".

| File | Fungsi |
|------|--------|
| `hero.jpg` | Foto lanskap latar hero (disarankan 1920×1080, di bawah 400 KB) |
| `peta-gua-laumehe.jpg` | Peta asli Gua Laumehe (JANGAN digambar ulang atau diubah) |
| `lokasi-01-pintu-masuk.jpg` | Foto Pintu Masuk |
| `lokasi-02-ruang-stalaktit.jpg` | Foto Ruang Stalaktit |
| `lokasi-03-ruang-stalagmit.jpg` | Foto Ruang Stalagmit |
| `lokasi-04-danau-biru.jpg` | Foto Danau Biru |
| `lokasi-05-ruang-besar.jpg` | Foto Ruang Besar |
| `lokasi-06-ruang-akhir.jpg` | Foto Ruang Akhir |
| `bab-01.jpg` … `bab-06.jpg` | Foto untuk tiap bab storytelling |

## Panorama 360° / model 3D
Tambahkan file panorama equirectangular (mis. `pano-01.jpg`), lalu isi
`pano: "assets/images/pano-01.jpg"` pada lokasi terkait di `js/data.js`.
Viewer 360° akan aktif otomatis dan label "pratinjau" berubah.

## Menyesuaikan marker pada peta
Setelah peta asli diunggah, ubah `mapPos: { x, y }` (persen dari kiri/atas
gambar) tiap lokasi di `js/data.js` agar tepat di titik pada peta.
