# Trabalho 2 de Computação Gráfica

Height Map com Movimento de Câmera e Disparo de esferas.

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

## Licença
Este projeto está licenciado sob a `Licença` - consulte o arquivo [LICENSE](https://github.com/git/git-scm.com/blob/main/MIT-LICENSE.txt) para obter detalhes.
