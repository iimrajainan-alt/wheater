const apiKey = "4d95131e994987d41fb61c4a63b905fb";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const inputKota = document.getElementById("input-kota");
const tombolLacak = document.getElementById("tombol-lacak");
const namaKota = document.getElementById("nama-kota");
const suhu = document.getElementById("suhu");
const deskripsi = document.getElementById("deskripsi");
// (Pindahkan definisi ikonCuaca ke dalam fungsi atau di sini boleh, tapi logikanya harus di dalam)
const ikonCuaca = document.getElementById("ikon-cuaca"); 

const kelembapan = document.getElementById("kelembapan");
const angin = document.getElementById("angin");

async function lacakCuaca(kota) {
    deskripsi.innerHTML = "Sedang menghubungi satelit...";
    
    try {
        // 1. Panggil Satelit
        const response = await fetch(apiUrl + kota + `&appid=${apiKey}`);
        
        // 2. Cek Error 404
        if (response.status == 404) {
            document.querySelector(".kartu-radar").style.borderColor = "red";
            namaKota.innerHTML = "ERROR";
            suhu.innerHTML = "X";
            deskripsi.innerHTML = "Kota tidak ditemukan di peta dunia!";
            ikonCuaca.style.display = "none"; // Sembunyikan ikon kalau error
            return;
        }

        // 3. Ambil Data (DISINI SI 'data' LAHIR!)
        var data = await response.json();
        console.log(data); // Cek konsol

        // 4. Update Tampilan (TEKS)
        namaKota.innerHTML = data.name;
        suhu.innerHTML = Math.round(data.main.temp) + "°C";
        deskripsi.innerHTML = "Cuaca: " + data.weather[0].main;
        kelembapan.innerHTML = data.main.humidity + "% ";
        angin.innerHTML = data.wind.speed + "m/s";

        // --- [KODE BARU TEMPEL DISINI] ---
        // Karena 'data' SUDAH ADA, sekarang kita bisa pakai!
        
        const kodeIkon = data.weather[0].icon;
        const urlGambar = `https://openweathermap.org/img/wn/${kodeIkon}@2x.png`;

        ikonCuaca.src = urlGambar;
        ikonCuaca.style.display = "inline"; // Munculkan!
        // ---------------------------------
        const kondisi = data.weather[0].main;
        const body = document.body;

        body.className = "";

        if (kondisi == "Clear") {
            body.classList.add("tema-panas");
        } else if (kondisi == "Rain" || kondisi == "Drizzle" || kondisi == "Thunderstorm"){
            body.classList.add("tema-hujan");
        } else if (kondisi == "Clouds" || kondisi == "Mist" || kondisi == "Haze") {
            body.classList.add("tema-mendung");
        } else {
            console.log("Cuaca langka:", kondisi);
        }

    } catch (error) {
        console.error(error);
        deskripsi.innerHTML = "Satelit Gangguan (Cek Internet/API key)";
    }
}

// Event Listener tetap sama di bawah...
tombolLacak.addEventListener("click", () => {
    lacakCuaca(inputKota.value);
});
inputKota.addEventListener("keypress", (e) => {
    if (e.key === "Enter") lacakCuaca(inputKota.value);
})