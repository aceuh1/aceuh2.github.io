document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const background = document.getElementById('background');
  const themeText = document.getElementById('theme-text');
  const audio = document.getElementById('audio');
  const toggleSound = document.getElementById('toggle-sound');
  const sun = document.getElementById('sun'); // Sun emoji element

  let isDay = true;
  const maxStars = 60;
  const stars = [];

  // Function to create and position stars randomly
  function createStars(count) {
    for (let i = 0; i < count; i++) {
      const star = document.createElement('div');
      star.classList.add('star');
      star.textContent = '⭐';
      
      // Set random positions for the stars
      star.style.left = `${Math.random() * 100}vw`;
      star.style.top = `${Math.random() * 100}vh`;
      
      body.appendChild(star);
      stars.push(star); // Add star to the array
    }
  }

  // Mouse move event listener
  body.addEventListener('mousemove', (event) => {
    const percentage = event.clientX / window.innerWidth;
    const dayColor = 'rgb(135, 206, 250)';
    const nightColor = 'rgb(25, 25, 112)';

    body.style.background = `linear-gradient(
      to right, 
      ${dayColor} ${percentage * 100}%, 
      ${nightColor} ${(1 - percentage) * 100}%
    )`;

    // Calculate the number of stars to show based on the mouse position
    const invertedPercentage = 1 - percentage;
    const starCount = Math.floor(invertedPercentage * maxStars);

    // Update star visibility if it's night
    if (!isDay) {
      stars.forEach((star, index) => {
        if (index < starCount) {
          star.style.opacity = 1;
        } else {
          star.style.opacity = 0;
        }
      });
    }
  });

  body.addEventListener('click', () => {
    isDay = !isDay;

    if (isDay) {
      themeText.textContent = "Good Morning! It's a sunny day.";
      background.style.backgroundImage = "url('assets/day.jpg')";
      sun.style.display = "block";
      
      // Make all stars disappear
      stars.forEach((star) => {
        star.style.opacity = 0;
      });
    } else {
      themeText.textContent = "Good Evening! The stars are out.";
      background.style.backgroundImage = "url('assets/night.jpg')";
      sun.style.display = "none";
      
      // Create stars for the night
      createStars(maxStars);
    }

    // Ensure audio plays on user interaction
    if (audio.paused) {
      audio.play();
    }
  });

  toggleSound.addEventListener('click', () => {
    audio.muted = !audio.muted;
    toggleSound.textContent = audio.muted ? "Unmute Sound" : "Mute Sound";
  });

  // Initial star creation
  createStars(maxStars);
});
