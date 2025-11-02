document.addEventListener("DOMContentLoaded", function() {

  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modalImg');
  const modalNama = document.getElementById('modalNama');
  const modalKategori = document.getElementById('modalKategori');
  const modalHarga = document.getElementById('modalHarga');
  const modalDeskripsi = document.getElementById('modalDeskripsi');
  const tutupModal = document.getElementById('tutupModal');

  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
      modalImg.src = card.dataset.img;
      modalNama.textContent = card.dataset.nama;
      modalKategori.textContent = "Ras: " + card.dataset.kategori;
      modalHarga.textContent = "Harga: " + card.dataset.harga;
      modalDeskripsi.textContent = card.dataset.deskripsi;
      modal.classList.add('show');
    });
  });


  tutupModal.addEventListener('click', () => modal.classList.remove('show'));
  modal.addEventListener('click', e => {
    if (e.target === modal) modal.classList.remove('show');
  });


  const cariInput = document.getElementById('cariInput');
  const kategoriSelect = document.getElementById('kategoriSelect');
  const cariBtn = document.getElementById('cariBtn');

  function filterKucing() {
    const cari = cariInput.value.toLowerCase().trim();
    const kategori = kategoriSelect.value.toLowerCase();

    document.querySelectorAll('.card').forEach(card => {
      const nama = card.dataset.nama.toLowerCase();
      const kat = card.dataset.kategori.toLowerCase();

      const cocokNama = nama.includes(cari);
      const cocokKat = kat.includes(cari);
      const cocokFilterKat = kategori === "" || kategori === kat;

      if ((cocokNama || cocokKat) && cocokFilterKat) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  }

  cariBtn.addEventListener('click', filterKucing);
  cariInput.addEventListener('input', filterKucing);
  kategoriSelect.addEventListener('change', filterKucing);


  document.getElementById('uploadForm').addEventListener('submit', e => {
    e.preventDefault();
    const nama = e.target.nama.value;
    const kategori = e.target.kategori.value;
    const harga = e.target.harga.value;
    const deskripsi = e.target.deskripsi.value;
    const file = document.getElementById('gambarInput').files[0];

    if (!file) {
      alert("Harap pilih gambar kucing!");
      return;
    }

    const reader = new FileReader();
    reader.onload = function(evt) {
      const src = evt.target.result;
      const newCard = document.createElement('div');
      newCard.className = 'card';
      newCard.dataset.nama = nama;
      newCard.dataset.kategori = kategori;
      newCard.dataset.harga = `Rp ${parseInt(harga).toLocaleString()}`;
      newCard.dataset.deskripsi = deskripsi;
      newCard.dataset.img = src;
      newCard.innerHTML = `
        <img src="${src}" alt="${nama}">
        <h3>${nama}</h3>
        <p>Ras: ${kategori}</p>
        <p>Harga: Rp ${parseInt(harga).toLocaleString()}</p>
      `;
      newCard.addEventListener('click', () => {
        modalImg.src = src;
        modalNama.textContent = nama;
        modalKategori.textContent = "Ras: " + kategori;
        modalHarga.textContent = "Harga: Rp " + parseInt(harga).toLocaleString();
        modalDeskripsi.textContent = deskripsi;
        modal.classList.add('show');
      });

      document.getElementById('listGrid').appendChild(newCard);
      e.target.reset();
      alert("Kucing berhasil ditambahkan!");
    };
    reader.readAsDataURL(file);
  });


  document.querySelectorAll('.gallery-grid img').forEach(img => {
    img.addEventListener('click', () => {
      modalImg.src = img.src;
      modalNama.textContent = "Galeri Kucing";
      modalKategori.textContent = "";
      modalHarga.textContent = "";
      modalDeskripsi.textContent = "";
      modal.classList.add('show');
    });
  });

});

