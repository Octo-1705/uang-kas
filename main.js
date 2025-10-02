// Data absen
const dataAbsen = [
  { id: 1, nama: "YUSRIN NAILA HIMNAH" },
  { id: 2, nama: "MUHAMMAD ZIDA ANWAR AZAM" },
  { id: 3, nama: "FADRIA DIFFY HERMAWAN" },
  { id: 4, nama: "AHMAD ZUHAIR NABIL FUADI" },
  { id: 5, nama: "MUHAMMAD ANHAR" },
  { id: 6, nama: "NADZIFA IZZATULLANI ROHMAH" },
  { id: 7, nama: "FARIHA ZUYYINA ZAHRO" },
  { id: 8, nama: "TASYA ANANDA MAULIDHA" },
  { id: 10, nama: "DEWI AISYAH MAULIDAH" },
  { id: 11, nama: "MOH. FAUZAN RAZIQI" },
  { id: 12, nama: "FATMAWATI" },
  { id: 13, nama: "NAJWA ULAYYA HIBATULLAH" },
  { id: 14, nama: "ZETA TAZKY AULIYAH" },
  { id: 15, nama: "RIZQI AJENG KIROMAH" },
  { id: 16, nama: "LIANA DWI KURNIATI" },
  { id: 17, nama: "RAHMADHANI AISYAH PUTRI" },
  { id: 18, nama: "KURNIAWAN ADIPUTRA" },
  { id: 19, nama: "MUHAMMAD FAYRUSSIBAD ATHOYA" },
  { id: 20, nama: "M. ALVIN SAHEZA" },
  { id: 21, nama: "RIJALU MAULANA KUSUMAH" },
  { id: 22, nama: "SULTHAN FIRDAUS BAROYA" },
  { id: 23, nama: "ALIF SHUBHI DHIYAUDDIN" },
  { id: 24, nama: "ADIBA ZANNUBA KHAFSHOH" },
  { id: 25, nama: "MAHMUD SA'DULLOH" },
  { id: 26, nama: "AFIFAH NUR AZIZAH" },
  { id: 27, nama: "MUNIROTUS SALMA" },
  { id: 28, nama: "MUHAMMAD IHSAN NURKAMIL" },
  { id: 29, nama: "NAJWA NUR FADILAH" },
  { id: 30, nama: "MUTHIA DAWWAMA AMALIA" },
  { id: 31, nama: "AULIA RAHMAWATI" },
  { id: 32, nama: "ADHAM BACHTIAR" },
  { id: 33, nama: "SALSA RISVANA" },
  { id: 34, nama: "MUHAMMAD IKLIL NASRIL HAMDI" },
  { id: 35, nama: "RAGA SETYO WASKITO" },
];

// Inisialisasi aplikasi
document.addEventListener("DOMContentLoaded", function () {
  // Isi dropdown absen untuk bayar kas dan pinjam uang
  isiDropdownAbsen("absen-bayar");
  isiDropdownAbsen("absen-pinjam");

  // Tambahkan event listener untuk menu
  setupMenuNavigation();

  // Tambahkan event listener untuk form bayar kas
  setupFormBayarKas();

  // Tambahkan event listener untuk form pinjam uang
  setupFormPinjamUang();

  // Setup untuk menampilkan mutasi keuangan dan data keseluruhan saat section aktif
  setupMutasiKeuangan();
  setupDataKeseluruhan();

  // Setup reset data
  setupResetData();

  // Update info tanggal
  updateInfoTanggal();
});

// Fungsi untuk mengisi dropdown absen
function isiDropdownAbsen(selectId) {
  const selectAbsen = document.getElementById(selectId);
  selectAbsen.innerHTML = '<option value="">Pilih Nomor Absen</option>';

  dataAbsen.forEach((orang) => {
    const option = document.createElement("option");
    option.value = orang.id;
    option.textContent = `${orang.id}. ${orang.nama}`;
    selectAbsen.appendChild(option);
  });
}

