function signUp() {
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const mobile = document.getElementById('mobile').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Reset previous error messages
    document.getElementById('emailError').textContent = '';
    document.getElementById('mobileError').textContent = '';
    document.getElementById('passwordError').textContent = '';
    document.getElementById('confirmPasswordError').textContent = '';

    let isValid = true;

    // Validate email
    if (email.trim() === '') {
        document.getElementById('emailError').textContent = 'Email address is required.';
        isValid = false;
    } else if (!validateEmail(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address.';
        isValid = false;
    }

    // Validate mobile number
    if (mobile.trim() === '') {
        document.getElementById('mobileError').textContent = 'Mobile number is required.';
        isValid = false;
    } else if (!validateMobile(mobile)) {
        document.getElementById('mobileError').textContent = 'Please enter a valid mobile number (10-digits).';
        isValid = false;
    }

    // Validate password
    if (password === '') {
        document.getElementById('passwordError').textContent = 'Password is required.';
        isValid = false;
    } else if (!validatePassword(password)) {
        document.getElementById('passwordError').textContent = 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.';
        isValid = false;
    }

    // Validate confirm password
    if (confirmPassword === '') {
        document.getElementById('confirmPasswordError').textContent = 'Please confirm your password.';
        isValid = false;
    } else if (password !== confirmPassword) {
        document.getElementById('confirmPasswordError').textContent = 'Passwords do not match.';
        isValid = false;
    }

    // If all fields are valid, proceed with sign up
    if (isValid) {
        const userData = { fullName, email, mobile, password };

        fetch('RDF_BW/signUpDetailsBW.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            if (data.message === 'User registered successfully') {
                window.location.href = 'RDFView.php?ui=loginUI'; // Redirect to the home page
            }
        })
        .catch(error => console.error('Error:', error));
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const togglePasswordIcons = document.querySelectorAll('.toggle-password');
    togglePasswordIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const passwordField = this.previousElementSibling;
            if (passwordField.type === 'password') {
                passwordField.type = 'text';
                this.textContent = '👁️‍🗨️';
            } else {
                passwordField.type = 'password';
                this.textContent = '👁️';
            }
        });
    });
});

// Validate email format function
function validateEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

// Add an event listener to the input field to prevent removal of the +91 prefix
document.getElementById('mobile').addEventListener('input', function (e) {
    let mobileInput = e.target;
    
    if (!mobileInput.value.startsWith('+91')) {
        mobileInput.value = '+91';
    }
    
    // Prevent the user from entering more than 10 digits after +91
    if (mobileInput.value.length > 13) {
        mobileInput.value = mobileInput.value.slice(0, 13);
    }
});

// Validation function
function validateMobile(mobile) {
    const pattern = /^\+91\d{10}$/;
    return pattern.test(mobile);
}

document.getElementById('submitForm').addEventListener('click', function() {
    const mobile = document.getElementById('mobile').value;
    document.getElementById('mobileError').textContent = '';

    if (mobile.trim() === '' || mobile === '+91') {
        document.getElementById('mobileError').textContent = 'Mobile number is required.';
        isValid = false;
    } else if (!validateMobile(mobile)) {
        document.getElementById('mobileError').textContent = 'Please enter a valid mobile number (10 digits after +91).';
        isValid = false;
    } else {
        isValid = true;
    }

    // Perform further actions if needed
});

// Validate password format function
function validatePassword(password) {
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;
    return pattern.test(password);
}
