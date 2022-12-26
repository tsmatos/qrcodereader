// Pedir permissão para usar a câmera do dispositivo
navigator.getUserMedia = navigator.getUserMedia ||
                        navigator.webkitGetUserMedia ||
                        navigator.mozGetUserMedia ||
                        navigator.msGetUserMedia;

if (navigator.getUserMedia) {
    navigator.getUserMedia({ video: {facingMode: "environment"} }, handleVideo, videoError);
}

function handleVideo(stream) {
    // Mostre a imagem da câmera na tela
    const video = document.getElementById("video");
    video.srcObject = stream;

    // Execute a leitura do código QR a cada 1000 milissegundos (1 segundo)
    setInterval(() => {
        // Obtenha a imagem da câmera e converta-a em um objeto canvas
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Execute a função jsQR para ler o código QR da imagem
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const qrCode = jsQR(imageData.data, imageData.width, imageData.height);

        // Verifique se o resultado é não nulo e imprima o conteúdo do código QR na tela
        if (qrCode) {
            console.log(qrCode.data);
        }
    }, 1000);
}

function videoError(e) {
    console.log("Erro ao acessar a câmera do dispositivo:", e);
}
