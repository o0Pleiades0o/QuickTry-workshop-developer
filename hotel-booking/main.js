let allHotels = [];

async function loadHotels() {
  const res = await fetch('hotels.json');
  allHotels = await res.json();
  renderHotels(allHotels);
}

function renderHotels(list) {
  const grid = document.getElementById('hotel-grid');
  grid.innerHTML = list.map(cardHTML).join('');
}

// แปลงคะแนนเป็นดาว เช่น 4 → ★★★★☆
function stars(n) {
  return '★'.repeat(n) + '☆'.repeat(5 - n);
}

// โครงหน้าตาของการ์ดโรงแรม 1 ใบ
function cardHTML(hotel) {
  // แท็กสิ่งอำนวยความสะดวก (WiFi, สระว่ายน้ำ, ...)
  const tags = hotel.amenities
    .map((a) => `<span class="text-xs bg-stone-100 text-stone-600 px-2 py-1 rounded-md">${a}</span>`)
    .join('');

  return `
    <article class="reveal bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition overflow-hidden">

      <!-- รูปโรงแรม: ถ้ารูปโหลดไม่ขึ้น จะโชว์อีโมจิแทน (onerror) -->
      <div class="relative aspect-[4/3] overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-br from-teal-50 to-cyan-100 flex items-center justify-center text-7xl">${hotel.emoji}</div>
        <img src="${hotel.image}" alt="${hotel.name}" loading="lazy"
          class="relative w-full h-full object-cover" onerror="this.remove()" />
        ${hotel.rating === 5 ? `<span class="absolute top-3 left-3 bg-amber-400 text-stone-900 text-xs font-bold px-2.5 py-1 rounded-full">ยอดนิยม</span>` : ''}
        <span class="absolute top-3 right-3 bg-white/90 text-teal-700 text-xs font-semibold px-2 py-1 rounded-full">ยกเลิกฟรี</span>
      </div>

      <div class="p-5">
        <div class="flex items-start justify-between gap-2">
          <h4 class="font-semibold text-lg">${hotel.name}</h4>
          <span class="shrink-0 bg-teal-50 text-teal-700 text-sm font-bold px-2 py-1 rounded-lg">${hotel.rating}.0</span>
        </div>

        <!-- เมือง + ดาว + จำนวนรีวิว (ไอคอนหมุดตำแหน่ง ไม่ต้องแก้) -->
        <p class="flex items-center gap-1 text-stone-500 text-sm mt-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 21s-6-5.686-6-10a6 6 0 1 1 12 0c0 4.314-6 10-6 10z"/><circle cx="12" cy="11" r="2"/></svg>
          ${hotel.city} · <span class="text-amber-500">${stars(hotel.rating)}</span> <span class="text-stone-400">(${hotel.reviews})</span>
        </p>

        <!-- สิ่งอำนวยความสะดวก -->
        <div class="flex flex-wrap gap-1.5 mt-3">${tags}</div>

        <div class="flex items-end justify-between mt-4">
          <p>
            ${hotel.oldPrice ? `<span class="text-stone-400 line-through text-sm">฿${hotel.oldPrice}</span> ` : ''}
            <span class="text-teal-600 font-bold text-lg">฿${hotel.price}</span>
            <span class="text-stone-400 text-sm">/ คืน</span>
          </p>
          <a href="#" class="text-teal-600 font-medium text-sm hover:underline">ดูรายละเอียด</a>
        </div>
      </div>
    </article>
  `;
}

function filterHotels(city) {
  // TODO
}

//  ต่อปุ่มกรองให้เรียก filterHotels + ไฮไลต์ปุ่มที่เลือกอยู่
document.querySelectorAll('.filter-btn').forEach((btn) => {
  btn.onclick = () => {
    // คืนทุกปุ่มให้เป็นสีขาว (ปุ่มปกติ)
    document.querySelectorAll('.filter-btn').forEach((b) => {
      b.classList.remove('bg-teal-600', 'text-white', 'border-teal-600');
      b.classList.add('bg-white');
    });
    // ทำปุ่มที่กดให้เป็นสีเขียว (ปุ่มที่เลือกอยู่)
    btn.classList.remove('bg-white');
    btn.classList.add('bg-teal-600', 'text-white', 'border-teal-600');
    filterHotels(btn.dataset.city);
  };
});

loadHotels();
