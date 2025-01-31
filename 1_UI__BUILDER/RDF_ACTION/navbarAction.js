// Get all the navigation items (list elements)
const lists = document.querySelectorAll('.section .list');

// Get the indicator element
const indicator = document.querySelector('.indicator');

// Function to set the position of the indicator based on the active or clicked tab
function setIndicatorPosition(link) {
    const img = link.querySelector('img'); // Get the image element of the active link
    const rect = img.getBoundingClientRect(); // Get the bounding rect of the image
    
    // Calculate the center position of the image
    const leftPosition = rect.left + (rect.width / 2) - (indicator.offsetWidth / 2);
    indicator.style.transform = `translateX(${leftPosition}px)`; // Center the indicator below the image
}

// Function to set the initial position of the indicator below the 'Home' tab on page load
function setInitialIndicatorPosition() {
    const homeLink = document.querySelector('.section .list'); // Get the first list item ('Home')
    homeLink.classList.add('active'); // Set 'Home' as active initially
    setIndicatorPosition(homeLink); // Set the indicator position below 'Home'
}

// Add a click event listener to each navigation item
lists.forEach((list) => {
    list.addEventListener('click', function() {
        // Remove 'active' class from any previously active list item
        const activeList = document.querySelector('.section .list.active');
        if (activeList) {
            activeList.classList.remove('active');
        }

        // Add 'active' class to the currently clicked list item
        this.classList.add('active');

        // Set the indicator to the new clicked item
        setIndicatorPosition(this);
    });
});

// Call the function to set the initial position when the page loads
window.onload = setInitialIndicatorPosition;
