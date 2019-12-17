
// Global variables
var allProducts = [];
var totalClicks = 0;
var numOfRounds = 25;
var randoOne, randoTwo, randoThree, prevRandoOne, prevRandoTwo, prevRandoThree;
var productImage = document.getElementsByTagName('img');
var lineHolder = document.getElementById('final-results');

// Product constructor
function GetProducts(name, imageUrl) {
  this.name = name;
  this.imageUrl = imageUrl;
  this.viewed = 0;
  this.score = 0;
  this.selected = false;
  allProducts.push(this);
}

// build allProducts array
new GetProducts('R2D2 Luggage', 'img/bag.jpg');
new GetProducts('Banana Slicer', 'img/banana.jpg');
new GetProducts('Toilet Stand', 'img/bathroom.jpg');
new GetProducts('Open-Toed Rain Boots', 'img/boots.jpg');
new GetProducts('Breakfast Station', 'img/breakfast.jpg');
new GetProducts('Meatball Bubble Gum', 'img/bubblegum.jpg');
new GetProducts('Concave Ass Chair', 'img/chair.jpg');
new GetProducts('Cthulu Figurine', 'img/cthulhu.jpg');
new GetProducts('Dog Muzzle - Duck', 'img/dog-duck.jpg');
new GetProducts('Can o\' Dragon Meat', 'img/dragon.jpg');
new GetProducts('Pen Cap Utensils', 'img/pen.jpg');
new GetProducts('Pet Sweep Dog Shoes', 'img/pet-sweep.jpg');
new GetProducts('Pizza Scissors', 'img/scissors.jpg');
new GetProducts('Man-Eating Shark Sleeping Bag', 'img/shark.jpg');
new GetProducts('Sweeping Baby Onsie', 'img/sweep.png');
new GetProducts('Gutted Tauntaun Sleeping Bag', 'img/tauntaun.jpg');
new GetProducts('Can o\' Unicorn Meat', 'img/unicorn.jpg');
new GetProducts('Tentacle USB Drive 128MB', 'img/usb.gif');
new GetProducts('Self-Watering Water Can', 'img/water-can.jpg');
new GetProducts('Smell This Wine Glass', 'img/wine-glass.jpg');

// Generate random number be 0-19
function genRandomNum() {
  randoOne = Math.floor(Math.random() * 20);
  while (randoOne === prevRandoOne || randoOne === prevRandoTwo || randoOne === prevRandoThree) {
    randoOne = Math.floor(Math.random() * 20);
  }
  prevRandoOne = randoOne;
  randoTwo = Math.floor(Math.random() * 20);
  while (randoTwo === prevRandoOne || randoTwo === prevRandoTwo || randoTwo === prevRandoThree || randoTwo === randoOne) {
    randoTwo = Math.floor(Math.random() * 20);
  }
  prevRandoTwo = randoTwo;
  randoThree = Math.floor(Math.random() * 20);
  while (randoThree === prevRandoOne || randoThree === prevRandoTwo || randoThree === prevRandoThree || randoThree === randoOne || randoThree === randoTwo){
    randoThree = Math.floor(Math.random() * 20);
  }
  prevRandoThree = randoThree;
}

// Set product images 1-3
function displayImages() {
  productImage[1].src = allProducts[randoOne].imageUrl;
  allProducts[randoOne].viewed++;
  productImage[2].src = allProducts[randoTwo].imageUrl;
  allProducts[randoTwo].viewed++;
  productImage[3].src = allProducts[randoThree].imageUrl;
  allProducts[randoThree].viewed++;
}

for(var i = 1; i < productImage.length; i++) {
  productImage[i].addEventListener('click', picked);
}

// Function called when user clicks on image
// Adds to obj selected score
// renders new random images
// does't allow user to select more than 25 images
function picked() {
  if (totalClicks < numOfRounds) {
    totalClicks++;
    if(event.srcElement.id === 'optionOne') {
      allProducts[randoOne].score++;
      allProducts[randoOne].selected = true;
    } else if(event.srcElement.id === 'optionTwo') {
      allProducts[randoTwo].score++;
      allProducts[randoTwo].selected++;
    } else if(event.srcElement.id === 'optionThree') {
      allProducts[randoThree].score++;
      allProducts[randoThree].selected++;
    }
    genRandomNum();
    displayImages();
  } else {
    for(var i = 1; i < productImage.length; i++) {
      productImage[i].removeEventListener('click', picked);
    }
    for(i = 0; i < allProducts.length; i++) {
      allProducts[i].displayResults();
    }
  }
}

GetProducts.prototype.displayResults = function() {
  if(this.selected === true) {
    var newLi = document.createElement('li');
    newLi.textContent = `${this.name} had ${this.score} votes and was shown ${this.viewed} time(s).`;
    lineHolder.appendChild(newLi);
  }
};

genRandomNum();
displayImages();
