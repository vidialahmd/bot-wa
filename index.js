const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

// Inisialisasi Google AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// Inisialisasi WhatsApp Client
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox']
    }
});

// Generate QR Code
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('QR Code telah digenerate, silakan scan dengan WhatsApp Anda');
});

client.on('ready', () => {
    console.log('Bot WhatsApp siap digunakan!');
});

// Daftar pemain sepakbola
const daftarPemain = [
    { nama: "Lionel Messi", klub: "Inter Miami", posisi: "Penyerang" },
    { nama: "Cristiano Ronaldo", klub: "Al Nassr", posisi: "Penyerang" },
    { nama: "Erling Haaland", klub: "Manchester City", posisi: "Penyerang" },
    { nama: "Kevin De Bruyne", klub: "Manchester City", posisi: "Gelandang" },
    { nama: "Virgil van Dijk", klub: "Liverpool", posisi: "Bek" },
    { nama: "Thibaut Courtois", klub: "Real Madrid", posisi: "Kiper" },
    { nama: "Kylian Mbappe", klub: "Real Madrid", posisi: "Penyerang" },
    { nama: "Jude Bellingham", klub: "Real Madrid", posisi: "Gelandang" },
    { nama: "Rodri", klub: "Manchester City", posisi: "Gelandang" },
    { nama: "Bernardo Silva", klub: "Manchester City", posisi: "Gelandang" },
    { nama: "Vinicius Junior", klub: "Real Madrid", posisi: "Penyerang" },
    { nama: "Bruno Fernandes", klub: "Manchester United", posisi: "Gelandang" },
    { nama: "Mohamed Salah", klub: "Liverpool", posisi: "Penyerang" },
    { nama: "Harry Kane", klub: "Bayern Munich", posisi: "Penyerang" },
    { nama: "Victor Osimhen", klub: "Napoli", posisi: "Penyerang" },
    { nama: "Federico Valverde", klub: "Real Madrid", posisi: "Gelandang" },
    { nama: "Declan Rice", klub: "Arsenal", posisi: "Gelandang" },
    { nama: "Ruben Dias", klub: "Manchester City", posisi: "Bek" },
    { nama: "Achraf Hakimi", klub: "PSG", posisi: "Bek" },
    { nama: "Ederson", klub: "Manchester City", posisi: "Kiper" },
    { nama: "Bukayo Saka", klub: "Arsenal", posisi: "Penyerang" },
    { nama: "Martin Odegaard", klub: "Arsenal", posisi: "Gelandang" },
    { nama: "William Saliba", klub: "Arsenal", posisi: "Bek" },
    { nama: "Alisson", klub: "Liverpool", posisi: "Kiper" },
    { nama: "Trent Alexander-Arnold", klub: "Liverpool", posisi: "Bek" },
    { nama: "Darwin Nunez", klub: "Liverpool", posisi: "Penyerang" },
    { nama: "Luka Modric", klub: "Real Madrid", posisi: "Gelandang" },
    { nama: "Toni Kroos", klub: "Real Madrid", posisi: "Gelandang" },
    { nama: "Antonio Rudiger", klub: "Real Madrid", posisi: "Bek" },
    { nama: "Phil Foden", klub: "Manchester City", posisi: "Gelandang" },
    { nama: "Julian Alvarez", klub: "Manchester City", posisi: "Penyerang" },
    { nama: "John Stones", klub: "Manchester City", posisi: "Bek" },
    { nama: "Marcus Rashford", klub: "Manchester United", posisi: "Penyerang" },
    { nama: "Casemiro", klub: "Manchester United", posisi: "Gelandang" },
    { nama: "Raphael Varane", klub: "Manchester United", posisi: "Bek" },
    { nama: "Jamal Musiala", klub: "Bayern Munich", posisi: "Gelandang" },
    { nama: "Leroy Sane", klub: "Bayern Munich", posisi: "Penyerang" },
    { nama: "Dayot Upamecano", klub: "Bayern Munich", posisi: "Bek" },
    { nama: "Victor Osimhen", klub: "Napoli", posisi: "Penyerang" },
    { nama: "Khvicha Kvaratskhelia", klub: "Napoli", posisi: "Penyerang" },
    { nama: "Kim Min-jae", klub: "Bayern Munich", posisi: "Bek" },
    { nama: "Mike Maignan", klub: "AC Milan", posisi: "Kiper" },
    { nama: "Theo Hernandez", klub: "AC Milan", posisi: "Bek" },
    { nama: "Rafael Leao", klub: "AC Milan", posisi: "Penyerang" },
    { nama: "Sandro Tonali", klub: "Newcastle", posisi: "Gelandang" },
    { nama: "Alexander Isak", klub: "Newcastle", posisi: "Penyerang" },
    { nama: "Bruno Guimaraes", klub: "Newcastle", posisi: "Gelandang" },
    { nama: "Kieran Trippier", klub: "Newcastle", posisi: "Bek" },
    { nama: "Nick Pope", klub: "Newcastle", posisi: "Kiper" },
    { nama: "Victor Osimhen", klub: "Napoli", posisi: "Penyerang" },
    { nama: "Stanislav Lobotka", klub: "Napoli", posisi: "Gelandang" },
    { nama: "Giovanni Di Lorenzo", klub: "Napoli", posisi: "Bek" },
    { nama: "Alex Meret", klub: "Napoli", posisi: "Kiper" },
    { nama: "Piotr Zielinski", klub: "Napoli", posisi: "Gelandang" },
    { nama: "Stanislav Lobotka", klub: "Napoli", posisi: "Gelandang" },
    { nama: "Giovanni Di Lorenzo", klub: "Napoli", posisi: "Bek" },
    { nama: "Alex Meret", klub: "Napoli", posisi: "Kiper" },
    { nama: "Piotr Zielinski", klub: "Napoli", posisi: "Gelandang" }
];

