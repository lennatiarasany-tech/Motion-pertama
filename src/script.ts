/** Semua teks VO, headline, chip, dan potongan subtitle (frame lokal per scene). */
export type Sub = [from: number, to: number, text: string];

export const VO = {
  s1: 'Stok ED numpuk di gudang… dan apotek ini rugi jutaan rupiah.',
  s2: 'Apotek ini selalu ramai, yang jaga cuma dua orang. Pas jam sibuk, sales datang antar pesanan.',
  s3: 'Sales minta faktur cepat ditandatangani. Antrean panjang, barang dicek seadanya… langsung tanda tangan.',
  s4: 'Beberapa bulan kemudian, baru ketahuan. Ada produk yang nggak ada di surat pesanan, ED-nya tinggal hitungan bulan. Nggak laku, numpuk, rugi jutaan.',
  s5: 'Mau retur? Ditolak, fakturnya sudah ditandatangani apotek. Sales nakal memang ada… tapi celahnya ada di cara kita terima barang.',
  s6: 'Di Apotek Digital, setiap faktur masuk langsung dicocokkan dengan surat pesanan. Produk di luar SP, harga berubah tak wajar, sampai ED kurang dari setahun, langsung ketahuan. Cek cepat walau apotek lagi ramai.',
  s7: 'Pernah kecolongan juga? Tulis di komentar. Coba gratis Apotek Digital.',
};

// *kata* = kata kunci (kuning di subtitle). Maks 6 kata per potongan.
export const SUBS: Record<string, Sub[]> = {
  s1: [
    [0, 62, 'Stok *ED* numpuk di gudang…'],
    [62, 120, 'Apotek ini *rugi* *jutaan*'],
  ],
  s2: [
    [0, 60, 'Apotek ini selalu *ramai*'],
    [60, 112, 'Yang jaga cuma *dua* *orang*'],
    [112, 180, 'Jam sibuk, *sales* *datang*'],
  ],
  s3: [
    [0, 70, 'Faktur minta *cepat* *ditandatangani*'],
    [70, 140, 'Antrean panjang, dicek *seadanya*…'],
    [140, 210, '…langsung *tanda* *tangan*'],
  ],
  s4: [
    [0, 70, 'Beberapa bulan kemudian, *baru* *ketahuan*'],
    [70, 140, 'Produk *tidak* *ada* di SP'],
    [140, 215, 'ED tinggal *hitungan* *bulan*'],
    [215, 300, 'Nggak laku, numpuk, *rugi* *jutaan*'],
  ],
  s5: [
    [0, 55, 'Mau *retur*?'],
    [55, 122, 'Ditolak, faktur *sudah* *ditandatangani*'],
    [122, 196, 'Sales nakal *memang* *ada*…'],
    [212, 270, 'Celahnya di cara *terima* *barang*'],
  ],
  s6: [
    [0, 120, 'Faktur masuk *langsung* *dicocokkan*'],
    [120, 250, 'Di luar SP? *Langsung* *ketahuan*'],
    [250, 390, 'Cek cepat walau *lagi* *ramai*'],
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