// Fungsi untuk setup navigasi menu
function setupMenuNavigation() {
  // Tombol menu utama
  const menuButtons = document.querySelectorAll(".menu-btn");
  menuButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const targetSection = this.getAttribute("data-target");
      tampilkanSection(targetSection);

      // Jika target section adalah mutasi keuangan atau data keseluruhan, refresh data
      if (targetSection === "mutasi-keuangan") {
        refreshMutasiKeuangan();
      } else if (targetSection === "data-keseluruhan") {
        refreshDataKeseluruhan();
      }
    });
  });

  // Tombol kembali
  const backButtons = document.querySelectorAll(".back-btn");
  backButtons.forEach((button) => {
    button.addEventListener("click", function () {
      tampilkanSection("menu-utama");
    });
  });
}

// Fungsi untuk menampilkan section tertentu
function tampilkanSection(sectionId) {
  // Sembunyikan semua section
  const semuaSection = document.querySelectorAll(".section");
  semuaSection.forEach((section) => {
    section.classList.remove("aktif");
  });

  // Tampilkan section yang dipilih
  const sectionTarget = document.getElementById(sectionId);
  sectionTarget.classList.add("aktif");
}

// Fungsi untuk setup form bayar kas
function setupFormBayarKas() {
  const formBayarKas = document.getElementById("form-bayar-kas");

  formBayarKas.addEventListener("submit", function (e) {
    e.preventDefault();

    // Ambil data dari form
    const absen = document.getElementById("absen-bayar").value;
    const jumlah = document.getElementById("jumlah-bayar").value;
    const metode = document.querySelector('input[name="metode-bayar"]:checked').value;
    const keterangan = document.getElementById("keterangan-bayar").value;

    // Validasi kelipatan 10.000
    if (jumlah % 10000 !== 0) {
      alert("Jumlah pembayaran harus kelipatan 10.000!");
      return;
    }

    // Proses pembayaran
    prosesBayarKas(absen, jumlah, metode, keterangan);
  });
}

// Fungsi untuk setup form pinjam uang
function setupFormPinjamUang() {
  const formPinjamUang = document.getElementById("form-pinjam-uang");

  formPinjamUang.addEventListener("submit", function (e) {
    e.preventDefault();

    // Ambil data dari form
    const absen = document.getElementById("absen-pinjam").value;
    const jumlah = document.getElementById("jumlah-pinjam").value;
    const metode = document.querySelector('input[name="metode-pinjam"]:checked').value;
    const tanggalPengembalian = document.getElementById("tanggal-pengembalian").value;
    const keterangan = document.getElementById("keterangan-pinjam").value;

    // Validasi kelipatan 10.000
    if (jumlah % 10000 !== 0) {
      alert("Jumlah pinjaman harus kelipatan 10.000!");
      return;
    }

    // Proses pinjaman
    prosesPinjamUang(absen, jumlah, metode, tanggalPengembalian, keterangan);
  });
}

// Fungsi untuk memproses pembayaran kas
function prosesBayarKas(absen, jumlah, metode, keterangan) {
  // Cari nama berdasarkan nomor absen
  const orang = dataAbsen.find((item) => item.id == absen);

  if (!orang) {
    alert("Data absen tidak ditemukan!");
    return;
  }

  // Format jumlah ke Rupiah
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  const jumlahFormatted = formatter.format(jumlah);

  // Tampilkan konfirmasi
  const konfirmasi = `
        Konfirmasi Pembayaran Kas:
        
        Nama: ${orang.nama}
        Jumlah: ${jumlahFormatted}
        Metode: ${metode.toUpperCase()}
        Keterangan: ${keterangan || "-"}
        
        Apakah data sudah benar?
    `;

  if (confirm(konfirmasi)) {
    // Simpan data ke localStorage
    const transaksi = {
      id: Date.now(),
      jenis: "pemasukan",
      absen: parseInt(absen),
      nama: orang.nama,
      jumlah: parseInt(jumlah),
      metode: metode,
      keterangan: keterangan,
      tanggal: new Date().toLocaleString("id-ID"),
    };

    simpanTransaksi(transaksi);

    // Reset form
    document.getElementById("form-bayar-kas").reset();

    // Tampilkan pesan sukses
    alert("Pembayaran berhasil dicatat!");

    // Kembali ke menu utama
    tampilkanSection("menu-utama");
  }
}