// Daftar klub sepakbola
const daftarKlub = [
    { nama: "Manchester City", liga: "Premier League", negara: "Inggris", tahunBerdiri: 1880 },
    { nama: "Real Madrid", liga: "Raja Spanyol", negara: "Spanyol", tahunBerdiri: 1902 },
    { nama: "Bayern Munich", liga: "Bundeliga", negara: "Jerman", tahunBerdiri: 1900 },
    { nama: "Paris Saint-Germain", liga: "Ligue 1", negara: "Prancis", tahunBerdiri: 1970 },
    { nama: "Liverpool", liga: "Premier League", negara: "Inggris", tahunBerdiri: 1892 },
    { nama: "Arsenal", liga: "Premier League", negara: "Inggris", tahunBerdiri: 1886 },
    { nama: "Manchester United", liga: "Premier League", negara: "Inggris", tahunBerdiri: 1878 },
    { nama: "Barcelona", liga: "La Liga", negara: "Spanyol", tahunBerdiri: 1899 },
    { nama: "Inter Milan", liga: "Serie A", negara: "Italia", tahunBerdiri: 1908 },
    { nama: "AC Milan", liga: "Serie A", negara: "Italia", tahunBerdiri: 1899 },
    { nama: "Juventus", liga: "Serie A", negara: "Italia", tahunBerdiri: 1897 },
    { nama: "Chelsea", liga: "Premier League", negara: "Inggris", tahunBerdiri: 1905 },
    { nama: "Tottenham Hotspur", liga: "Premier League", negara: "Inggris", tahunBerdiri: 1882 },
    { nama: "Atletico Madrid", liga: "La Liga", negara: "Spanyol", tahunBerdiri: 1903 },
    { nama: "Borussia Dortmund", liga: "Bundesliga", negara: "Jerman", tahunBerdiri: 1909 },
    { nama: "RB Leipzig", liga: "Bundesliga", negara: "Jerman", tahunBerdiri: 2009 },
    { nama: "Napoli", liga: "Serie A", negara: "Italia", tahunBerdiri: 1926 },
    { nama: "Roma", liga: "Serie A", negara: "Italia", tahunBerdiri: 1927 },
    { nama: "Lazio", liga: "Serie A", negara: "Italia", tahunBerdiri: 1900 },
    { nama: "Sevilla", liga: "La Liga", negara: "Spanyol", tahunBerdiri: 1890 }
];

