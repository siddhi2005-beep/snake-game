// Variables for the game state
let snake;
let food;
let score;
let direction;
let gameInterval;
let isGameOver = false;

// Function to initialize the game
function initGame() {
    snake = [{ x: 50, y: 50 }];
    food = generateFood();
    score = 0;
    direction = 'RIGHT';
    isGameOver = false;

    // Hide the "Play Again" button
    document.getElementById('play-again-btn').style.display = 'none';

    // Reset the score
    document.getElementById('user-score').innerText = score;

    // Start the game loop
    gameInterval = setInterval(gameLoop, 100);
}

// Game loop that runs at a set interval
function gameLoop() {
    if (isGameOver) {
        clearInterval(gameInterval);
        document.getElementById('play-again-btn').style.display = 'block';
        return;
    }

    moveSnake();
    checkCollisions();
    checkFoodCollision();
    drawGame();
}

// Move the snake based on the current direction
function moveSnake() {
    const head = { ...snake[0] };

    if (direction === 'UP') head.y -= 20;
    if (direction === 'DOWN') head.y += 20;
    if (direction === 'LEFT') head.x -= 20;
    if (direction === 'RIGHT') head.x += 20;

    snake.unshift(head);
    snake.pop();
}

// Check if the snake collides with walls or itself
function checkCollisions() {
    const head = snake[0];

    // Check wall collisions
    if (head.x < 0 || head.x >= 400 || head.y < 0 || head.y >= 400) {
        isGameOver = true;
    }

    // Check self collisions
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            isGameOver = true;
        }
    }
}

// Check if the snake eats the food
function checkFoodCollision() {
    const head = snake[0];

    if (head.x === food.x && head.y === food.y) {
        score++;
        snake.push({ x: food.x, y: food.y });
        food = generateFood();
        document.getElementById('user-score').innerText = score;
    }
}

// Generate random food position
function generateFood() {
    const x = Math.floor(Math.random() * 20) * 20;
    const y = Math.floor(Math.random() * 20) * 20;
    return { x, y };
}

// Draw the game elements (snake and food)
function drawGame() {
    const box = document.querySelector('.box');
    box.innerHTML = '';

    // Draw snake
    snake.forEach(segment => {
        const snakeElement = document.createElement('div');
        snakeElement.classList.add('snake');
        snakeElement.style.left = `${segment.x}px`;
        snakeElement.style.top = `${segment.y}px`;
        box.appendChild(snakeElement);
    });

    // Draw food
    const foodElement = document.createElement('div');
    foodElement.classList.add('food');
    foodElement.style.left = `${food.x}px`;
    foodElement.style.top = `${food.y}px`;
    box.appendChild(foodElement);
}

// Change the direction based on the button clicked
function changeDirection(newDirection) {
    if (newDirection === 'up' && direction !== 'DOWN') direction = 'UP';
    if (newDirection === 'down' && direction !== 'UP') direction = 'DOWN';
    if (newDirection === 'left' && direction !== 'RIGHT') direction = 'LEFT';
    if (newDirection === 'right' && direction !== 'LEFT') direction = 'RIGHT';
}

// Restart the game when the "Play Again" button is clicked
function restartGame() {
    initGame();
}

// Initialize the game when the page loads
initGame();
