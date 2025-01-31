function resetPassword() {
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const email = document.getElementById('email').value;

    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');

    emailError.textContent = '';
    passwordError.textContent = '';
    confirmPasswordError.textContent = '';

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

    if (!emailPattern.test(email)) {
        emailError.textContent = 'Invalid email format.';
        return;
    }

    if (!passwordPattern.test(newPassword)) {
        passwordError.textContent = 'Password must be at least 8 characters long, include at least one special character and one number.';
        return;
    }

    if (newPassword !== confirmPassword) {
        confirmPasswordError.textContent = 'Passwords do not match!';
        return;
    }

    fetch('RDF_BW/resetPasswordBW.php?newPassword=' + encodeURIComponent(newPassword) + '&email=' + encodeURIComponent(email))
        .then(response => response.text())
        .then(data => {
            alert(data);
            window.location.href = 'RDFView.php?ui=loginUI'; // Redirect to the login page
        })
        .catch(error => console.error('Error:', error));
}

function togglePasswordVisibility(inputId) {
    const passwordInput = document.getElementById(inputId);
    const toggleBtn = document.getElementById('toggle' + inputId.charAt(0).toUpperCase() + inputId.slice(1));

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.textContent = '👁️';
    } else {
        passwordInput.type = 'password';
        toggleBtn.textContent = '🔒';
    }
}
