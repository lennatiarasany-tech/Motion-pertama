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
    [0, 64, 'Stok *ED* numpuk di gudang…'],
    [64, 142, 'Apotek ini sampe *rugi* *jutaan*!'],
  ],
  s2: [
    [0, 42, 'Jadi gini ceritanya…'],
    [42, 104, 'Apotek ini selalu *rame*'],
    [104, 172, 'Yang jaga cuma *2* *orang*'],
    [172, 241, 'Pas jam rame, *barang* *datang*'],
  ],
  s3: [
    [0, 84, 'Sales minta faktur *cepat* *ditandatangani*'],
    [84, 178, 'Antrian panjang, dicek *seadanya*…'],
    [178, 236, '…dan langsung *ditandatangan*'],
  ],
  s4: [
    [0, 94, 'Beberapa bulan kemudian, *baru* *ketahuan*'],
    [94, 198, 'Ternyata produk *tidak* *ada* di SP'],
    [198, 262, 'ED tinggal *hitungan* *bulan*!'],
  ],
  s5: [
    [0, 34, 'Mau *retur*?'],
    [34, 60, '*Ditolak*.'],
    [60, 142, 'Faktur *sudah* *ditandatangani* apotek. Hmm…'],
    [142, 240, 'Sales nakal *memang* *selalu* *ada*…'],
    [246, 354, 'Celahnya bisa di cara *terima* *barang*'],
  ],
  s6: [
    [0, 160, 'Faktur masuk *langsung* *dicocokkan*'],
    [160, 210, 'Produk di *luar* *SP*'],
    [210, 262, 'Harga berubah *nggak* *wajar*'],
    [262, 366, 'ED kurang dari *setahun*… *ketahuan*'],
    [366, 474, 'Jadi bisa cek cepat, *walau* *ramai*'],
  ],
  s7: [
    [0, 72, 'Pernah *kecolongan* juga?'],
    [72, 114, 'Tulis di *komentar*'],
    [114, 211, 'Coba *gratis* Apotek Digital'],
  ],
};

export const HEAD = {
  s1: {kicker: 'APOTEK INI', lines: ['STOK *ED*', 'NUMPUK,', '*RUGI* *JUTAAN*']},
  s2: {kicker: 'SETIAP HARI', lines: ['APOTEK RAMAI,', 'YANG JAGA', 'CUMA *2* *ORANG*']},
  s3: {lines: ['DICEK *SEADANYA,*', 'LANGSUNG', 'TANDA TANGAN']},
  s4: {kicker: 'BEBERAPA BULAN KEMUDIAN…'},
  s5a: {lines: ['SALES *NAKAL*', 'MEMANG ADA…']},
  s5b: {lines: ['TAPI CELAHNYA', 'DI CARA KITA', '^TERIMA^ ^BARANG^']},
  s6: {kicker: 'PAKAI APOTEK DIGITAL', lines: ['FAKTUR MASUK', 'LANGSUNG', '_DICOCOKKAN_']},
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
