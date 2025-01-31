const style = document.createElement('style');
style.innerHTML = `
body {
    background: #10131a;
}`;
document.head.appendChild(style); // Don't forget to append the style element to the document head
document.addEventListener('DOMContentLoaded', function() {
    // Select the search input field
    const searchInput = document.querySelector('input[placeholder="Search your UI Page"]');

    // Add an event listener for the Enter key
    searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            handleSearch();
        }
    });

    // Add a function to handle the search logic
    function handleSearch() {
        const query = searchInput.value.trim().toLowerCase();  // Get the input value and convert it to lowercase

        if (query === 'login') {
            // Redirect to the login page
            window.location.href = 'RDFView.php?ui=allloginUI';
        } else if (query.includes('signup') || query.includes('sign-up page') || query.includes('signup') || query.includes('sign up') || query.includes('sign-up') || query.includes('sign-uppage')) {
            // Redirect to the signup page
            window.location.href = 'RDFView.php?ui=allsignupUI';
        }  else if (query.includes('get started') || query.includes('getstarted') || query.includes('get started page') || query.includes('getstarted page')) {
            // Redirect to the get started page
            window.location.href = 'RDFView.php?ui=allgetstartedUI';
        } else {
            // Optionally, you can show an alert or handle other queries
            alert('No matching UI page found. Try searching for "login", "signup", or "get started".');
        }
    }
});



const confetti = {
	maxCount: 150,
	speed: 2,
	frameInterval: 15,
	alpha: 1.0,
	gradient: false,
	start: null,
	stop: null,
	isRunning: null
};

(function() {
	confetti.start = startConfetti;
	confetti.stop = stopConfetti;
	confetti.isRunning = isConfettiRunning;

	let colors = ["rgba(30,144,255,", "rgba(107,142,35,", "rgba(255,215,0,", "rgba(255,192,203,", "rgba(106,90,205,", "rgba(173,216,230,", "rgba(238,130,238,", "rgba(152,251,152,", "rgba(70,130,180,", "rgba(244,164,96,", "rgba(210,105,30,", "rgba(220,20,60,"];
	let streamingConfetti = false;
	let animationTimer = null;
	let particles = [];
	let context = null;

	function resetParticle(particle, width, height) {
		particle.color = colors[(Math.random() * colors.length) | 0] + (confetti.alpha + ")");
		particle.x = Math.random() * width;
		particle.y = Math.random() * height - height;
		particle.diameter = Math.random() * 10 + 5;
		particle.tilt = Math.random() * 10 - 10;
		particle.tiltAngleIncrement = Math.random() * 0.07 + 0.05;
		particle.tiltAngle = Math.random() * Math.PI;
		return particle;
	}

	function runAnimation() {
		if (particles.length === 0) {
			context.clearRect(0, 0, window.innerWidth, window.innerHeight);
			animationTimer = null;
		} else {
			context.clearRect(0, 0, window.innerWidth, window.innerHeight);
			updateParticles();
			drawParticles(context);
			animationTimer = requestAnimationFrame(runAnimation);
		}
	}

	function startConfetti() {
		let width = window.innerWidth;
		let height = window.innerHeight;
		let canvas = document.getElementById("confetti-canvas");

		if (!canvas) {
			canvas = document.createElement("canvas");
			canvas.setAttribute("id", "confetti-canvas");
			document.body.prepend(canvas);
			canvas.width = width;
			canvas.height = height;

			// Inline styles for the canvas element
			canvas.style.position = "fixed";
			canvas.style.top = "0";
			canvas.style.left = "0";
			canvas.style.zIndex = "999999";
			canvas.style.pointerEvents = "none";
			canvas.style.display = "block";

			window.addEventListener("resize", function() {
				canvas.width = window.innerWidth;
				canvas.height = window.innerHeight;
			}, true);
			context = canvas.getContext("2d");
		} else if (context === null) {
			context = canvas.getContext("2d");
		}

		while (particles.length < confetti.maxCount) {
			particles.push(resetParticle({}, width, height));
		}
		streamingConfetti = true;
		runAnimation();
	}

	function stopConfetti() {
		streamingConfetti = false;
	}

	function isConfettiRunning() {
		return streamingConfetti;
	}

	function updateParticles() {
		let width = window.innerWidth;
		let height = window.innerHeight;

		for (let i = 0; i < particles.length; i++) {
			let particle = particles[i];
			if (!streamingConfetti && particle.y < -15) {
				particle.y = height + 100;
			} else {
				particle.tiltAngle += particle.tiltAngleIncrement;
				particle.x += Math.sin(particle.tiltAngle) * 2;
				particle.y += (Math.cos(particle.tiltAngle) + particle.diameter + confetti.speed) * 0.5;
				particle.tilt = Math.sin(particle.tiltAngle) * 15;
			}
			if (particle.x > width || particle.x < -20 || particle.y > height) {
				if (streamingConfetti && particles.length <= confetti.maxCount) {
					resetParticle(particle, width, height);
				} else {
					particles.splice(i, 1);
					i--;
				}
			}
		}
	}

	function drawParticles(context) {
		for (let i = 0; i < particles.length; i++) {
			let particle = particles[i];
			context.beginPath();
			context.lineWidth = particle.diameter;
			context.strokeStyle = particle.color;
			context.moveTo(particle.x, particle.y);
			context.lineTo(particle.x + particle.tilt, particle.y + particle.tilt);
			context.stroke();
		}
	}
})();

// Show confetti once per day
(function() {
	const maxConfettiShows = 1; // Max number of times confetti can be shown per day
	const storageKey = 'confetti_shows';
	const today = new Date().toLocaleDateString(); // Get the current date in local format
	let confettiData = JSON.parse(localStorage.getItem(storageKey));

	if (!confettiData || confettiData.date !== today) {
		// If no data for today, reset it
		confettiData = { date: today, count: 0 };
		localStorage.setItem(storageKey, JSON.stringify(confettiData));
	}

	// Show confetti only if count is less than maxConfettiShows
	if (confettiData.count < maxConfettiShows) {
		confetti.start();  // Start the confetti animation
		setTimeout(confetti.stop, 5000); // Stop after 5 seconds

		// Update the count in localStorage
		confettiData.count++;
		localStorage.setItem(storageKey, JSON.stringify(confettiData));
	}

})();