// Variabel untuk menyimpan pemain yang sedang ditebak
let pemainYangDitebak = null;

// Variabel untuk menyimpan klub yang sedang ditebak
let klubYangDitebak = null;

// Fungsi untuk mendapatkan pemain acak
function getPemainAcak() {
    return daftarPemain[Math.floor(Math.random() * daftarPemain.length)];
}

// Fungsi untuk mendapatkan klub acak
function getKlubAcak() {
    return daftarKlub[Math.floor(Math.random() * daftarKlub.length)];
}

// Fungsi untuk mini game sepak bola
let skorPemain = 0;
let skorBot = 0;
let menitPertandingan = 0;
let kartuKuningPemain = 0;
let kartuMerahPemain = false;
let kartuKuningBot = 0;
let kartuMerahBot = false;
let staminaPemain = 100;
let staminaBot = 100;
let pergantianTersisa = 5; // Jumlah pergantian yang tersedia
let pemainAktif = {
    nama: "Pemain Utama",
    posisi: "Penyerang",
    stamina: 100,
    gol: 0,
    assist: 0
};
let pemainCadangan = [
    { nama: "Pemain Cadangan 1", posisi: "Penyerang", stamina: 100 },
    { nama: "Pemain Cadangan 2", posisi: "Gelandang", stamina: 100 },
    { nama: "Pemain Cadangan 3", posisi: "Bek", stamina: 100 }
];
let statistikPemain = {
    tendangan: 0,
    tendanganTepat: 0,
    gol: 0,
    assist: 0,
    pelanggaran: 0,
    kartuKuning: 0,
    kartuMerah: 0,
    stamina: 100
};

function gantiPemain(indexPemain) {
    if (pergantianTersisa <= 0) {
        return {
            sukses: false,
            pesan: "Maaf, pergantian pemain sudah habis!"
        };
    }

    if (indexPemain < 0 || indexPemain >= pemainCadangan.length) {
        return {
            sukses: false,
            pesan: "Pemain cadangan tidak ditemukan!"
        };
    }

    const pemainBaru = pemainCadangan[indexPemain];
    const pemainLama = pemainAktif;

    // Simpan statistik pemain lama
    pemainLama.stamina = staminaPemain;
    pemainLama.gol = statistikPemain.gol;
    pemainLama.assist = statistikPemain.assist;

    // Ganti dengan pemain baru
    pemainAktif = pemainBaru;
    staminaPemain = pemainBaru.stamina;
    statistikPemain.gol = 0; // Reset statistik gol dan assist untuk pemain baru
    statistikPemain.assist = 0;

    // Hapus pemain dari daftar cadangan
    pemainCadangan.splice(indexPemain, 1);
    pergantianTersisa--;

    return {
        sukses: true,
        pesan: `Pergantian pemain berhasil!\n${pemainLama.nama} keluar, ${pemainBaru.nama} masuk!`
    };
}

