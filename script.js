// ================= SIGNUP =================
let signupForm = document.getElementById("signupForm");

if (signupForm) {
signupForm.addEventListener("submit", function(e){
e.preventDefault();

let name = document.getElementById("name").value;
let email = document.getElementById("email").value;
let password = document.getElementById("password").value;

localStorage.setItem("name", name);
localStorage.setItem("email", email.value);
localStorage.setItem("password", password.value);

alert("Signup Successful");
console.log("Saved Name:", name);
window.location.href = "login.html";
});
}


// ================= LOGIN =================
let loginForm = document.getElementById("loginForm");

if (loginForm) {
loginForm.addEventListener("submit", function(e){
e.preventDefault();

let savedEmail = localStorage.getItem("email");
let savedPassword = localStorage.getItem("password");
let savedName = localStorage.getItem("name");

if(loginEmail.value == savedEmail && loginPassword.value == savedPassword){
localStorage.setItem("login","true");
localStorage.setItem("name", savedName);
window.location.href = "dashboard.html";
}else{
alert("Wrong Login");
}
});
}


// ================= SHOW USERNAME =================
let username = document.getElementById("username");

if(username){
let name = localStorage.getItem("name");

if(name){
username.innerText = name;
}else{
username.innerText = "User";
}
}


// ================= BOOKING =================
let bookForm = document.getElementById("bookForm");

if(bookForm){

bookForm.addEventListener("submit", function(e){
e.preventDefault();

fetch("http://localhost:5000/booking", {
method: "POST",

headers: {
"Content-Type": "application/json"
},

body: JSON.stringify({
name: guestName.value,
checkin: checkin.value,
checkout: checkout.value,
room: room.value
})

})
.then(res => res.text())
.then(data => {
alert("Proceed to payment");
});
});
}


// ================= PAYMENT (RAZORPAY + MULTIPLE BOOKINGS) =================
function payNow(){

let amount = 10000;

if(room.value == "Deluxe") amount = 20000;
else if(room.value == "Suite") amount = 50000;

var options = {
    "key": "rzp_test_Sl9smYpKtYyMe4",
    "amount": amount,
    "currency": "INR",
    "name": "High Sky Inn",
    "description": "Room Booking Payment",

    "handler": function (response){

        alert("Payment Successful! ID: " + response.razorpay_payment_id);

        let booking = {
            name: guestName.value,
            checkin: checkin.value,
            checkout: checkout.value,
            room: room.value
        };

        let existingBookings = JSON.parse(localStorage.getItem("bookings")) || [];

        let isAvailable = true;

        for(let i=0; i<existingBookings.length; i++){

            let b = existingBookings[i];

            if(b.room === booking.room){

                if(
                    (booking.checkin >= b.checkin && booking.checkin <= b.checkout) ||
                    (booking.checkout >= b.checkin && booking.checkout <= b.checkout)
                ){
                    isAvailable = false;
                    break;
                }
            }
        }

        if(!isAvailable){
            alert("❌ Room already booked for selected dates!");
            return;
        }

        existingBookings.push(booking);

        localStorage.setItem("bookings", JSON.stringify(existingBookings));

        window.location.href = "bookings.html";
    },

    "theme": {
        "color": "#0d1b2a"
    }
};

var rzp1 = new Razorpay(options);
rzp1.open();

}


// ================= SHOW ALL BOOKINGS (USER) =================
let bookingData = document.getElementById("bookingData");

if(bookingData){

let data = JSON.parse(localStorage.getItem("bookings")) || [];

if(data.length > 0){

bookingData.innerHTML = "<h3>✅ Your Bookings</h3>";

data.forEach((b, index) => {
bookingData.innerHTML += `
<p><b>Name:</b> ${b.name}</p>
<p><b>Room:</b> ${b.room}</p>
<p><b>Check-in:</b> ${b.checkin}</p>
<p><b>Check-out:</b> ${b.checkout}</p>
<button onclick="deleteBooking(${index})">Cancel Booking</button>
<hr>
`;
});

}else{
bookingData.innerHTML = "No Booking Found";
}

}


// ================= DELETE BOOKING =================
function deleteBooking(index){

let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

bookings.splice(index, 1);

localStorage.setItem("bookings", JSON.stringify(bookings));

location.reload();
}


// ================= USER LOGOUT =================
function logout(){
localStorage.removeItem("login");
window.location.href = "login.html";
}


// ================= ADMIN LOGIN =================
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


// ================= ADMIN SHOW BOOKINGS =================
let allBookings = document.getElementById("allBookings");

if(allBookings){

let data = JSON.parse(localStorage.getItem("bookings")) || [];

if(data.length > 0){

allBookings.innerHTML = "<h3>All Bookings</h3>";

data.forEach((b, index) => {
allBookings.innerHTML += `
<p>Name: ${b.name}</p>
<p>Room: ${b.room}</p>
<p>Check-in: ${b.checkin}</p>
<p>Check-out: ${b.checkout}</p>
<button onclick="deleteBooking(${index})">Delete</button>
<hr>
`;
});

}else{
allBookings.innerHTML = "No Booking Found";
}

}


// ================= ADMIN LOGOUT =================
function adminLogout(){
localStorage.removeItem("adminLogin");
window.location.href = "admin-login.html";
}


// ================= ROOM IMAGE SLIDER =================
let images = [
"images/room1.jpg",
"images/room2.jpg",
"images/room3.jpg"
];

let i = 0;

setInterval(() => {

let slider = document.getElementById("roomSlider");

if(slider){
i++;
if(i >= images.length){
i = 0;
}
slider.src = images[i];
}

}, 3000);


// ================= FIREBASE OTP LOGIN =================
let confirmationResult;

window.onload = function(){

if(document.getElementById("recaptcha")){
window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha', {
size: 'normal'
});
}

};

function sendOTP(){

let phone = document.getElementById("phone").value;

firebase.auth().signInWithPhoneNumber(phone, window.recaptchaVerifier)
.then((result)=>{
confirmationResult = result;
alert("OTP Sent Successfully");
})
.catch((error)=>{
alert(error.message);
});

}

function verifyOTP(){

let code = document.getElementById("otp").value;

confirmationResult.confirm(code)
.then((result)=>{
alert("Login Successful");
localStorage.setItem("login","true");
window.location.href = "dashboard.html";
})
.catch(()=>{
alert("Wrong OTP");
});

}