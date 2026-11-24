/** Semua teks VO, headline, chip, dan potongan subtitle (frame lokal per scene). */
export type Sub = [from: number, to: number, text: string];

export const VO = {
  s1: 'Stok E D numpuk di gudang... apotek ini sampe rugi jutaan!',
  s2: 'Jadi gini ceritanya. Apotek ini selalu rame, dan yang jaga cuma dua orang. Pas jam rame, ada barang datang.',
  s3: 'Sales minta faktur cepat ditandatangani. Karena antrian panjang, barang dicek seadanya... dan langsung ditandatangan.',
  s4: 'Beberapa bulan kemudian, baru ketahuan. Ternyata, ada produk yang nggak ada di surat pesanan, E D nya tinggal hitungan bulan!',
  s5a: 'Mau retur? Ditolak. Karena fakturnya sudah ditandatangani apotek. Hmm...',
  s5b: 'Sales nakal memang selalu ada... tapi celahnya, juga bisa ada di cara kita terima barang.',
  s6: 'Di Apotek Digital, setiap faktur masuk langsung dicocokkan dengan surat pesanan. Produk di luar S P, harga berubah nggak wajar, sampai E D kurang dari setahun... langsung ketahuan. Jadi, bisa cek cepat, walau apotek lagi ramai.',
  s7: 'Pernah kecolongan juga? Tulis di komentar. Coba gratis Apotek Digital.',
};

// *kata* = kata kunci (kuning di subtitle). Maks 6 kata per potongan.
export const SUBS: Record<string, Sub[]> = {
  s1: [
    [0, 62, 'Stok *ED* numpuk di gudang…'],
    [62, 120, 'Apotek ini sampe *rugi* *jutaan*!'],
  ],
  s2: [
    [0, 36, 'Jadi gini ceritanya…'],
    [36, 112, 'Apotek rame, yang jaga *2* *orang*'],
    [112, 180, 'Pas jam rame, *barang* *datang*'],
  ],
  s3: [
    [0, 70, 'Sales minta faktur *cepat* *ditandatangani*'],
    [70, 140, 'Antrian panjang, dicek *seadanya*…'],
    [140, 210, '…dan langsung *ditandatangan*'],
  ],
  s4: [
    [0, 75, 'Beberapa bulan kemudian, *baru* *ketahuan*'],
    [75, 165, 'Ternyata produk *tidak* *ada* di SP'],
    [165, 300, 'ED tinggal *hitungan* *bulan*!'],
  ],
  s5: [
    [0, 40, 'Mau *retur*? Ditolak.'],
    [40, 120, 'Faktur *sudah* *ditandatangani* apotek. Hmm…'],
    [120, 196, 'Sales nakal *memang* *selalu* *ada*…'],
    [212, 270, 'Celahnya bisa di cara *terima* *barang*'],
  ],
  s6: [
    [0, 95, 'Faktur masuk *langsung* *dicocokkan*'],
    [95, 200, 'Di luar SP, harga *tak* *wajar*'],
    [200, 290, 'ED kurang dari *setahun*… *ketahuan*'],
    [290, 390, 'Jadi bisa cek cepat, *walau* *ramai*'],
  ],
  s7: [
    [0, 90, 'Pernah *kecolongan*? Tulis di komentar'],
    [90, 180, 'Coba *gratis* Apotek Digital'],
  ],
};

export const HEAD = {
  s1: {kicker: 'APOTEK INI', lines: ['STOK *ED*', 'NUMPUK,', '*RUGI* *JUTAAN*']},
  s2: {kicker: 'SETIAP HARI', lines: ['APOTEK RAMAI,', 'YANG JAGA', 'CUMA *2* *ORANG*']},
  s3: {lines: ['DICEK *SEADANYA,*', 'LANGSUNG', 'TANDA TANGAN']},
  s4: {kicker: 'BEBERAPA BULAN KEMUDIAN…'},
  s5a: {lines: ['SALES *NAKAL*', 'MEMANG ADA…']},
  s5b: {lines: ['TAPI CELAHNYA', 'DI CARA KITA', '^TERIMA^ ^BARANG^']},
  s6: {kicker: 'PAKAI APOTEK DIGITAL', lines: ['BARANG MASUK', 'LANGSUNG', '_DICOCOKKAN_']},
  s7a: {lines: ['PERNAH', '*KECOLONGAN*', 'JUGA?']},
  s7b: {lines: ['STOK ~AMAN.~', 'MODAL ~AMAN.~']},
};

export const CHIPS = {
  s1: '😱 kok bisa numpuk gini?',
  s2: 'antre 8 pasien',
  s3a: 'tanda tangan aja ya, Kak 🙏',
  s3b: '+2 dus di luar SP',
  s4x: ['TIDAK ADA DI SP', 'ED TINGGAL 4 BULAN', 'NGGAK LAKU, NUMPUK'],
  s5chat: 'Maaf Bu, fakturnya sudah ditandatangani apotek 🙏',
  s6: ['🚫 tidak dipesan (di luar SP)', '📈 harga berubah tak wajar', '⏳ ED kurang dari setahun', '⚡ cek cepat walau lagi ramai'],
  s7: 'Tulis di komentar 👇',
};