function mainSepakBola() {
    menitPertandingan += 5;
    const aksi = [
        { teks: 'menendang', emoji: '⚽' },
        { teks: 'menyundul', emoji: '👆' },
        { teks: 'mengontrol', emoji: '🦶' },
        { teks: 'menyapu', emoji: '🦵' },
        { teks: 'menangkap', emoji: '🧤' },
        { teks: 'mengumpan', emoji: '👟' },
        { teks: 'istirahat', emoji: '💧' }
    ];
    const hasil = [
        { teks: 'gol spektakuler!', emoji: '⚽', poin: 3, kartu: null, stamina: -15 },
        { teks: 'gol!', emoji: '⚽', poin: 2, kartu: null, stamina: -10 },
        { teks: 'tendangan meleset', emoji: '❌', poin: 0, kartu: null, stamina: -5 },
        { teks: 'bola tertangkap', emoji: '🧤', poin: 0, kartu: null, stamina: -5 },
        { teks: 'bola keluar lapangan', emoji: '🚫', poin: 0, kartu: null, stamina: -5 },
        { teks: 'pelanggaran ringan', emoji: '🟨', poin: -1, kartu: 'kuning', stamina: -10 },
        { teks: 'pelanggaran keras', emoji: '🟥', poin: -2, kartu: 'merah', stamina: -20 },
        { teks: 'assist!', emoji: '👟', poin: 1, kartu: null, stamina: -8 },
        { teks: 'istirahat sejenak', emoji: '💧', poin: 0, kartu: null, stamina: 20 }
    ];
    
    const aksiAcak = aksi[Math.floor(Math.random() * aksi.length)];
    const hasilAcak = hasil[Math.floor(Math.random() * hasil.length)];
    
    // Update stamina
    staminaPemain += hasilAcak.stamina;
    staminaBot -= Math.floor(Math.random() * 10);
    
    // Batasi stamina antara 0-100
    staminaPemain = Math.max(0, Math.min(100, staminaPemain));
    staminaBot = Math.max(0, Math.min(100, staminaBot));
    
    // Update statistik
    if (aksiAcak.teks === 'menendang') {
        statistikPemain.tendangan++;
        if (hasilAcak.poin > 0) {
            statistikPemain.tendanganTepat++;
        }
    }
    
    if (hasilAcak.teks.includes('gol')) {
        statistikPemain.gol++;
        pemainAktif.gol++;
    }
    
    if (hasilAcak.teks === 'assist!') {
        statistikPemain.assist++;
        pemainAktif.assist++;
    }
    
    if (hasilAcak.teks.includes('pelanggaran')) {
        statistikPemain.pelanggaran++;
    }

    // Update kartu
    if (hasilAcak.kartu === 'kuning') {
        kartuKuningPemain++;
        statistikPemain.kartuKuning++;
        if (kartuKuningPemain >= 2) {
            kartuMerahPemain = true;
            statistikPemain.kartuMerah++;
        }
    } else if (hasilAcak.kartu === 'merah') {
        kartuMerahPemain = true;
        statistikPemain.kartuMerah++;
    }
    
    // Update skor
    if (hasilAcak.poin > 0) {
        skorPemain += hasilAcak.poin;
    } else if (hasilAcak.poin < 0) {
        skorBot += Math.abs(hasilAcak.poin);
    }
    
    // Cek waktu pertandingan
    const statusPertandingan = menitPertandingan >= 90 ? '⏰ Pertandingan Selesai!' : `⏱️ Menit: ${menitPertandingan}`;
    
    // Cek status kartu
    let statusKartu = '';
    if (kartuMerahPemain) {
        statusKartu = '🟥 Kartu Merah! Anda dikeluarkan dari pertandingan!';
    } else if (kartuKuningPemain > 0) {
        statusKartu = `🟨 Kartu Kuning: ${kartuKuningPemain}`;
    }

    // Cek status stamina
    let statusStamina = '';
    if (staminaPemain <= 20) {
        statusStamina = '⚠️ Stamina Anda hampir habis! Sebaiknya istirahat atau ganti pemain.';
    } else if (staminaPemain <= 50) {
        statusStamina = '⚡ Stamina Anda mulai menurun.';
    }
    
    return {
        aksi: aksiAcak.teks,
        aksiEmoji: aksiAcak.emoji,
        hasil: hasilAcak.teks,
        hasilEmoji: hasilAcak.emoji,
        skorPemain,
        skorBot,
        menitPertandingan,
        statusPertandingan,
        statusKartu,
        statusStamina,
        staminaPemain,
        staminaBot,
        statistik: statistikPemain,
        kartuMerah: kartuMerahPemain,
        pemainAktif,
        pemainCadangan,
        pergantianTersisa
    };
}