// Fungsi untuk memproses pinjam uang
function prosesPinjamUang(absen, jumlah, metode, tanggalPengembalian, keterangan) {
  // Cari nama berdasarkan nomor absen
  const orang = dataAbsen.find((item) => item.id == absen);

  if (!orang) {
    alert("Data absen tidak ditemukan!");
    return;
  }

  // Format jumlah ke Rupiah
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  const jumlahFormatted = formatter.format(jumlah);

  // Tampilkan konfirmasi
  const konfirmasi = `
        Konfirmasi Pinjaman Uang:
        
        Nama: ${orang.nama}
        Jumlah: ${jumlahFormatted}
        Metode: ${metode.toUpperCase()}
        Tanggal Pengembalian: ${tanggalPengembalian || "Tidak ditentukan"}
        Keterangan: ${keterangan || "-"}
        
        Apakah data sudah benar?
    `;

  if (confirm(konfirmasi)) {
    // Simpan data ke localStorage
    const transaksi = {
      id: Date.now(),
      jenis: "pengeluaran",
      absen: parseInt(absen),
      nama: orang.nama,
      jumlah: parseInt(jumlah),
      metode: metode,
      tanggalPengembalian: tanggalPengembalian,
      keterangan: keterangan,
      status: "belum lunas",
      tanggal: new Date().toLocaleString("id-ID"),
    };

    simpanTransaksi(transaksi);

    // Reset form
    document.getElementById("form-pinjam-uang").reset();

    // Tampilkan pesan sukses
    alert("Pinjaman berhasil dicatat!");

    // Kembali ke menu utama
    tampilkanSection("menu-utama");
  }
}

// Fungsi untuk menyimpan transaksi ke localStorage
function simpanTransaksi(transaksi) {
  // Ambil data transaksi yang sudah ada
  let semuaTransaksi = JSON.parse(localStorage.getItem("transaksiKas")) || [];

  // Tambahkan transaksi baru
  semuaTransaksi.push(transaksi);

  // Simpan kembali ke localStorage
  localStorage.setItem("transaksiKas", JSON.stringify(semuaTransaksi));
}

// Fungsi untuk setup mutasi keuangan
function setupMutasiKeuangan() {
  // Tidak perlu setup khusus, karena akan di-refresh saat section aktif
}

// Fungsi untuk refresh mutasi keuangan
function refreshMutasiKeuangan() {
  const mutasiContent = document.getElementById("mutasi-content");
  const semuaTransaksi = JSON.parse(localStorage.getItem("transaksiKas")) || [];

  if (semuaTransaksi.length === 0) {
    mutasiContent.innerHTML = "<p>Tidak ada data transaksi</p>";
    return;
  }

  // Pisahkan transaksi pemasukan dan pengeluaran
  const pemasukan = semuaTransaksi.filter((t) => t.jenis === "pemasukan");
  const pengeluaran = semuaTransaksi.filter((t) => t.jenis === "pengeluaran");

  // Hitung total
  const totalPemasukan = pemasukan.reduce((sum, t) => sum + t.jumlah, 0);
  const totalPengeluaran = pengeluaran.reduce((sum, t) => sum + t.jumlah, 0);
  const saldo = totalPemasukan - totalPengeluaran;

  // Format angka ke Rupiah
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  // Update info saldo di header
  document.getElementById("info-saldo").textContent = `Saldo: ${formatter.format(saldo)}`;

  // Buat HTML untuk mutasi keuangan
  let html = `
        <div class="total-section">
            <h3>Ringkasan Keuangan</h3>
            <p>Total Pemasukan: <strong class="pemasukan">${formatter.format(totalPemasukan)}</strong></p>
            <p>Total Pengeluaran: <strong class="pengeluaran">${formatter.format(totalPengeluaran)}</strong></p>
            <p class="saldo">Saldo: ${formatter.format(saldo)}</p>
        </div>
        
        <h3>Pemasukan (Bayar Kas)</h3>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Tanggal</th>
                        <th>Nama</th>
                        <th>Jumlah</th>
                        <th>Metode</th>
                        <th>Keterangan</th>
                    </tr>
                </thead>
                <tbody>
    `;

  if (pemasukan.length === 0) {
    html += `<tr><td colspan="5" style="text-align: center;">Tidak ada data pemasukan</td></tr>`;
  } else {
    // Urutkan dari yang terbaru
    pemasukan.sort((a, b) => b.id - a.id);

    pemasukan.forEach((transaksi) => {
      html += `
                <tr>
                    <td>${transaksi.tanggal}</td>
                    <td>${transaksi.nama}</td>
                    <td class="pemasukan">${formatter.format(transaksi.jumlah)}</td>
                    <td>${transaksi.metode.toUpperCase()}</td>
                    <td>${transaksi.keterangan || "-"}</td>
                </tr>
            `;
    });
  }

  html += `
                </tbody>
            </table>
        </div>
        
        <h3>Pengeluaran (Pinjam Uang)</h3>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Tanggal</th>
                        <th>Nama</th>
                        <th>Jumlah</th>
                        <th>Metode</th>
                        <th>Tanggal Pengembalian</th>
                        <th>Status</th>
                        <th>Keterangan</th>
                    </tr>
                </thead>
                <tbody>
    `;

  if (pengeluaran.length === 0) {
    html += `<tr><td colspan="7" style="text-align: center;">Tidak ada data pengeluaran</td></tr>`;
  } else {
    // Urutkan dari yang terbaru
    pengeluaran.sort((a, b) => b.id - a.id);

    pengeluaran.forEach((transaksi) => {
      const statusClass = transaksi.status === "lunas" ? "status-lunas" : "status-belum-lunas";
      html += `
                <tr>
                    <td>${transaksi.tanggal}</td>
                    <td>${transaksi.nama}</td>
                    <td class="pengeluaran">${formatter.format(transaksi.jumlah)}</td>
                    <td>${transaksi.metode.toUpperCase()}</td>
                    <td>${transaksi.tanggalPengembalian || "-"}</td>
                    <td><span class="${statusClass}">${transaksi.status.toUpperCase()}</span></td>
                    <td>${transaksi.keterangan || "-"}</td>
                </tr>
            `;
    });
  }

  html += `
                </tbody>
            </table>
        </div>
    `;

  mutasiContent.innerHTML = html;
}

