// Pedir permissão para usar a câmera do dispositivo
navigator.getUserMedia = navigator.getUserMedia ||
                        navigator.webkitGetUserMedia ||
                        navigator.mozGetUserMedia ||
                        navigator.msGetUserMedia;

// Verificar se o dispositivo permite alterar entre câmeras
navigator.mediaDevices.enumerateDevices()
    .then(devices => {
        // Verifique se há mais de uma câmera disponível
        const cameras = devices.filter(device => device.kind === "videoinput");
        if (cameras.length > 1) {
            // Tente acessar a câmera traseira
            navigator.getUserMedia({ video: { facingMode: "environment" } }, handleVideo, videoError);
        } else {
            console.log("Apenas uma câmera disponível ou dispositivo não permite alterar entre câmeras.");
        }
    });

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

        // Verifique se o resultado é não nulo e atualize o conteúdo da tag <h3> com o conteúdo do código QR
        if (qrCode) {
            document.getElementById("qr-code-content").innerText = qrCode.data;
        }
    }, 1000);
}

function videoError(e) {
    console.log("Erro ao acessar a câmera do dispositivo:", e);
}
