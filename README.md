# Trabalho 2 de Computação Gráfica

Heightmap com movimento de câmera e disparo de esferas.

## Tecnologias Utilizadas

- HTML;
- JavaScript.

## Arquivos e Pastas

- `camera.js`: Contém as configurações da câmera.
- `control_points.js`: Contém os pontos de controle e a curva que a câmera seguirá usando uma curva de Bezier.
- `index.html`: O arquivo HTML que vincula todos os outros arquivos e configura a visualização.
- `obj.js`: Contém os modelos 3D importados.
- `skybox.js`: Responsável pela renderização do skybox e da esfera.
- `terrain.js`: Importa e renderiza o terreno com base no heightmap.

### Pastas

- `skybox`: Contém os arquivos necessários para importar e renderizar o skybox.
- `terrain`: Contém os arquivos necessários para importar e renderizar o terreno.
- `ufo`: Contém os arquivos necessários para importar e renderizar o objeto UFO.

## Como Executar o Projeto

Siga estas etapas para executar o projeto:

1. Clone ou baixe este repositório para o seu computador.
2. Abra o arquivo index.html em um navegador da web compatível com WebGL2.
3. No Visual Studio Code (VSC), certifique-se de ter o Live Server instalado e use o comando Alt + L Alt + O para abrir o arquivo em um servidor local.

Ou veja pelo navegador seguindo esse [link](https://regretcode.github.io/CG-2/).

### Como Interagir com a Cena

A interação com a cena é simples e envolve os seguintes passos:

- Passe o mouse sobre o canvas da cena.
- Utilize o botão esquerdo do mouse para interagir com a visualização.
- Você pode mover a câmera ou realizar outras ações específicas de acordo com a lógica de interação implementada no projeto. Certifique-se de explorar e experimentar para obter a melhor experiência visual.

## Créditos

Este trabalho foi criado com base nos códigos: 

- [skybox](https://webgl2fundamentals.org/webgl/lessons/webgl-skybox.html);
- [terrain](https://webgl2fundamentals.org/webgl/lessons/webgl-qna-drawing-a-heightmap.html);
- [obj](https://webgl2fundamentals.org/webgl/lessons/webgl-load-obj-w-mtl.html);
- [sphere](https://webgl2fundamentals.org/webgl/lessons/webgl-drawing-multiple-things.html).

Outros links:

- [Link](https://www.turbosquid.com/3d-models/u-f-o-max-free/167887) para o objeto que foi utilizado;
- [Link](https://sbcode.net/topoearth/moon-texture/) para textura utilizada no heightmap;
- [Link](https://sbcode.net/topoearth/moon-heightmap/) para imagem utilizada como heightmap.

## Licença

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo [LICENSE](https://github.com/git/git-scm.com/blob/main/MIT-LICENSE.txt) para obter mais informações.
