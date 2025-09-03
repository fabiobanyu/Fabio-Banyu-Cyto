// ===========================
// 1. SCROLL REVEAL ANIMATION
// ===========================
const revealElements = document.querySelectorAll('section, .project-card, .non-project, .stat-item, .stat-item2, .stat-item3');
//revealElements adalah elemen yang akan dianimasikan saat di-scroll
//querySelectorAll digunakan untuk memilih semua elemen yang dipilih berdasarkan selector yang diberikan
//section, .project-card, .non-project, .stat-item, .stat-item2, .stat-item3 adalah selector yang digunakan untuk memilih elemen yang akan dianimasikan

const scrollObserver = new IntersectionObserver((entries) => {
  //scrollObserver adalah objek yang digunakan untuk mengamati perubahan visibilitas elemen saat di-scroll
  //IntersectionObserver adalah API yang memungkinkan kita untuk mengamati perubahan visibilitas elemen saat di-scroll
  //entries adalah daftar entri yang diamati oleh observer
  entries.forEach(entry => { //forEach digunakan untuk iterasi setiap entry dalam daftar entries
    if (entry.isIntersecting) { //isIntersecting adalah properti yang menunjukkan apakah elemen saat ini terlihat di viewport
      // Jika elemen terlihat, tambahkan kelas 'revealed' untuk memicu animasi
      entry.target.classList.add('revealed');
    }
  });
}, {
  threshold: 0.1
});

revealElements.forEach(el => {
  el.classList.add('before-reveal');
  scrollObserver.observe(el);
});

// ===========================
// 2. ANIMASI KETIK UNTUK NAMA
// ===========================
const nameElement = document.querySelector('.hero-text .name'); //nameElement adalah elemen yang berisi nama yang akan diketik
const fullText = nameElement.textContent; // fullText adalah teks lengkap yang akan diketik
nameElement.textContent = ''; // Kosongkan teks awal untuk animasi ketik
let i = 0; // Mulai dari indeks 0 untuk animasi ketik

function typeName() {
  if (i < fullText.length) { //selama i kurang dari panjang fullText, maka i akan bertambah sampai panjang fullText terpenuhi
    nameElement.textContent += fullText.charAt(i);
    i++;
    setTimeout(typeName, 100); // kecepatan ketik
  }
}

window.addEventListener('DOMContentLoaded', typeName);

// ===========================
// 3. SMOOTH SCROLL NAVBAR
// ===========================
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => { //a[href^="#"] adalah elemen anchor yang memiliki href yang dimulai dengan #
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetID = this.getAttribute('href');
    document.querySelector(targetID).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// ==================================
// 4. EFEK KEMIRINGAN 3D (TILT EFFECT)
// ==================================
const tiltCards = document.querySelectorAll('.project-card');

tiltCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // Posisi x mouse di dalam kartu
    const y = e.clientY - rect.top;  // Posisi y mouse di dalam kartu

    const centerX = card.offsetWidth / 2;
    const centerY = card.offsetHeight / 2;

    const rotateX = (y - centerY) / 10; // Intensitas rotasi sumbu X
    const rotateY = (centerX - x) / 10; // Intensitas rotasi sumbu Y

    // Terapkan transformasi CSS
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
  });

  // Reset posisi kartu saat mouse meninggalkan area
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  });
});

// ==================================
// 5. FUNGSI MODAL UNTUK PROJECT CARD
// ==================================
// Pastikan kode ini dijalankan setelah seluruh halaman dimuat
document.addEventListener('DOMContentLoaded', () => {

  // Ambil semua elemen yang diperlukan
  const projectCards = document.querySelectorAll('.project-card');
  const modal = document.getElementById('projectModal');

  // Periksa apakah elemen modal ada sebelum melanjutkan
  if (modal) {
    const closeButton = modal.querySelector('.close-button');
    const modalImage = modal.querySelector('#modalImage');
    const modalTitle = modal.querySelector('#modalTitle');
    const modalDescription = modal.querySelector('#modalDescription');

    // Tambahkan event listener untuk setiap kartu proyek
    projectCards.forEach(card => {
      card.addEventListener('click', () => {
        // Ambil data dari atribut data-* kartu yang diklik
        const image = card.dataset.image;
        const title = card.dataset.title;
        const description = card.dataset.description;
        
        // Masukkan data ke dalam elemen modal
        modalImage.src = image;
        modalTitle.textContent = title;
        modalDescription.textContent = description;
        
        // Tampilkan modal
        modal.style.display = 'flex';
      });
    });

    // Fungsi untuk menutup modal
    const closeModal = () => {
      modal.style.display = 'none';
    }

    // Tambahkan event listener untuk tombol close
    closeButton.addEventListener('click', closeModal);

    // Tambahkan event listener untuk menutup modal saat mengklik area luar (overlay)
    modal.addEventListener('click', (e) => {
      // Jika yang diklik adalah area overlay itu sendiri, bukan konten di dalamnya
      if (e.target === modal) {
        closeModal();
      }
    });

    // (Opsional) Menutup modal dengan tombol 'Escape' di keyboard
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.style.display === 'flex') {
        closeModal();
      }
    });
  }

});

// ===========================
// 6. BURGER MENU FUNCTIONALITY
// ===========================
document.addEventListener('DOMContentLoaded', function() {
  const burgerIcon = document.querySelector('.burger-icon');
  const menu = document.querySelector('.Menu');

  burgerIcon.addEventListener('click', function() {
    menu.classList.toggle('active');
  });

  // Biar otomatis nutup setelah klik menu di HP
  document.querySelectorAll('.Menu a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('active');
    });
  });
});
