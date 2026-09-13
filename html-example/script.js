// หาปุ่มและช่องข้อความจาก id ที่ตั้งไว้ใน index.html
const button = document.getElementById('greet-button');
const output = document.getElementById('greet-output');

// ผูก event: พอปุ่มถูกกด ให้รันฟังก์ชันนี้
button.addEventListener('click', () => {
  // เปลี่ยนข้อความในช่อง output
  output.textContent = 'สวัสดี! นี่คือข้อความจาก JavaScript 👋';
});