// Fungsi untuk setup data keseluruhan
function setupDataKeseluruhan() {
  // Tidak perlu setup khusus, karena akan di-refresh saat section aktif
}

// Fungsi untuk refresh data keseluruhan
function refreshDataKeseluruhan() {
  const dataKeseluruhanContent = document.getElementById("data-keseluruhan-content");
  const semuaTransaksi = JSON.parse(localStorage.getItem("transaksiKas")) || [];

  if (semuaTransaksi.length === 0) {
    dataKeseluruhanContent.innerHTML = "<p>Tidak ada data transaksi</p>";
    return;
  }

  // Format angka ke Rupiah
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  // Hitung ringkasan berdasarkan metode pembayaran
  const ringkasanMetode = hitungRingkasanMetode(semuaTransaksi);

  // Buat HTML untuk ringkasan metode
  let htmlRingkasan = `
        <div class="ringkasan-metode">
            <div class="metode-card cash">
                <h4>Cash</h4>
                <div class="metode-jumlah">${formatter.format(ringkasanMetode.cash.total)}</div>
                <div class="metode-count">${ringkasanMetode.cash.count} transaksi</div>
            </div>
            <div class="metode-card gopay">
                <h4>Gopay</h4>
                <div class="metode-jumlah">${formatter.format(ringkasanMetode.gopay.total)}</div>
                <div class="metode-count">${ringkasanMetode.gopay.count} transaksi</div>
            </div>
            <div class="metode-card mandiri">
                <h4>Mandiri</h4>
                <div class="metode-jumlah">${formatter.format(ringkasanMetode.mandiri.total)}</div>
                <div class="metode-count">${ringkasanMetode.mandiri.count} transaksi</div>
            </div>
        </div>
        
        <div class="ringkasan-total">
            <h3>Total Keseluruhan</h3>
            <div class="total-saldo">${formatter.format(ringkasanMetode.totalKeseluruhan)}</div>
            <div>${semuaTransaksi.length} transaksi</div>
        </div>
    `;

  // Buat HTML untuk tabel data keseluruhan
  let htmlTabel = `
        <h3>Detail Transaksi</h3>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Tanggal</th>
                        <th>Jenis</th>
                        <th>Nama</th>
                        <th>Jumlah</th>
                        <th>Metode</th>
                        <th>Status</th>
                        <th>Keterangan</th>
                    </tr>
                </thead>
                <tbody>
    `;

  // Urutkan transaksi berdasarkan tanggal (terbaru di atas)
  semuaTransaksi.sort((a, b) => b.id - a.id);

  semuaTransaksi.forEach((transaksi) => {
    const jumlahClass = transaksi.jenis === "pemasukan" ? "pemasukan" : "pengeluaran";
    const statusClass = transaksi.status === "lunas" ? "status-lunas" : transaksi.status === "belum lunas" ? "status-belum-lunas" : "";

    htmlTabel += `
            <tr>
                <td>${transaksi.tanggal}</td>
                <td>${transaksi.jenis === "pemasukan" ? "Pemasukan" : "Pengeluaran"}</td>
                <td>${transaksi.nama}</td>
                <td class="${jumlahClass}">${formatter.format(transaksi.jumlah)}</td>
                <td>${transaksi.metode.toUpperCase()}</td>
                <td>${transaksi.status ? `<span class="${statusClass}">${transaksi.status.toUpperCase()}</span>` : "-"}</td>
                <td>${transaksi.keterangan || "-"}</td>
            </tr>
        `;
  });

  htmlTabel += `
                </tbody>
            </table>
        </div>
    `;

  // Gabungkan ringkasan dan tabel
  dataKeseluruhanContent.innerHTML = htmlRingkasan + htmlTabel;
}

