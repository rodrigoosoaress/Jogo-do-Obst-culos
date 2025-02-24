const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Carregar imagens
const fundoImg = new Image();
fundoImg.src = "fundo.png.webp"; // Imagem de fundo

const chaoImg = new Image();
chaoImg.src = "chão.png.webp"; // Imagem do chão

const personagemImg = new Image();
personagemImg.src = "personagem.png.webp"; // Imagem do personagem

const pedraImg = new Image();
pedraImg.src = "pedra.png.webp"; // Imagem da pedra (obstáculo)

const relogioImg = new Image();
relogioImg.src = "relogio.png"; // Ícone do relógio

// Configuração do jogador
let player = { x: 50, y: 220, width: 40, height: 40, dy: 0, gravity: 0.2, jumpPower: -10 };
let isJumping = false;

// Configuração do obstáculo
let obstacle = { x: canvas.width, y: 220, width: 40, height: 40, speed: 2 };

// Variável para contar o tempo
let tempo = 0;

// Atualiza o tempo a cada segundo
setInterval(() => {
    tempo++;
}, 1000);

// Certifica-se de que as imagens carregaram antes de iniciar o jogo
fundoImg.onload = personagemImg.onload = pedraImg.onload = relogioImg.onload = function () {
    update();
};

// Função de atualização do jogo
function update() {
    player.dy += player.gravity;
    player.y += player.dy;

    // Evita que o jogador caia do chão
    if (player.y > 220) {
        player.y = 220;
        player.dy = 0;
        isJumping = false;
    }

    // Movimenta o obstáculo
    obstacle.x -= obstacle.speed;
    if (obstacle.x + obstacle.width < 0) {
        obstacle.x = canvas.width; // Volta o obstáculo para a direita
    }

    // Verifica colisão
    if (
        player.x < obstacle.x + obstacle.width &&
        player.x + player.width > obstacle.x &&
        player.y < obstacle.y + obstacle.height &&
        player.y + player.height > obstacle.y
    ) {
        alert(`Game Over! Você sobreviveu por ${tempo} segundos.`);
        resetGame();
    }

    draw();
    requestAnimationFrame(update);
}

// Função para desenhar na tela
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenha o fundo
    ctx.drawImage(fundoImg, 0, 0, canvas.width, canvas.height);

    // Desenha o chão
    ctx.fillStyle = "green";
    ctx.fillRect(0, 260, canvas.width, 40);

    // Desenha o personagem
    ctx.drawImage(personagemImg, player.x, player.y, player.width, player.height);

    // Desenha o obstáculo (pedra)
    ctx.drawImage(pedraImg, obstacle.x, obstacle.y, obstacle.width, obstacle.height);

    // Desenha o ícone do relógio ao lado do tempo
    ctx.drawImage(relogioImg, 10, 10, 20, 20);
    
    // Desenha o tempo ao lado do relógio
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText(`${tempo}s`, 35, 27);
}

// Função para resetar o jogo após a colisão
function resetGame() {
    obstacle.x = canvas.width; // Resetar posição do obstáculo
    tempo = 0; // Reseta o tempo
}

// Evento de pulo
document.addEventListener("keydown", (event) => {
    if (event.code === "Space" && !isJumping) {
        player.dy = player.jumpPower;
        isJumping = true;  
    }
});
