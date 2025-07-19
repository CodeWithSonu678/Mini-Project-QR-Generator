const qrText = document.getElementById("qr-text");
const sizes = document.getElementById("sizes");
const qrContainer = document.querySelector(".qr-body");
const qrGenerateBtn = document.getElementById("qrgenrate");
const qrDownloadBtn = document.getElementById("Qrdownload");

let qrCode = null;

qrGenerateBtn.addEventListener('click', (e) => {
    e.preventDefault();
    generateQRCode();
});

function generateQRCode() {
    qrContainer.innerHTML = "";  // Clear old QR

    const size = parseInt(sizes.value);

    qrCode = new QRCode(qrContainer, {
        text: qrText.value,
        width: size,
        height: size,
        colorDark: "#000000",
        colorLight: "#ffffff",
    });

    // Download link update करना
    setTimeout(() => {
        // 1st try img से
        const qrImage = qrContainer.querySelector('img');
        if (qrImage) {
            qrDownloadBtn.href = qrImage.src;
            qrDownloadBtn.download = "QR_Code.png";
        } else {
            // अगर img नहीं है, तो canvas से निकालो
            const qrCanvas = qrContainer.querySelector('canvas');
            if (qrCanvas) {
                const imageData = qrCanvas.toDataURL("image/png");
                qrDownloadBtn.href = imageData;
                qrDownloadBtn.download = "QR_Code.png";
            }
        }
    }, 500); // 0.5 sec wait करो ताकि QR बन जाए
}