// Fungsi untuk menghitung ringkasan berdasarkan metode pembayaran
function hitungRingkasanMetode(semuaTransaksi) {
  const ringkasan = {
    cash: { total: 0, count: 0 },
    gopay: { total: 0, count: 0 },
    mandiri: { total: 0, count: 0 },
    totalKeseluruhan: 0,
  };

  semuaTransaksi.forEach((transaksi) => {
    const metode = transaksi.metode.toLowerCase();

    if (ringkasan[metode]) {
      ringkasan[metode].total += transaksi.jumlah;
      ringkasan[metode].count += 1;
    }

    // Untuk total keseluruhan, pemasukan ditambah, pengeluaran dikurangi
    if (transaksi.jenis === "pemasukan") {
      ringkasan.totalKeseluruhan += transaksi.jumlah;
    } else {
      ringkasan.totalKeseluruhan -= transaksi.jumlah;
    }
  });

  return ringkasan;
}

// Fungsi untuk setup reset data
function setupResetData() {
  const btnReset = document.getElementById("btn-reset");
  const resetInfo = document.getElementById("reset-info");

  // Update info reset
  updateResetInfo();

  // Event listener untuk tombol reset
  btnReset.addEventListener("click", function () {
    tampilkanKonfirmasiReset();
  });

  // Cek auto reset di akhir bulan
  cekAutoReset();
}

// Fungsi untuk update info reset
function updateResetInfo() {
  const resetInfo = document.getElementById("reset-info");
  const lastReset = localStorage.getItem("lastReset");
  const nextReset = hitungTanggalResetBerikutnya();

  if (lastReset) {
    const lastResetDate = new Date(parseInt(lastReset));
    resetInfo.textContent = `Reset terakhir: ${lastResetDate.toLocaleDateString("id-ID")}`;
  } else {
    resetInfo.textContent = "Belum pernah reset";
  }
}

// Fungsi untuk hitung tanggal reset berikutnya (akhir bulan)
function hitungTanggalResetBerikutnya() {
  const sekarang = new Date();
  const tahun = sekarang.getFullYear();
  const bulan = sekarang.getMonth();

  // Tanggal terakhir bulan ini
  const tanggalTerakhir = new Date(tahun, bulan + 1, 0);
  return tanggalTerakhir;
}

// Fungsi untuk cek auto reset di akhir bulan
function cekAutoReset() {
  const sekarang = new Date();
  const tanggalReset = hitungTanggalResetBerikutnya();

  // Cek apakah sudah akhir bulan (hari ini >= tanggal reset)
  if (sekarang.getDate() >= tanggalReset.getDate() && sekarang.getMonth() === tanggalReset.getMonth() && sekarang.getFullYear() === tanggalReset.getFullYear()) {
    // Cek apakah sudah reset bulan ini
    const lastReset = localStorage.getItem("lastReset");
    if (lastReset) {
      const lastResetDate = new Date(parseInt(lastReset));
      // Jika belum reset bulan ini
      if (lastResetDate.getMonth() !== sekarang.getMonth() || lastResetDate.getFullYear() !== sekarang.getFullYear()) {
        resetDataOtomatis();
      }
    } else {
      resetDataOtomatis();
    }
  }
}

