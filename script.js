const symbols = [
"Agility.png", "Agility.png", "Boat.png", "Boat.png",
"Citizenship.png", "Citizenship.png", "Hack.png", "Hack.png",
"Nerd-Rage.png", "Nerd-Rage.png", "Nuka-Cola.png", "Nuka-Cola.png",
"Robotics.png", "Robotics.png", "Shock.png", "Shock.png"
];

let opened = [];
let match = 0;
let moves = 0;

const deck = document.querySelector('.deck');
const scorePanel = document.getElementById('score-panel');
const moveNum = scorePanel.querySelector('.moves');
const ratingStars = scorePanel.querySelectorAll('i');
const restart = scorePanel.querySelector('.restart');

const delay = 800;
const gameCardsQTY = symbols.length / 2;
const rank3stars = gameCardsQTY + 2;
const rank2stars = gameCardsQTY + 6;
const rank1stars = gameCardsQTY + 10;

// Shuffle function
const shuffle = (array) => {
  let currentIndex = array.length;

  while (currentIndex !== 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
};

// Initialize Game
const initGame = () => {
  const cards = shuffle([...symbols]);
  deck.innerHTML = '';
  match = 0;
  moves = 0;
  opened = [];
  moveNum.textContent = moves;
  ratingStars.forEach(star => {
    star.classList.remove('fa-star-o');
    star.classList.add('fa-star');
  });

  cards.forEach(symbol => {
    const li = document.createElement('li');
    li.classList.add('card');
    const addImage = document.createElement("img");
    li.appendChild(addImage);
    addImage.setAttribute("src", "https://github.com/FoxyStoat/memory-game/blob/master/assets/img/" + symbol + "?raw=true");
	// Add an alt tag to the image
	addImage.setAttribute("alt", "image of vault boy from fallout");
    addImage.classList.add('modal-img');
    deck.appendChild(li);
  });
};

// Set rating
const setRating = (moves) => {
  let rating = 3;

  if (moves > rank3stars && moves <= rank2stars) {
    ratingStars[2].classList.remove('fa-star');
    ratingStars[2].classList.add('fa-star-o');
    rating = 2;
  } else if (moves > rank2stars && moves <= rank1stars) {
    ratingStars[1].classList.remove('fa-star');
    ratingStars[1].classList.add('fa-star-o');
    rating = 1;
  } else if (moves > rank1stars) {
    ratingStars[0].classList.remove('fa-star');
    ratingStars[0].classList.add('fa-star-o');
    rating = 0;
  }

  return { score: rating };
};

// End game alert
const endGame = (moves, score) => {
  Swal.fire({
    heightAuto: false,
    title: 'Congratulations! You Won!',
    text: `With ${moves} Moves and ${score} Stars.\nBoom Shaka Lak!`,
    icon: 'success',
    confirmButtonText: 'Play again!',
    confirmButtonColor: '#9BCB3C',
    allowOutsideClick: false,
    allowEscapeKey: false,
    scrollbarPadding: false,
    customClass: {
      popup: 'my-fullscreen-alert'
    }
  }).then(result => {
    if (result.isConfirmed) {
      initGame();
    }
  });
};

// Restart game
restart.addEventListener('click', () => {
  Swal.fire({
    heightAuto: false,
    allowEscapeKey: false,
    allowOutsideClick: false,
    title: 'Are you sure?',
    text: 'Your progress will be Lost!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#9BCB3C',
    cancelButtonColor: '#EE0E51',
    confirmButtonText: 'Yes, Restart Game!',
    scrollbarPadding: false,
  }).then(result => {
    if (result.isConfirmed) {
      initGame();
    }
  });
});

// Card click logic
document.querySelector('.deck').addEventListener('click', (e) => {
  const target = e.target.closest('.card');

  if (!target || target.classList.contains('match') || target.classList.contains('open')) return;
  if (document.querySelectorAll('.show').length > 1) return;

  const cardHTML = target.innerHTML;
  target.classList.add('open', 'show');
  opened.push(cardHTML);

  // Compare with previously opened card
  if (opened.length > 1) {
    const openCards = document.querySelectorAll('.open');

    if (cardHTML === opened[0]) {
      openCards.forEach(card => {
        card.classList.add('match', 'animate__animated', 'animate__infinite', 'animate__rubberBand');
      });
      setTimeout(() => {
        openCards.forEach(card => {
          card.classList.remove('open', 'show', 'animate__animated', 'animate__infinite', 'animate__rubberBand');
        });
      }, delay);
      match++;
    } else {
      openCards.forEach(card => {
        card.classList.add('notmatch', 'animate__animated', 'animate__infinite', 'animate__wobble');
      });
      setTimeout(() => {
        openCards.forEach(card => {
          card.classList.remove('animate__animated', 'animate__infinite', 'animate__wobble');
        });
      }, delay / 1.5);
      setTimeout(() => {
        openCards.forEach(card => {
          card.classList.remove('open', 'show', 'notmatch', 'animate__animated', 'animate__infinite', 'animate__wobble');
        });
      }, delay);
    }

    opened = [];
    moves++;
    setRating(moves);
    document.querySelector('.moves').textContent = moves;
  }

  // End Game
  if (match === gameCardsQTY) {
    const { score } = setRating(moves);
    setTimeout(() => {
      endGame(moves, score);
    }, 500);
  }
});

initGame();

//particlejs

particlesJS("particles-js", {"particles":
    {"number":{"value":80,
    "density":{"enable":true,"value_area":800}},
    "color":{"value":"#ffffff"},
    "shape":{"type":"circle","stroke":{"width":0,"color":"#000000"},
    "polygon":{"nb_sides":5},"image":{"src":"img/github.svg","width":100,"height":100}},
    "opacity":{"value":0.5,"random":false,"anim":{"enable":false,"speed":1,"opacity_min":0.1,"sync":false}},
    "size":{"value":3,"random":true,"anim":{"enable":false,"speed":40,"size_min":0.1,"sync":false}},
    "line_linked":{"enable":true,"distance":150,"color":"#ffffff","opacity":0.4,"width":1},"move":{"enable":true,"speed":6,"direction":"none","random":false,"straight":false,"out_mode":"out","bounce":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":true,"mode":"repulse"},"onclick":{"enable":true,"mode":"push"},"resize":true},"modes":{"grab":{"distance":400,"line_linked":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":8,"speed":3},"repulse":{"distance":200,"duration":0.4},"push":{"particles_nb":4},"remove":{"particles_nb":2}}},"retina_detect":true});var count_particles, stats, update; stats = new Stats; stats.setMode(0); stats.domElement.style.position = 'absolute'; stats.domElement.style.left = '0px'; stats.domElement.style.top = '0px'; document.body.appendChild(stats.domElement); count_particles = document.querySelector('.js-count-particles'); update = function() { stats.begin(); stats.end(); if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) { count_particles.innerText = window.pJSDom[0].pJS.particles.array.length; } requestAnimationFrame(update); }; 
    requestAnimationFrame(update);;