// Handle pesan masuk
client.on('message', async msg => {
    if (msg.body.startsWith('.')) {
        const command = msg.body.slice(1);
        
        try {
            if (command === 'help') {
                const helpMessage = `*Daftar Command yang Tersedia:*\n\n` +
                    `*.help* - Menampilkan daftar command\n` +
                    `*.tebakpemain* - Memulai permainan tebak pemain sepakbola\n` +
                    `*.tebakklub* - Memulai permainan tebak klub sepakbola\n` +
                    `*.jawab [nama pemain]* - Menjawab tebakan pemain\n` +
                    `*.jawabklub [nama klub]* - Menjawab tebakan klub\n` +
                    `*.creator* - Menampilkan informasi tentang pencipta bot\n` +
                    `*.mainbola* - Memulai mini game sepak bola\n` +
                    `*.resetbola* - Mereset pertandingan sepak bola\n` +
                    `*.ganti [nomor]* - Mengganti pemain (contoh: .ganti 1)\n\n` +
                    `Untuk menggunakan AI, cukup ketik pesan biasa setelah titik (.)`;
                await msg.reply(helpMessage);
                return;
            }

            if (command === 'resetbola') {
                skorPemain = 0;
                skorBot = 0;
                menitPertandingan = 0;
                kartuKuningPemain = 0;
                kartuMerahPemain = false;
                kartuKuningBot = 0;
                kartuMerahBot = false;
                staminaPemain = 100;
                staminaBot = 100;
                pergantianTersisa = 5;
                pemainAktif = {
                    nama: "Pemain Utama",
                    posisi: "Penyerang",
                    stamina: 100,
                    gol: 0,
                    assist: 0
                };
                pemainCadangan = [
                    { nama: "Pemain Cadangan 1", posisi: "Penyerang", stamina: 100 },
                    { nama: "Pemain Cadangan 2", posisi: "Gelandang", stamina: 100 },
                    { nama: "Pemain Cadangan 3", posisi: "Bek", stamina: 100 }
                ];
                statistikPemain = {
                    tendangan: 0,
                    tendanganTepat: 0,
                    gol: 0,
                    assist: 0,
                    pelanggaran: 0,
                    kartuKuning: 0,
                    kartuMerah: 0,
                    stamina: 100
                };
                await msg.reply('Pertandingan telah direset! Silakan mulai pertandingan baru dengan .mainbola');
                return;
            }

            if (command.startsWith('ganti ')) {
                const indexPemain = parseInt(command.slice(6)) - 1;
                const hasil = gantiPemain(indexPemain);
                await msg.reply(hasil.pesan);
                return;
            }

            if (command === 'mainbola') {
                const hasil = mainSepakBola();
                const pesan = `*⚽ Mini Game Sepak Bola ⚽*\n\n` +
                    `Anda ${hasil.aksi} bola ${hasil.aksiEmoji}...\n` +
                    `Hasil: ${hasil.hasilEmoji} ${hasil.hasil}\n` +
                    (hasil.statusKartu ? `\n${hasil.statusKartu}\n` : '') +
                    (hasil.statusStamina ? `\n${hasil.statusStamina}\n` : '') +
                    `\n*📊 Skor Pertandingan:*\n` +
                    `Pemain: ${hasil.skorPemain} - Bot: ${hasil.skorBot}\n` +
                    `${hasil.statusPertandingan}\n\n` +
                    `*👤 Pemain Aktif:*\n` +
                    `${hasil.pemainAktif.nama} (${hasil.pemainAktif.posisi})\n` +
                    `Stamina: ${hasil.staminaPemain}% ${hasil.staminaPemain <= 20 ? '⚠️' : hasil.staminaPemain <= 50 ? '⚡' : ''}\n` +
                    `⚽ Gol: ${hasil.pemainAktif.gol}\n` +
                    `👟 Assist: ${hasil.pemainAktif.assist}\n\n` +
                    `*🔄 Pemain Cadangan:*\n` +
                    (hasil.pemainCadangan.length > 0 ? 
                        hasil.pemainCadangan.map((pemain, index) => 
                            `${index + 1}. ${pemain.nama} (${pemain.posisi})`
                        ).join('\n') : 
                        'Tidak ada pemain cadangan tersisa') +
                    `\n\n🔄 Pergantian tersisa: ${hasil.pergantianTersisa}\n\n` +
                    `*📈 Statistik Pemain:*\n` +
                    `⚽ Tendangan: ${hasil.statistik.tendangan}\n` +
                    `🎯 Tendangan Tepat: ${hasil.statistik.tendanganTepat}\n` +
                    `⚽ Gol: ${hasil.statistik.gol}\n` +
                    `👟 Assist: ${hasil.statistik.assist}\n` +
                    `🟨 Pelanggaran: ${hasil.statistik.pelanggaran}\n` +
                    `🟨 Kartu Kuning: ${hasil.statistik.kartuKuning}\n` +
                    `🟥 Kartu Merah: ${hasil.statistik.kartuMerah}\n\n` +
                    (hasil.kartuMerah ? 
                        `🟥 Pertandingan selesai! Anda dikeluarkan karena kartu merah!\n` +
                        `Ketik .resetbola untuk memulai pertandingan baru` :
                        `Ketik .mainbola lagi untuk melanjutkan pertandingan!\n` +
                        `Ketik .ganti [nomor] untuk mengganti pemain\n` +
                        `Ketik .resetbola untuk memulai pertandingan baru`);
                await msg.reply(pesan);
                return;
            }

            if (command === 'creator') {
                await msg.reply('Bot ini dibuat oleh Vidi 👨‍💻');
                return;
            }

            if (command === 'tebakpemain') {
                pemainYangDitebak = getPemainAcak();
                const petunjuk = `Tebak pemain sepakbola!\n\nPetunjuk:\nKlub: ${pemainYangDitebak.klub}\nPosisi: ${pemainYangDitebak.posisi}\n\nKetik .jawab [nama pemain] untuk menjawab.`;
                await msg.reply(petunjuk);
                return;
            }

            if (command.startsWith('jawab ')) {
                const jawaban = command.slice(6).trim();
                
                if (!pemainYangDitebak) {
                    await msg.reply('Silakan mulai permainan dengan command .tebakpemain terlebih dahulu!');
                    return;
                }
                
                if (jawaban.toLowerCase() === pemainYangDitebak.nama.toLowerCase()) {
                    await msg.reply('Selamat! Jawaban Anda benar! 🎉');
                    pemainYangDitebak = null; // Reset pemain yang ditebak
                } else {
                    await msg.reply(`Maaf, jawaban Anda salah. Pemain yang benar adalah ${pemainYangDitebak.nama}`);
                    pemainYangDitebak = null; // Reset pemain yang ditebak
                }
                return;
            }

            if (command === 'tebakklub') {
                klubYangDitebak = getKlubAcak();
                const petunjuk = `Tebak klub sepakbola!\n\nPetunjuk:\nLiga: ${klubYangDitebak.liga}\nNegara: ${klubYangDitebak.negara}\nTahun Berdiri: ${klubYangDitebak.tahunBerdiri}\n\nKetik .jawabklub [nama klub] untuk menjawab.`;
                await msg.reply(petunjuk);
                return;
            }

            if (command.startsWith('jawabklub ')) {
                const jawaban = command.slice(10).trim();
                
                if (!klubYangDitebak) {
                    await msg.reply('Silakan mulai permainan dengan command .tebakklub terlebih dahulu!');
                    return;
                }
                
                if (jawaban.toLowerCase() === klubYangDitebak.nama.toLowerCase()) {
                    await msg.reply(`Selamat! Jawaban Anda benar! 🎉\n\nInformasi klub:\nNama: ${klubYangDitebak.nama}\nLiga: ${klubYangDitebak.liga}\nNegara: ${klubYangDitebak.negara}\nTahun Berdiri: ${klubYangDitebak.tahunBerdiri}`);
                    klubYangDitebak = null; // Reset klub yang ditebak
                } else {
                    await msg.reply(`Maaf, jawaban Anda salah. Klub yang benar adalah ${klubYangDitebak.nama}`);
                    klubYangDitebak = null; // Reset klub yang ditebak
                }
                return;
            }

            // Kirim pesan "sedang mengetik..."
            await msg.reply('sedang mengetik...');
            
            // Dapatkan model Gemini
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            
            // Tambahkan instruksi untuk merespons dalam bahasa Sunda
            const promptSunda = `Mangga jawab pertanyaan ieu dina basa Sunda:\n${command}`;
            
            // Dapatkan respons dari Google AI
            const result = await model.generateContent(promptSunda);
            const response = await result.response;
            const text = response.text();

            // Kirim respons
            await msg.reply(text);
        } catch (error) {
            console.error('Error:', error);
            await msg.reply('Maaf, terjadi kesalahan dalam memproses permintaan Anda.');
        }
    }
});

// Inisialisasi client
client.initialize(); 