// Fungsi untuk reset data otomatis
function resetDataOtomatis() {
  // Simpan saldo akhir ke riwayat
  simpanRiwayatSaldo();

  // Reset semua data transaksi
  localStorage.removeItem("transaksiKas");

  // Update last reset
  localStorage.setItem("lastReset", Date.now().toString());

  // Update info
  updateResetInfo();

  console.log("Auto reset data dilakukan untuk bulan baru");
}

// Fungsi untuk menampilkan konfirmasi reset manual
function tampilkanKonfirmasiReset() {
  const konfirmasiHTML = `
        <div class="reset-confirm">
            <h3>Reset Data Kas</h3>
            <p>Apakah Anda yakin ingin mereset semua data kas?</p>
            <p><strong>Data yang direset tidak dapat dikembalikan!</strong></p>
            <div class="reset-confirm-buttons">
                <button class="confirm-btn confirm-yes" id="confirm-yes">Ya, Reset Data</button>
                <button class="confirm-btn confirm-no" id="confirm-no">Batal</button>
            </div>
        </div>
    `;

  // Cari section aktif untuk menampilkan konfirmasi
  const sectionAktif = document.querySelector(".section.aktif");
  const konfirmasiLama = sectionAktif.querySelector(".reset-confirm");
  if (konfirmasiLama) {
    konfirmasiLama.remove();
  }

  sectionAktif.insertAdjacentHTML("beforeend", konfirmasiHTML);

  // Event listener untuk tombol konfirmasi
  document.getElementById("confirm-yes").addEventListener("click", function () {
    resetDataManual();
  });

  document.getElementById("confirm-no").addEventListener("click", function () {
    sectionAktif.querySelector(".reset-confirm").remove();
  });
}

// Fungsi untuk reset data manual
function resetDataManual() {
  // Simpan saldo akhir ke riwayat
  simpanRiwayatSaldo();

  // Reset semua data transaksi
  localStorage.removeItem("transaksiKas");

  // Update last reset
  localStorage.setItem("lastReset", Date.now().toString());

  // Update info
  updateResetInfo();

  // Hapus konfirmasi
  const sectionAktif = document.querySelector(".section.aktif");
  const konfirmasi = sectionAktif.querySelector(".reset-confirm");
  if (konfirmasi) {
    konfirmasi.remove();
  }

  // Refresh tampilan jika sedang di section yang menampilkan data
  if (document.getElementById("mutasi-keuangan").classList.contains("aktif")) {
    refreshMutasiKeuangan();
  } else if (document.getElementById("data-keseluruhan").classList.contains("aktif")) {
    refreshDataKeseluruhan();
  }

  alert("Data kas berhasil direset!");
}

// Fungsi untuk menyimpan riwayat saldo sebelum reset
function simpanRiwayatSaldo() {
  const semuaTransaksi = JSON.parse(localStorage.getItem("transaksiKas")) || [];

  if (semuaTransaksi.length > 0) {
    // Hitung saldo akhir
    const pemasukan = semuaTransaksi.filter((t) => t.jenis === "pemasukan").reduce((sum, t) => sum + t.jumlah, 0);
    const pengeluaran = semuaTransaksi.filter((t) => t.jenis === "pengeluaran").reduce((sum, t) => sum + t.jumlah, 0);
    const saldoAkhir = pemasukan - pengeluaran;

    // Simpan ke riwayat saldo
    const riwayatSaldo = JSON.parse(localStorage.getItem("riwayatSaldo")) || [];
    const riwayat = {
      tanggal: new Date().toLocaleDateString("id-ID"),
      saldo: saldoAkhir,
      totalPemasukan: pemasukan,
      totalPengeluaran: pengeluaran,
      jumlahTransaksi: semuaTransaksi.length,
    };

    riwayatSaldo.push(riwayat);
    localStorage.setItem("riwayatSaldo", JSON.stringify(riwayatSaldo));
  }
}

// Fungsi untuk update info tanggal
function updateInfoTanggal() {
  const infoTanggal = document.getElementById("info-tanggal");
  const sekarang = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  infoTanggal.textContent = sekarang.toLocaleDateString("id-ID", options);
}