document.getElementById("btnRekomendasi").addEventListener("click", function() {
  const budget = document.getElementById("budget").value;
  const perawatan = document.getElementById("perawatan").value;
  const hasil = document.getElementById("hasilRekomendasi");
  const gambar = document.getElementById("gambarRekomendasi");

  let rekomendasi = "";
  let gambarKucing = "";

  if (budget === "murah" && perawatan === "mudah") {
    rekomendasi = "🐾 Rekomendasi: Kucing Kampung — Murah, sehat, dan mudah dirawat!";
    gambarKucing = "kucing kampung.jpg";
  } else if (budget === "sedang" && perawatan === "sedang") {
    rekomendasi = "🐱 Rekomendasi: Kucing Persia — Bulu lebat dan lucu, perawatan sedang.";
    gambarKucing = "persia.jpg";
  } else if (budget === "mahal" && perawatan === "sulit") {
    rekomendasi = "😺 Rekomendasi: Kucing Sphynx — Elegan dan langka, tapi perawatannya sulit.";
    gambarKucing = "Sphynx.jpg";
  } else if (budget === "mahal" && perawatan === "sedang") {
    rekomendasi = "🐈‍⬛ Rekomendasi: Kucing Maine Coon — Besar, lucu, dan cerdas.";
    gambarKucing = "Maine Coon.webp";
  } else {
    rekomendasi = "❓ Coba kombinasi pilihan lain untuk melihat rekomendasi.";
  }

  hasil.textContent = rekomendasi;
  gambar.innerHTML = gambarKucing ? `<img src="${gambarKucing}" alt="Rekomendasi" style="width:250px; border-radius:10px; margin-top:10px;">` : "";
});

const chatbotHeader = document.getElementById("chatbot-header");
const chatbotBody = document.getElementById("chatbot-body");
const chatbotMessages = document.getElementById("chatbot-messages");
const chatbotInput = document.getElementById("chatbot-input");
const chatbotSend = document.getElementById("chatbot-send");

let step = 0;
let userData = {};

chatbotHeader.addEventListener("click", () => {
  chatbotBody.style.display = chatbotBody.style.display === "flex" ? "none" : "flex";
});

function botReply(text) {
  const msg = document.createElement("div");
  msg.className = "bot-msg";
  msg.textContent = text;
  chatbotMessages.appendChild(msg);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function userReply(text) {
  const msg = document.createElement("div");
  msg.className = "user-msg";
  msg.textContent = text;
  chatbotMessages.appendChild(msg);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function nextQuestion() {
  if (step === 0) botReply("Hai! Aku Asisten Kucing 🐾 Siap bantu carikan kucing cocok buatmu!");
  if (step === 1) botReply("Berapa anggaran kamu? (murah/sedang/mahal)");
  if (step === 2) botReply("Kamu lebih suka kucing yang perawatannya mudah, sedang, atau sulit?");
  if (step === 3) botReply("Apakah kamu punya waktu luang banyak atau sedikit?");
  if (step === 4) {
    let rekom = "";
    const { budget, perawatan, waktu } = userData;
    if (budget === "murah") rekom = "Kucing Kampung 🐱 — Murah, sehat, dan mudah dirawat!";
    else if (budget === "sedang" && perawatan === "sedang") rekom = "Kucing Persia 😻 — Lembut dan manja!";
    else if (budget === "mahal" && perawatan === "sulit") rekom = "Kucing Sphynx 😺 — Langka dan elegan!";
    else if (budget === "mahal" && waktu === "banyak") rekom = "Maine Coon 🐈‍⬛ — Besar dan aktif bermain!";
    else rekom = "Coba cek kucing Anggora — lucu dan bersahabat 🐾";
    botReply("Rekomendasi untukmu: " + rekom);
  }
}

chatbotSend.addEventListener("click", () => {
  const text = chatbotInput.value.trim().toLowerCase();
  if (!text) return;
  userReply(chatbotInput.value);
  chatbotInput.value = "";

  if (step === 1) userData.budget = text;
  if (step === 2) userData.perawatan = text;
  if (step === 3) userData.waktu = text;

  step++;
  setTimeout(nextQuestion, 600);
});

setTimeout(() => {
  step = 0;
  nextQuestion();
  step = 1;
}, 1000);
