 const body = document.body;
    const background = document.getElementById('background');
    const themeText = document.getElementById('theme-text');
    const audio = document.getElementById('audio');
    const toggleSound = document.getElementById('toggle-sound');
    const sun = document.getElementById('sun'); // Sun emoji element

    let isDay = true;
    const maxStars = 60; 
    const stars = []; 

    // Function create & position stars random
    function createStars(count) {
      for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.textContent = '⭐';
        
        // Set random positions for star
        star.style.left = `${Math.random() * 100}vw`; //horz
        star.style.top = `${Math.random() * 100}vh`; // vert
        
        body.appendChild(star);
        stars.push(star); // Add to array
      }
    }

    // MM event listener
    body.addEventListener('mousemove', (event) => {
      const percentage = event.clientX / window.innerWidth;
      const dayColor = 'rgb(135, 206, 250)'; 
      const nightColor = 'rgb(25, 25, 112)';

      body.style.background = `linear-gradient(
        to right, 
        ${dayColor} ${percentage * 100}%, 
        ${nightColor} ${(1 - percentage) * 100}%
      )`;

      // Calculate num of stars to show from mouse position
      const invertedPercentage = 1 - percentage; 
      const starCount = Math.floor(invertedPercentage * maxStars); // stars based on the inverted %
      
      // Update star visibility when night
      if (!isDay) {
        stars.forEach((star, index) => {
          if (index < starCount) {
            star.style.opacity = 1; // Show 
          } else {
            star.style.opacity = 0; // Hide 
          }
        });
      }
    });

    body.addEventListener('click', () => {
      isDay = !isDay;

      if (isDay) {
        themeText.textContent = "Good Morning! It's a sunny day.";
        background.style.backgroundImage = "url('assets/day.jpg')";
        sun.style.display = "block"; // Show sun
        // Make stars disappear
        stars.forEach((star) => {
          star.style.opacity = 0; // Hide stars
        });
      } else {
        themeText.textContent = "Good Evening! The stars are out.";
        background.style.backgroundImage = "url('assets/night.jpg')";
        sun.style.display = "none"; // Hide sun 
        // Create stars for night
        createStars(maxStars); // make stars the night
      }
    });

    toggleSound.addEventListener('click', () => {
      audio.muted = !audio.muted; // Toggle mute
      toggleSound.textContent = audio.muted ? "Unmute Sound" : "Mute Sound"; // Update button text
    });

    // star creation
    createStars(maxStars); // Create stars
