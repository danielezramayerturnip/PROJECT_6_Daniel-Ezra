// ========== 1. PENGATURAN ==========
const nyawaAwal = 7;   // jumlah kesempatan menebak
const angkaMax = 100;  // angka rahasia antara 1 sampai angkaMax

// ========== 2. VARIABEL PENYIMPAN ==========
let angkaRahasia = buatAngkaAcak();
let sisaNyawa = nyawaAwal;

// ========== 3. AMBIL ELEMEN DARI HTML ==========
const inputTebakan = document.getElementById("input-tebakan");
const tombolTebak = document.getElementById("tombol-tebak");
const tombolUlang = document.getElementById("tombol-ulang");
const teksNyawa = document.getElementById("nyawa");
const pesan = document.getElementById("pesan");
const riwayat = document.getElementById("riwayat");

// ========== 4. FUNGSI ==========

// Membuat angka bulat acak dari 1 sampai angkaMax
function buatAngkaAcak() {
    return Math.floor(Math.random() * angkaMax) + 1;
}

// Dijalankan setiap tombol Tebak ditekan
function tebak() {
    const tebakan = Number(inputTebakan.value);

    // Cek dulu apakah tebakannya valid
    if (inputTebakan.value === "" || !Number.isInteger(tebakan) || tebakan < 1 || tebakan > angkaMax) {
        pesan.textContent = "Masukkan angka bulat dari 1 sampai " + angkaMax + ".";
        pesan.className = "pesan";
        return;
    }

    // Setiap tebakan mengurangi satu nyawa
    sisaNyawa = sisaNyawa - 1;
    teksNyawa.textContent = sisaNyawa;
    riwayat.textContent = "Tebakan terakhir: " + tebakan;

    if (tebakan === angkaRahasia) {
        const jumlahTebakan = nyawaAwal - sisaNyawa;
        pesan.textContent = "Benar! Angkanya " + angkaRahasia + ". Kamu butuh " + jumlahTebakan + " tebakan.";
        pesan.className = "pesan benar";
        akhiriGame();
    } else if (sisaNyawa === 0) {
        pesan.textContent = "Nyawa habis. Angkanya adalah " + angkaRahasia + ".";
        pesan.className = "pesan salah";
        akhiriGame();
    } else if (tebakan > angkaRahasia) {
        pesan.textContent = tebakan + " terlalu besar. Coba lebih kecil.";
        pesan.className = "pesan petunjuk";
    } else {
        pesan.textContent = tebakan + " terlalu kecil. Coba lebih besar.";
        pesan.className = "pesan petunjuk";
    }

    inputTebakan.value = "";
    inputTebakan.focus();
}

// Mematikan kolom input dan tombol Tebak, lalu menampilkan tombol Main lagi
function akhiriGame() {
    inputTebakan.disabled = true;
    tombolTebak.disabled = true;
    tombolUlang.style.display = "inline-block";
}

// Mengembalikan semuanya ke awal
function mainLagi() {
    angkaRahasia = buatAngkaAcak();
    sisaNyawa = nyawaAwal;
    teksNyawa.textContent = sisaNyawa;
    pesan.textContent = "Ketik angka lalu tekan Tebak.";
    pesan.className = "pesan";
    riwayat.textContent = "";
    inputTebakan.disabled = false;
    tombolTebak.disabled = false;
    inputTebakan.value = "";
    inputTebakan.focus();
    tombolUlang.style.display = "none";
}

// ========== 5. HUBUNGKAN TOMBOL DENGAN FUNGSI ==========
tombolTebak.onclick = tebak;
tombolUlang.onclick = mainLagi;

// Tekan Enter di kolom input juga sama dengan menekan Tebak
inputTebakan.onkeydown = function (event) {
    if (event.key === "Enter") {
        tebak();
    }
};