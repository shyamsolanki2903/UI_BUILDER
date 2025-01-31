function reset() {
    const email = document.getElementById('email').value;
    const emailError = document.getElementById('emailError');
    const generalError = document.getElementById('generalError');
    const loader = document.getElementById('loader');
    
    emailError.style.display = 'none';
    generalError.style.display = 'none';
    loader.style.display = 'block';
    
    if (email === '') {
        emailError.textContent = "Please enter an email address.";
        emailError.style.display = 'block';
        loader.style.display = 'none';
        return;
    }

    const timer = setTimeout(() => {
        loader.style.display = 'none';
    }, 60000); // Hide loader after 1 minute

    fetch('RDF_BW/forgotPasswordBW.php?email=' + encodeURIComponent(email))
        .then(response => response.json())
        .then(data => {
            loader.style.display = 'none';
            clearTimeout(timer);
            if (data.status === 'error') {
                if (data.field === 'email') {
                    emailError.textContent = data.message;
                    emailError.style.display = 'block';
                } else {
                    generalError.textContent = data.message;
                    generalError.style.display = 'block';
                }
            } else {
                alert(data.message); // Show the success message as a pop-up
            }
        })
        .catch(error => {
            loader.style.display = 'none';
            clearTimeout(timer);
            generalError.textContent = "An error occurred. Please try again.";
            generalError.style.display = 'block';
            console.error('Fetch Error:', error);
        });
}
