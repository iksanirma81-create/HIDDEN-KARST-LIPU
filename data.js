/* ==========================================================================
   GUA LAUMEHE — Digital Cave Experience
   DATA TERPISAH: edit file ini untuk memperbarui konten tanpa menyentuh kode.

   Catatan penting:
   - Semua teks bertanda `draft: true` adalah DRAF / PLACEHOLDER. Belum
     diverifikasi. Ganti dengan informasi resmi dari pengelola / peneliti.
   - Tidak ada legenda, sejarah, atau fakta budaya yang dikarang di sini.
   - Posisi marker (mapPos) dalam PERSEN terhadap gambar peta, bukan GPS.
     Setelah peta asli diunggah, sesuaikan x/y agar tepat di titik peta.
   ========================================================================== */

window.LAUMEHE = {

  site: {
    name: "GUA LAUMEHE",
    subtitle: "Digital Cave Experience",
    address: "Gua Laumehe, Wantopi, Kecamatan Mawasangka Timur, Kabupaten Buton Tengah, Sulawesi Tenggara",
    addressShort: "Gua Laumehe, Wantopi, Mawasangka Timur, Sulawesi Tenggara",
    // Isi dengan tautan Google Maps resmi dari pemilik proyek.
    // Jika kosong, tombol memakai pencarian Google Maps sebagai cadangan.
    mapsUrl: "",
    mapsFallbackQuery: "Gua Laumehe Wantopi Mawasangka Timur Buton Tengah"
  },

  // Letakkan file aset di folder assets/images/ dengan nama berikut.
  // Jika file tidak ada, situs otomatis menampilkan placeholder berlabel.
  assets: {
    hero: "assets/images/hero.jpg",
    map: "assets/images/peta-gua-laumehe.jpg"
  },

  hours: {
    time: "07.00–17.00 WITA",
    days: "Konfirmasikan kepada pengelola setempat",
    reminder: "Rencanakan kunjungan sebelum jam operasional berakhir. Akses dan penelusuran ruang gua mengikuti kondisi lapangan serta arahan pengelola.",
    disclaimer: "Jam operasional ini adalah informasi yang diberikan pemilik proyek dan belum diverifikasi oleh pihak pengelola."
  },

  rulesMessage: "Jelajahi dengan bijak. Lindungi alam, hormati lingkungan, dan tinggalkan gua tanpa sampah.",
  rulesDisclaimer: "Aturan ini merupakan rancangan awal dan harus disesuaikan dengan kebijakan resmi pengelola setempat.",

  rules: [
    { icon: "🧭", text: "Ikuti arahan pemandu atau pengelola setempat." },
    { icon: "👟", text: "Gunakan alas kaki yang sesuai dan tidak licin." },
    { icon: "🔦", text: "Bawa lampu penerangan yang memadai jika diperlukan." },
    { icon: "🪨", text: "Jangan menyentuh, mematahkan, mengambil, atau merusak stalaktit dan stalagmit." },
    { icon: "🗑️", text: "Jangan membuang sampah di dalam atau sekitar gua." },
    { icon: "🖊️", text: "Jangan mencoret dinding atau meninggalkan tanda pada batuan." },
    { icon: "🔥", text: "Jangan membuat api atau merokok di dalam gua." },
    { icon: "🤫", text: "Jaga suara dan hormati pengunjung serta lingkungan sekitar." },
    { icon: "⛔", text: "Jangan memasuki lorong yang ditutup atau melanjutkan penelusuran di luar jalur yang diizinkan." },
    { icon: "👥", text: "Jangan memasuki gua sendirian; lakukan penelusuran bersama pemandu atau pendamping yang kompeten." },
    { icon: "🌧️", text: "Perhatikan kondisi cuaca, genangan air, permukaan licin, dan potensi bahaya setempat." },
    { icon: "🆘", text: "Jika merasa tidak aman atau kondisi berubah, hentikan penelusuran dan ikuti instruksi pemandu." }
  ],

  /* ---------------------------------------------------------------
     ENAM LOKASI (ID dipakai oleh peta, storytelling, virtual, galeri)
     photo : foto asli (opsional). Jika file tidak ada → placeholder.
     pano  : foto panorama 360° equirectangular (opsional, null = belum ada)
     model : model 3D (opsional, disiapkan untuk pengembangan lanjutan)
     --------------------------------------------------------------- */
  locations: [
    {
      id: "pintu-masuk", no: "01", name: "Pintu Masuk",
      photo: "assets/images/lokasi-01-pintu-masuk.jpg", pano: null, model: null,
      mapPos: { x: 14, y: 52 },
      chapterId: "bab-01",
      short: "Titik awal penelusuran Gua Laumehe.",
      desc: "Pintu Masuk adalah titik awal penelusuran. Di sinilah pengunjung menerima arahan pemandu sebelum melangkah ke dalam gua.",
      edu: "Mulut gua adalah zona transisi antara lingkungan luar dan ruang gelap di dalam. Cahaya, suhu, dan kelembapan berubah secara bertahap saat masuk lebih dalam.",
      narration: "Mulai perjalanan di sini. Dengarkan arahan pemandu, periksa alas kaki dan penerangan, lalu masuk dengan tenang.",
      caption: "Titik awal penelusuran",
      draft: true
    },
    {
      id: "ruang-stalaktit", no: "02", name: "Ruang Stalaktit",
      photo: "assets/images/lokasi-02-ruang-stalaktit.jpg", pano: null, model: null,
      mapPos: { x: 30, y: 36 },
      chapterId: "bab-03",
      short: "Ruang dengan formasi yang menggantung dari langit-langit.",
      desc: "Ruang Stalaktit menampilkan formasi batuan yang menggantung dari langit-langit gua. [Placeholder: tambahkan deskripsi ruang dari pengelola.]",
      edu: "Secara umum, stalaktit terbentuk sangat lambat dari tetesan air yang membawa mineral terlarut. Menyentuhnya dapat mengganggu pertumbuhannya.",
      narration: "Angkat pandangan. Formasi di atas terbentuk dalam waktu yang sangat panjang, jadi cukup dilihat dan jangan disentuh.",
      caption: "Formasi menggantung di langit-langit",
      draft: true
    },
    {
      id: "ruang-stalagmit", no: "03", name: "Ruang Stalagmit",
      photo: "assets/images/lokasi-03-ruang-stalagmit.jpg", pano: null, model: null,
      mapPos: { x: 46, y: 58 },
      chapterId: "bab-03",
      short: "Ruang dengan formasi yang tumbuh dari lantai gua.",
      desc: "Ruang Stalagmit menampilkan formasi batuan yang tumbuh dari lantai gua. [Placeholder: tambahkan deskripsi ruang dari pengelola.]",
      edu: "Secara umum, stalagmit tumbuh ke atas dari lantai gua oleh tetesan air bermineral. Langkah yang ceroboh bisa merusak formasi dan membuat Anda tergelincir.",
      narration: "Lihat ke bawah dan sekitar. Berjalanlah hati-hati di jalur yang diarahkan pemandu.",
      caption: "Formasi yang tumbuh dari lantai",
      draft: true
    },
    {
      id: "danau-biru", no: "04", name: "Danau Biru",
      photo: "assets/images/lokasi-04-danau-biru.jpg", pano: null, model: null,
      mapPos: { x: 60, y: 40 },
      chapterId: "bab-04",
      short: "Genangan air di dalam gua.",
      desc: "Danau Biru adalah area genangan air di dalam gua. [Placeholder: tambahkan deskripsi, kedalaman, dan ketentuan akses dari pengelola.]",
      edu: "Area air di dalam gua dapat berubah mengikuti cuaca dan membuat permukaan licin. Ikuti arahan pemandu dan jaga air tetap bersih.",
      narration: "Air membuat jalur menjadi licin. Berhenti, perhatikan pijakan, dan ikuti instruksi pemandu.",
      caption: "Area genangan air",
      draft: true
    },
    {
      id: "ruang-besar", no: "05", name: "Ruang Besar",
      photo: "assets/images/lokasi-05-ruang-besar.jpg", pano: null, model: null,
      mapPos: { x: 75, y: 60 },
      chapterId: "bab-04",
      short: "Ruang yang lapang di dalam gua.",
      desc: "Ruang Besar adalah salah satu ruang yang lapang di dalam gua. [Placeholder: tambahkan ukuran dan keunikan ruang dari data resmi.]",
      edu: "Ruang yang luas memberi gambaran tentang skala sistem gua. Suara dan cahaya berperilaku berbeda di ruang seperti ini.",
      narration: "Rasakan skala ruang ini. Jaga suara tetap rendah agar semua pengunjung bisa menikmatinya.",
      caption: "Ruang lapang di dalam gua",
      draft: true
    },
    {
      id: "ruang-akhir", no: "06", name: "Ruang Akhir",
      photo: "assets/images/lokasi-06-ruang-akhir.jpg", pano: null, model: null,
      mapPos: { x: 88, y: 38 },
      chapterId: "bab-06",
      short: "Ruang terakhir pada jalur penelusuran.",
      desc: "Ruang Akhir adalah ruang terakhir pada jalur penelusuran yang tersedia. [Placeholder: konfirmasi batas jalur yang diizinkan kepada pengelola.]",
      edu: "Jangan melanjutkan penelusuran melampaui jalur yang diizinkan. Menjaga batas jalur melindungi pengunjung sekaligus gua itu sendiri.",
      narration: "Perjalanan berakhir di sini. Kembali dengan aman dan pastikan tidak ada sampah yang tertinggal.",
      caption: "Ujung jalur penelusuran",
      draft: true
    }
  ],

  /* ---------------------------------------------------------------
     ENAM BAB STORYTELLING
     locationId menghubungkan bab ke marker pada peta.
     Ubah hubungan ini sesuai data lapangan bila perlu.
     --------------------------------------------------------------- */
  chapters: [
    {
      id: "bab-01", no: "01", title: "Mengenal Gua Laumehe",
      locationId: "pintu-masuk",
      photo: "assets/images/bab-01.jpg",
      summary: "Perkenalan singkat tentang Gua Laumehe dan lokasinya di Wantopi, Mawasangka Timur.",
      body: [
        "Gua Laumehe berada di Wantopi, Kecamatan Mawasangka Timur, Kabupaten Buton Tengah, Sulawesi Tenggara.",
        "[Placeholder: tambahkan pengantar resmi tentang gua, misalnya cara penemuan, pengelola, dan status kawasan, setelah data terverifikasi.]"
      ]
    },
    {
      id: "bab-02", no: "02", title: "Lanskap dan Lingkungan Gua",
      locationId: "pintu-masuk",
      photo: "assets/images/bab-02.jpg",
      summary: "Bentang alam dan lingkungan di sekitar gua.",
      body: [
        "Lingkungan di sekitar gua ikut menentukan kondisi di dalamnya, mulai dari vegetasi hingga aliran air.",
        "[Placeholder: tambahkan deskripsi lanskap, vegetasi, dan akses menuju gua dari sumber resmi.]"
      ]
    },
    {
      id: "bab-03", no: "03", title: "Formasi Alam dan Keunikan Gua",
      locationId: "ruang-stalaktit",
      photo: "assets/images/bab-03.jpg",
      summary: "Stalaktit, stalagmit, dan proses pembentukannya secara umum.",
      body: [
        "Stalaktit menggantung dari langit-langit, sedangkan stalagmit tumbuh dari lantai. Keduanya terbentuk sangat lambat dari tetesan air yang membawa mineral.",
        "[Placeholder: tambahkan temuan khusus Gua Laumehe dari peneliti atau pengelola.]"
      ]
    },
    {
      id: "bab-04", no: "04", title: "Menelusuri Ruang Gua",
      locationId: "danau-biru",
      photo: "assets/images/bab-04.jpg",
      summary: "Perjalanan melewati ruang demi ruang, dari Danau Biru hingga Ruang Besar.",
      body: [
        "Penelusuran mengikuti jalur yang diizinkan pengelola, melewati ruang-ruang dengan karakter berbeda.",
        "[Placeholder: tambahkan panduan jalur, estimasi waktu, dan tingkat kesulitan setelah dikonfirmasi pengelola.]"
      ]
    },
    {
      id: "bab-05", no: "05", title: "Cerita dan Pengetahuan Lokal",
      locationId: "ruang-besar",
      photo: "assets/images/bab-05.jpg",
      summary: "Ruang untuk cerita dan pengetahuan masyarakat setempat.",
      body: [
        "Bagian ini disediakan untuk cerita dan pengetahuan masyarakat setempat tentang gua.",
        "[Placeholder: isi hanya dengan narasi yang sudah diverifikasi bersama tokoh masyarakat dan pengelola. Tidak ada legenda yang dikarang di sini.]"
      ]
    },
    {
      id: "bab-06", no: "06", title: "Pelestarian dan Wisata Berkelanjutan",
      locationId: "ruang-akhir",
      photo: "assets/images/bab-06.jpg",
      summary: "Cara menikmati gua sambil menjaganya tetap lestari.",
      body: [
        "Formasi gua tumbuh sangat lambat dan mudah rusak. Tidak menyentuh, tidak mengambil, dan tidak meninggalkan sampah adalah bentuk perlindungan paling sederhana.",
        "[Placeholder: tambahkan program konservasi atau kegiatan masyarakat setempat bila ada.]"
      ]
    }
  ],

  about: {
    title: "Tentang Gua Laumehe",
    paragraphs: [
      "Gua Laumehe adalah destinasi wisata gua di Wantopi, Mawasangka Timur, Buton Tengah, Sulawesi Tenggara. Situs ini menyajikan gambaran digital agar pengunjung dapat mengenal gua sebelum berkunjung.",
      "[Placeholder: ringkasan resmi tentang gua, keunikan alam, nilai edukasi geologi, upaya konservasi, dan pengalaman wisata.]"
    ],
    pillars: [
      { icon: "🌿", title: "Keunikan Alam", text: "Ruang dan formasi gua yang terbentuk oleh proses alam." },
      { icon: "🪨", title: "Edukasi Geologi", text: "Mengenal stalaktit, stalagmit, dan proses pembentukannya." },
      { icon: "🛡️", title: "Konservasi", text: "Menikmati gua tanpa merusak dan tanpa meninggalkan sampah." },
      { icon: "🧭", title: "Pengalaman Wisata", text: "Penelusuran bersama pemandu, dengan persiapan yang tepat." }
    ]
  }
};
