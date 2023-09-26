function degToRad(d) {
    return d * Math.PI / 180;
}

// Obtém o elemento HTML do canvas
var canvas = document.getElementById("canvas")

// Inicializa os ângulos de rotação da câmera
var cameraRotation = [0, 0]; // Initialize camera rotation angles
var isMouseOverCanvas = false;
var previousMouseX = 0;
var previousMouseY = 0;

// Obtém o retângulo que descreve a posição do canvas na janela
var canvasRect = canvas.getBoundingClientRect(); // Retornar o retângulo que descreve a posição do canvas na janela

// Define um evento de "mouseover" para quando o mouse entra no canvas
canvas.addEventListener("mouseover", function (event) {
    isMouseOverCanvas = true;
    previousMouseX = event.clientX;
    previousMouseY = event.clientY;
});

// Define um evento de "mousemove" para rastrear o movimento do mouse
canvas.addEventListener("mousemove", function (event) {
    if (isMouseOverCanvas) {
        var x = event.clientX - canvasRect.left; // Coordenada X relativa ao canvas
        var y = event.clientY - canvasRect.top;  // Coordenada Y relativa ao canvas

        // Verifique se o cursor está dentro dos limites do canvas
        if (x >= 0 && x < canvas.width && y >= 0 && y < canvas.height) {
            var deltaX = x - previousMouseX;
            var deltaY = y - previousMouseY;

            previousMouseX = x;
            previousMouseY = y;

            // Atualiza a rotação da câmera com base no movimento do mouse
            cameraRotation[0] -= degToRad(deltaY * 0.5); // Pitch
            cameraRotation[1] -= degToRad(deltaX * 0.5); // Yaw

            // Limita o pitch para evitar que a câmera gire demais
            cameraRotation[0] = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, cameraRotation[0]));

            // Calcula a nova posição do alvo com base na rotação da câmera e em uma distância fixa
            var distance = 100000;
            target[0] = cameraPosition[0] + Math.sin(cameraRotation[1]) * Math.cos(cameraRotation[0]) * distance;
            target[1] = cameraPosition[1] + Math.sin(cameraRotation[0]) * distance;
            target[2] = cameraPosition[2] + Math.cos(cameraRotation[1]) * Math.cos(cameraRotation[0]) * distance;
        }
    }
});

// Define um evento de "mouseout" para quando o mouse sai do canvas
canvas.addEventListener("mouseout", function () {
    isMouseOverCanvas = false;
});

canvas.addEventListener("mouseleave", function () {
    isMouseDragging = false;
});

// Configuração da câmera e da cena
var fov = degToRad(60);
var cameraPosition = [-50.37529, 100, 97.62443]; // Posição inicial da câmera
var target = [0, 0, 0]; // Posição do alvo da câmera
var up = [0, 1, 0]; // Vetor "up" da câmera
var camera = m4.lookAt(cameraPosition, target, up); // Matriz de visualização da câmera
var view = m4.inverse(camera); // Matriz de visão inversa da câmera
var animationDuration = 50000; // Duração da animação em milissegundos
var cameraSpeed = 0.00005; // Velocidade com que a câmera se move ao longo do eixo Z

// Registra o horário de início da animação
var startTime = Date.now();

// Calcula a posição da câmera com base no tempo e nos pontos de controle
var cameraPosition = calculatePoint(points, 0);
var t = 0

// Função para animar a câmera
function animateCamera() {
    var currentTime = Date.now();
    t = (currentTime % animationDuration) / animationDuration;

    // Calcula a posição da câmera com base no tempo atual
    cameraPosition = calculatePoint(points, t);

    // Atualiza a matriz de visualização da câmera
    camera = m4.lookAt(cameraPosition, target, up);
    view = m4.inverse(camera);

    // Solicita a próxima animação de quadro
    requestAnimationFrame(animateCamera);
}

// Inicia a animação da câmera
animateCamera();