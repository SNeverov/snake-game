// Определяем параметры игры
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var tileSize = 10;
var tileCount = 40;
var snake = [{x: 10, y: 10}];
var apple = {x: 20, y: 20};
var score = 0;
var direction = "right";

// Функция для отображения игрового поля
function draw() {
  // Рисуем фон
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Рисуем змею
  ctx.fillStyle = "#00f";
  for (var i = 0; i < snake.length; i++) {
    var tile = snake[i];
    ctx.fillRect(tile.x * tileSize, tile.y * tileSize, tileSize, tileSize);
  }
  
  // Рисуем яблоко
  ctx.fillStyle = "#f00";
  ctx.fillRect(apple.x * tileSize, apple.y * tileSize, tileSize, tileSize);
  
  // Отображаем счет
  ctx.fillStyle = "#000";
  ctx.fillText("Счет: " + score, 10, canvas.height - 10);
}

// Функция для обработки клавиатурных событий
function onKeyDown(event) {
  if (event.keyCode == 37 && direction != "right") { // left arrow
    direction = "left";
  } else if (event.keyCode == 38 && direction != "down") { // up arrow
    direction = "up";
  } else if (event.keyCode == 39 && direction != "left") { // right arrow
    direction = "right";
  } else if (event.keyCode == 40 && direction != "up") { // down arrow
    direction = "down";
  }
}

// Функция для обновления игрового состояния
function update() {
  // Двигаем змею
  var head = snake[0];
  var newHead = {x: head.x, y: head.y};
  if (direction == "left") {
    newHead.x--;
  } else if (direction == "up") {
    newHead.y--;
  } else if (direction == "right") {
    newHead.x++;
  } else if (direction == "down") {
    newHead.y++;
  }
  snake.unshift(newHead);
  
  // Проверяем, столкнулась ли змея со стеной или собственным хвостом
  if (newHead.x < 0 || newHead.x >= tileCount || newHead.y < 0 || newHead.y >= tileCount) {
    clearInterval(gameLoop);
    alert("Вы проиграли!");
  }
  for (var i = 1; i < snake.length; i++) {
    if (newHead.x == snake[i].x && newHead.y == snake[i].y) {
        clearInterval(gameLoop);
        alert("Вы проиграли!");
        }
        }
        
        // Проверяем, съела ли змея яблоко
        if (newHead.x == apple.x && newHead.y == apple.y) {
        score++;
        // Создаем новое яблоко
        apple.x = Math.floor(Math.random() * tileCount);
        apple.y = Math.floor(Math.random() * tileCount);
        } else {
        // Убираем последний сегмент хвоста
        snake.pop();
        }
        
        // Обновляем отображение
        draw();
        }
        
        // Запускаем игру
        var gameLoop = setInterval(update, 100);
        
        // Обрабатываем клавиатурные события
        document.addEventListener("keydown", onKeyDown);
