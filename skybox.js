"use strict";

var totalShots = 5;

function main() {
    // Obtém o contexto WebGL de um elemento canvas no documento.
    /** @type {HTMLCanvasElement} */
    var canvas = document.querySelector("#canvas");
    var gl = canvas.getContext("webgl");
    if (!gl) {
        return;
    }

    // Cria um programa WebGL para renderizar um skybox.
    const skyboxProgramInfo = webglUtils.createProgramInfo(
        gl, ["skybox_vs", "skybox_fs"]);

    // Cria um buffer de vértices para um quad (um retângulo) usado para o skybox.
    const quadBufferInfo = primitives.createXYQuadBufferInfo(gl);

    // Cria uma textura WebGL que representa um cubemap para o skybox.
    const texture = gl.createTexture();

    // Informações sobre as faces do cubemap (texturas) a serem carregadas.
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
    const faceInfos = [
        {
            target: gl.TEXTURE_CUBE_MAP_POSITIVE_X, // front
            url: './skybox/space_ft.png',
        },
        {
            target: gl.TEXTURE_CUBE_MAP_NEGATIVE_X, // back
            url: './skybox/space_bk.png',
        },
        {
            target: gl.TEXTURE_CUBE_MAP_POSITIVE_Y, // up
            url: './skybox/space_up.png',
        },
        {
            target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, // down
            url: './skybox/space_dn.png',
        },
        {
            target: gl.TEXTURE_CUBE_MAP_POSITIVE_Z, // right
            url: './skybox/space_rt.png',
        },
        {
            target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, // left
            url: './skybox/space_lf.png',
        },
    ];

    // Carrega as texturas para cada face do cubemap.
    faceInfos.forEach((faceInfo) => {
        const { target, url } = faceInfo;

        // Upload the canvas to the cubemap face.
        const level = 0;
        const internalFormat = gl.RGBA;
        const width = 512;
        const height = 512;
        const format = gl.RGBA;
        const type = gl.UNSIGNED_BYTE;

        // setup each face so it's immediately renderable
        gl.texImage2D(target, level, internalFormat, width, height, 0, format, type, null);

        // Asynchronously load an image
        const image = new Image();
        image.src = url;
        image.addEventListener('load', function () {
            // Now that the image has loaded make copy it to the texture.
            gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
            gl.texImage2D(target, level, internalFormat, format, type, image);
            gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
        });
    });

    gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);

    function degToRad(d) {
        return d * Math.PI / 180;
    }

    var fieldOfViewRadians = degToRad(60);

    // Textura do céu.
    var skyTexture = texture;

    // Define os shaders (vertex e fragment) para o objeto esférico.
    const vs = `
    attribute vec4 a_position;
    attribute vec4 a_color;
    
    uniform mat4 u_matrix;
    
    varying vec4 v_color;
    
    void main() {
        // Multiply the position by the matrix.
        gl_Position = u_matrix * a_position;
    
        // Pass the color to the fragment shader.
        v_color = a_color;
    }
    `;

    const fs = `
    precision mediump float;

    // Passed in from the vertex shader.
    varying vec4 v_color;
    
    uniform vec4 u_colorMult;
    
    void main() {
        gl_FragColor = v_color * u_colorMult;
    }`;

    // Cria um buffer de vértices para a esfera.
    const sphereBufferInfo = primitives.createSphereWithVertexColorsBufferInfo(gl, 5, 12, 6);

    // Cria um programa WebGL para renderizar a esfera.
    var programInfo = webglUtils.createProgramInfo(gl, [vs, fs]);

    function degToRad(d) {
        return d * Math.PI / 180;
    }

    var fieldOfViewRadians = degToRad(60);

    // Uniforms for each object.
    var sphereUniforms = {
        u_colorMult: [10, 10, 10, 0],
        u_matrix: m4.identity(),
    };




    canvas.addEventListener("click", throw_sphere);

    function throw_sphere() {
        if (totalShots > 0) {
            var rayOrigin = cameraPosition.slice(); // Posição da câmera é o ponto de partida
            var rayDirection = m4.normalize(m4.subtractVectors(target, cameraPosition)); // Direção do olhar

            // Determine a velocidade desejada
            var speed = 5.0; // Ajuste este valor para a velocidade desejada

            // Configure a esfera com base na posição e direção do clique
            var newSphere = {
                position: rayOrigin.slice(),
                velocity: [rayDirection[0] * speed, rayDirection[1] * speed, rayDirection[2] * speed] // Direção do olhar é multiplicada pela velocidade
            };

            spheres.push(newSphere);
            totalShots -= 1; // Reduza o número total de tiros
        }
    }

    function collision() {
        for (var i = 0; i < spheres.length; i++) {
            for (var j = 0; j < objs.length; j++) {
                if (objs[j].visible) {
                    var sphere = spheres[i];
                    var obj = objs[j];

                    var dist = m4.distance(sphere.position, obj.position);

                    if (dist < 45) {
                        // Colisão detectada, remova o objeto e a esfera
                        obj.visible = false;
                        spheres.splice(i, 1);
                        i--;
                        break;
                    }
                }
            }
        }
    }

    var objectsToDraw = [
        {
            programInfo: programInfo,
            bufferInfo: sphereBufferInfo,
            uniforms: sphereUniforms,
        }
    ];

    // Função para calcular a matriz de transformação do objeto.
    function computeMatrix(viewProjectionMatrix, translation, xRotation, yRotation) {
        var matrix = m4.translate(viewProjectionMatrix,
            translation[0],
            translation[1],
            translation[2]);
        matrix = m4.xRotate(matrix, xRotation);
        return m4.yRotate(matrix, yRotation);
    }

    requestAnimationFrame(drawScene);

    // Função de animação principal.
    function drawScene(time) {
        time *= 0.0005;

        webglUtils.resizeCanvasToDisplaySize(gl.canvas);

        // Tell WebGL how to convert from clip space to pixels
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        gl.enable(gl.CULL_FACE);
        gl.enable(gl.DEPTH_TEST);

        // Clear the canvas AND the depth buffer.
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // Compute the projection matrix
        var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
        var projectionMatrix =
            m4.perspective(fieldOfViewRadians, aspect, 0.1, 2000);

        var viewProjectionMatrix = m4.multiply(projectionMatrix, view);

        // Verifique colisões
        collision();

        // Iterate over the array of spheres and update their positions
        spheres.forEach(function (sphere) {
            var position = sphere.position;
            var velocity = sphere.velocity;

            // Atualize a posição da esfera com base na velocidade
            position[0] += velocity[0];
            position[1] += velocity[1];
            position[2] += velocity[2];

            // Compute a matriz de transformação para a esfera
            var sphereXRotation = time;
            var sphereYRotation = time;

            sphereUniforms.u_matrix = computeMatrix(
                viewProjectionMatrix,
                position, // Use a posição da esfera atual
                sphereXRotation,
                sphereYRotation);

            // Draw the sphere
            objectsToDraw.forEach(function (object) {
                var programInfo = object.programInfo;
                var bufferInfo = object.bufferInfo;

                gl.useProgram(programInfo.program);

                // Setup all the needed attributes.
                webglUtils.setBuffersAndAttributes(gl, programInfo, bufferInfo);

                // Set the uniforms.
                webglUtils.setUniforms(programInfo, object.uniforms);

                // Draw
                gl.drawArrays(gl.TRIANGLES, 0, bufferInfo.numElements);
            });
        });

        // draw the skybox
        // let our quad pass the depth test at 1.0
        gl.depthFunc(gl.LEQUAL);

        gl.useProgram(skyboxProgramInfo.program);
        webglUtils.setBuffersAndAttributes(gl, skyboxProgramInfo, quadBufferInfo);

        // Create a separate view-projection matrix for the skybox
        var skyboxViewProjectionMatrix = m4.copy(view);
        skyboxViewProjectionMatrix[12] = 0;
        skyboxViewProjectionMatrix[13] = 0;
        skyboxViewProjectionMatrix[14] = 0;
        skyboxViewProjectionMatrix = m4.multiply(projectionMatrix, skyboxViewProjectionMatrix);

        webglUtils.setUniforms(skyboxProgramInfo, {
            u_viewDirectionProjectionInverse: m4.inverse(skyboxViewProjectionMatrix),
            u_skybox: skyTexture,
        });
        webglUtils.drawBufferInfo(gl, quadBufferInfo);

        requestAnimationFrame(drawScene);
    }
}

main();