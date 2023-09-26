// Objeto para armazenar pontos no espaço tridimensional
var points = {
    P0: [-19.19, 0, -0.2],
    P1: [-28.63, 0, 18.67],
    P2: [-7.19, 0, 22.81],
    P3: [-0.08, 0, 3.57],

    P4: [7.03, -5, -15.66],

    P5: [22.8, -5, 71.04],
    P6: [25.87, -5, -9.4],

    P7: [28.93, -5, -89.85],

    P8: [-54.34, -5, -20.49],
    P9: [-21.79, -7, -39.6],

    P10: [10.77, -5, -58.71],

    P11: [0.32, -5, -19.91],
    P12: [-19.19, 0, -0.2],
};


// Função para calcular um ponto ao longo da curva de Bezier cúbica
function interpolateCoordinate(coord, targetCoord, t) {
    // Interpola uma única coordenada usando a fórmula: coord + t * (targetCoord - coord)
    return coord + t * (targetCoord - coord);
}

function calculatePoint(points, t) {
    const segmentIndex = Math.floor(t * 4); // Determina em qual segmento t se encontra
    const segmentT = t * 4 - segmentIndex; // Redimensiona t dentro do segmento
    const startIndex = segmentIndex * 3; // Índice do ponto de início do segmento atual

    // Obtém os pontos de controle para o segmento
    const X = points[`P${startIndex}`];
    const Y = points[`P${startIndex + 1}`];
    const Z = points[`P${startIndex + 2}`];
    const W = points[`P${startIndex + 3}`];

    // Interpola as coordenadas para cada ponto no segmento
    const A = X.map((coord, index) =>
        interpolateCoordinate(coord, Y[index], segmentT)
    );
    const B = Y.map((coord, index) =>
        interpolateCoordinate(coord, Z[index], segmentT)
    );
    const C = Z.map((coord, index) =>
        interpolateCoordinate(coord, W[index], segmentT)
    );

    const D = A.map((coord, index) =>
        interpolateCoordinate(coord, B[index], segmentT)
    );
    const BC = B.map((coord, index) =>
        interpolateCoordinate(coord, C[index], segmentT)
    );

    const ABC = D.map((coord, index) =>
        interpolateCoordinate(coord, BC[index], segmentT)
    );

    // Interpola entre D e BC para calcular o ponto final
    return ABC.map((element) => 10 * element);
}