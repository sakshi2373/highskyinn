// ==========================
// SIGNUP
// ==========================

let signupForm =
document.getElementById("signupForm");


if(signupForm){

signupForm.addEventListener(
"submit",
function(e){

e.preventDefault();

let name =
document.getElementById("name").value;

let email =
document.getElementById("email").value;

let password =
document.getElementById("password").value;


// SAVE USER DATA
localStorage.setItem("name", name);

localStorage.setItem("email", email);

localStorage.setItem("password", password);


alert("Signup Successful");


window.location.href =
"login.html";

});

}



// ==========================
// LOGIN
// ==========================

let loginForm =
document.getElementById("loginForm");


if(loginForm){

loginForm.addEventListener(
"submit",
function(e){

e.preventDefault();

let email =
document.getElementById("loginEmail").value;

let password =
document.getElementById("loginPassword").value;


// GET SAVED DATA
let savedEmail =
localStorage.getItem("email");

let savedPassword =
localStorage.getItem("password");


// CHECK LOGIN
if(
email == savedEmail &&
password == savedPassword
){

localStorage.setItem(
"login",
"true"
);

alert("Login Successful");

window.location.href =
"dashboard.html";

}else{

alert("Wrong Email or Password");

}

});

}



// ==========================
// SHOW USER NAME
// ==========================

let username =
document.getElementById("username");


if(username){

let name =
localStorage.getItem("name");


if(name){

username.innerText = name;

}else{

username.innerText = "User";

}

}



// ==========================
// USER LOGOUT
// ==========================

function logout(){

localStorage.removeItem("login");

window.location.href =
"login.html";

}



// ==========================
// BOOKING SYSTEM
// ==========================

let bookingData =
document.getElementById("bookingData");


if(bookingData){

let data =
JSON.parse(
localStorage.getItem("bookings")
) || [];


if(data.length > 0){

bookingData.innerHTML =
"<h3>✅ Your Bookings</h3>";


data.forEach((b, index)=>{

bookingData.innerHTML += `

<p><b>Name:</b> ${b.name}</p>

<p><b>Room:</b> ${b.room}</p>

<p><b>Check-in:</b> ${b.checkin}</p>

<p><b>Check-out:</b> ${b.checkout}</p>

<button onclick="deleteBooking(${index})">
Cancel Booking
</button>

<hr>

`;

});

}else{

bookingData.innerHTML =
"No Booking Found";

}

}



// ==========================
// DELETE BOOKING
// ==========================

function deleteBooking(index){

let bookings =
JSON.parse(
localStorage.getItem("bookings")
) || [];


bookings.splice(index, 1);


localStorage.setItem(
"bookings",
JSON.stringify(bookings)
);


location.reload();

}



// ==========================
// ADMIN LOGIN
// ==========================

let adminLoginForm =
document.getElementById("adminLoginForm");


if(adminLoginForm){

adminLoginForm.addEventListener(
"submit",
function(e){

e.preventDefault();

if(
adminUser.value == "admin"
&&
adminPass.value == "1234"
){

localStorage.setItem(
"adminLogin",
"true"
);

window.location.href =
"admin.html";

}else{

alert("Wrong Admin Login");

}

});

}



// ==========================
// ADMIN BOOKINGS
// ==========================

let allBookings =
document.getElementById("allBookings");


if(allBookings){

let data =
JSON.parse(
localStorage.getItem("bookings")
) || [];


if(data.length > 0){

allBookings.innerHTML =
"<h3>All Bookings</h3>";


data.forEach((b,index)=>{

allBookings.innerHTML += `

<p>Name: ${b.name}</p>

<p>Room: ${b.room}</p>

<p>Check-in: ${b.checkin}</p>

<p>Check-out: ${b.checkout}</p>

<button onclick="deleteBooking(${index})">
Delete
</button>

<hr>

`;

});

}else{

allBookings.innerHTML =
"No Booking Found";

}

}



// ==========================
// ADMIN LOGOUT
// ==========================

function adminLogout(){

localStorage.removeItem(
"adminLogin"
);

window.location.href =
"admin-login.html";

}



// ==========================
// ROOM IMAGE SLIDER
// ==========================

let images = [

"images/room1.jpg",
"images/room2.jpg",
"images/room3.jpg"

];


let i = 0;


setInterval(()=>{

let slider =
document.getElementById("roomSlider");


if(slider){

i++;

if(i >= images.length){
i = 0;
}

slider.src = images[i];

}

},3000);






// ==========================
// PAYMENT + BOOKING
// ==========================

function payNow(){

let guestName =
document.getElementById("guestName").value;

let checkin =
document.getElementById("checkin").value;

let checkout =
document.getElementById("checkout").value;

let room =
document.getElementById("room").value;


// VALIDATION
if(
guestName == "" ||
checkin == "" ||
checkout == "" ||
room == ""
){

alert("Please Fill All Fields");

return;

}


// PRICE
let amount = 1500;

if(room == "Room 2") amount = 1800;
if(room == "Room 3") amount = 2200;
if(room == "Room 4") amount = 2500;
if(room == "Room 5") amount = 3000;


// RAZORPAY
var options = {

"key": "rzp_test_Sl9smYpKtYyMe4",

"amount": amount * 100,

"currency": "INR",

"name": "High Sky Inn",

"description": "Room Booking Payment",


"handler": function (response){

alert(
"Payment Successful ✅"
);


// SAVE BOOKING
let booking = {

name: guestName,
room: room,
checkin: checkin,
checkout: checkout

};


let bookings =
JSON.parse(
localStorage.getItem("bookings")
) || [];


bookings.push(booking);


localStorage.setItem(
"bookings",
JSON.stringify(bookings)
);


window.location.href =
"bookings.html";

},


"theme": {
"color": "#0d1b2a"
}

};


var rzp1 = new Razorpay(options);

rzp1.open();

}