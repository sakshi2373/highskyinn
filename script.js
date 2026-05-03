// SIGNUP
let signupForm = document.getElementById("signupForm");

if (signupForm) {
signupForm.addEventListener("submit", function(e){
e.preventDefault();

localStorage.setItem("name", name.value);
localStorage.setItem("email", email.value);
localStorage.setItem("password", password.value);

alert("Signup Successful");
window.location.href = "login.html";
});
}


// LOGIN
let loginForm = document.getElementById("loginForm");

if (loginForm) {
loginForm.addEventListener("submit", function(e){
e.preventDefault();

let savedEmail = localStorage.getItem("email");
let savedPassword = localStorage.getItem("password");

if(loginEmail.value == savedEmail && loginPassword.value == savedPassword){
localStorage.setItem("login","true");
window.location.href = "dashboard.html";
}else{
alert("Wrong Login");
}
});
}


// SHOW USERNAME
let username = document.getElementById("username");

if(username){
username.innerText = localStorage.getItem("name");
}


// BOOKING SAVE
let bookForm = document.getElementById("bookForm");

if(bookForm){
bookForm.addEventListener("submit", function(e){
e.preventDefault();

let booking = {
name: guestName.value,
checkin: checkin.value,
checkout: checkout.value,
room: room.value
};

localStorage.setItem("booking", JSON.stringify(booking));

alert("Booking Confirmed!");
window.location.href = "bookings.html";
});
}


// SHOW BOOKING
let bookingData = document.getElementById("bookingData");

if(bookingData){
let data = JSON.parse(localStorage.getItem("booking"));

if(data){
bookingData.innerHTML = `
<p>Name: ${data.name}</p>
<p>Room: ${data.room}</p>
<p>Check-in: ${data.checkin}</p>
<p>Check-out: ${data.checkout}</p>
`;
}else{
bookingData.innerHTML = "No Booking Found";
}
}


// LOGOUT
function logout(){
localStorage.removeItem("login");
window.location.href = "login.html";
}


// ADMIN LOGIN
let adminLoginForm = document.getElementById("adminLoginForm");

if(adminLoginForm){
adminLoginForm.addEventListener("submit", function(e){
e.preventDefault();

if(adminUser.value == "admin" && adminPass.value == "1234"){
localStorage.setItem("adminLogin","true");
window.location.href = "admin.html";
}else{
alert("Wrong Admin Login");
}
});
}


// SHOW ALL BOOKINGS
let allBookings = document.getElementById("allBookings");

if(allBookings){
let data = JSON.parse(localStorage.getItem("booking"));

if(data){
allBookings.innerHTML = `
<p>Name: ${data.name}</p>
<p>Room: ${data.room}</p>
<p>Check-in: ${data.checkin}</p>
<p>Check-out: ${data.checkout}</p>

<button onclick="deleteBooking()">Delete Booking</button>
`;
}else{
allBookings.innerHTML = "No Booking Found";
}
}


// DELETE BOOKING
function deleteBooking(){
localStorage.removeItem("booking");
location.reload();
}


// UPDATE PRICE
function updatePrice(){
let room = roomName.value;
let price = newPrice.value;

alert(room + " Price Updated to ₹" + price);
}


// ADMIN LOGOUT
function adminLogout(){
localStorage.removeItem("adminLogin");
window.location.href = "admin-login.html";
}