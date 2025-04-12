// toggle the arrow and the answer visibility
let faqItem = document.querySelectorAll('.faq-item');

faqItem.forEach((ele) => {
    ele.addEventListener('click' , () => {
        ele.classList.toggle('open');
    })
}) ;


// Login and Register Form
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const closeBtns = document.querySelectorAll('.close');

loginBtn.addEventListener('click', () => {
    loginForm.style.display = 'flex';
});

registerBtn.addEventListener('click', () => {
    registerForm.style.display = 'flex';
});

closeBtns.forEach( (btn) => {
    btn.addEventListener('click', () => {
        loginForm.style.display = 'none';
        registerForm.style.display = 'none';
    });
});

window.addEventListener('click', (e) => {
    if (e.target === loginForm || e.target === registerForm) {
        loginForm.style.display = 'none';
        registerForm.style.display = 'none';
    }
});



//Redirect Login page to Registration page
const createAccount = document.querySelector('.createAccount');

createAccount.addEventListener('click' , (e) => {

    e.preventDefault();
    registerForm.style.display = 'flex';
    loginForm.style.display = 'none';
})

//Redirect Registration page to Login page
const loginWithAccount = document.querySelector('.login-with-account');

loginWithAccount.addEventListener('click' , (e) => {

    e.preventDefault();
    loginForm.style.display = 'flex';
    registerForm.style.display = 'none';
})


// Event listener for the Register form submission
const register =  document.getElementById('register');

register.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    const phone = document.getElementById('phone').value;

    if (name && email && password && phone) {
       
        const user = {
            name: name,
            email: email,
            password: password,
            phone: phone
        };

        localStorage.setItem(email, JSON.stringify(user));

        alert('Registration successful!');
        register.reset(); 
        registerForm.style.display = 'none'; 

        document.getElementById('loginBtn').style.display = 'none';
        document.getElementById('registerBtn').style.display = 'none';
        document.getElementById('logoutBtn').style.display = 'block';

    } else {

        alert('Please fill all the fields.');
    }
});


// Event listener for the Login form submission
const login = document.getElementById('login');

login.addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const user = JSON.parse(localStorage.getItem(email));

    if (user && user.password === password) {

        alert('Login successful! Welcome, ' + user.name);
        login.reset();
        loginForm.style.display = 'none'; 

        document.getElementById('loginBtn').style.display = 'none';
        document.getElementById('registerBtn').style.display = 'none';
        document.getElementById('logoutBtn').style.display = 'block';

    } else {

        alert('Invalid email or password.');
    }
});



// Function to fetch and display fuel prices
async function fetchFuelPrices() {
    
    try {
        const response = await fetch('YOUR_API_URL', {
            headers: {
                'Authorization': 'Bearer YOUR_API_KEY' // Add API Key if required
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        // Assuming the API returns an object with properties for petrol and diesel prices
        document.getElementById('petrol-price').textContent = `Petrol: $${data.petrolPrice}/liter`;
        document.getElementById('diesel-price').textContent = `Diesel: $${data.dieselPrice}/liter`;
        
        // Update last updated time
        const lastUpdated = new Date().toLocaleDateString();
        document.getElementById('last-updated').textContent = `Last updated: ${lastUpdated}`;

    } catch (error) {
        console.error('Error fetching fuel prices:', error);
        document.getElementById('petrol-price').textContent = "Petrol: Data unavailable";
        document.getElementById('diesel-price').textContent = "Diesel: Data unavailable";
    }
}

// Call the function to fetch and display fuel prices
fetchFuelPrices();
