const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const box = 15; 

let speed = 200;
let game = setInterval(draw, speed);

let snake = [{ x: 10 * box, y: 10 * box }]; 
let direction = 'RIGHT';
let food = {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box
};
let score = 0;

document.addEventListener('keydown', directionControl);

function directionControl(event) {
    if (event.keyCode === 37 && direction !== 'RIGHT') {
        direction = 'LEFT';
    } else if (event.keyCode === 38 && direction !== 'DOWN') {
        direction = 'UP';
    } else if (event.keyCode === 39 && direction !== 'LEFT') {
        direction = 'RIGHT';
    } else if (event.keyCode === 40 && direction !== 'UP') {
        direction = 'DOWN';
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = 'green';
    ctx.fillRect(food.x, food.y, box, box);
    
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? 'lightblue' : 'lightgreen'; 
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = 'black';
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction === 'LEFT') snakeX -= box;
    if (direction === 'UP') snakeY -= box;
    if (direction === 'RIGHT') snakeX += box;
    if (direction === 'DOWN') snakeY += box;

    if (snakeX === food.x && snakeY === food.y) {
        food = {
            x: Math.floor(Math.random() * 40) * box,
            y: Math.floor(Math.random() * 40) * box,
        };
        score++;
        adjustSpeed();
    } else {
        snake.pop(); 
    }

    const newHead = { x: snakeX, y: snakeY };

    if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake)) {
        clearInterval(game);
        alert('Нуб! Повторить попытку');
    }

    snake.unshift(newHead); 
    drawScore();
}

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
            return true; 
        }
    }
    return false;
}

function drawScore() {
    ctx.fillStyle = 'black';
    ctx.font = '20px Oswald';
    ctx.fillText('Очки: ' + score, box, box);
}

function adjustSpeed() {
    if (score % 10 === 0 && speed > 50) {
        clearInterval(game);
        speed -= 40; 
        game = setInterval(draw, speed); 
    }
}