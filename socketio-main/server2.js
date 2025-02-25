require("dotenv").config();
const express = require("express");
const { io } = require("socket.io-client");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Backend ile Socket.IO bağlantısı
const backendSocket = io("http://localhost:5001", {
    transports: ["websocket"]
});

backendSocket.on("connect", () => {
    console.log("Backend ile Socket.IO bağlantısı kuruldu.");
});

// Mobil cihazdan gelen login isteğini backend'e yönlendir
app.post("/login", (req, res) => {
    console.log("Mobil cihazdan login isteği alındı:", req.body);

    backendSocket.emit("login", req.body, (response) => {
        console.log("Backend'den gelen yanıt:", response);
        res.json(response);
    });
});

app.listen(PORT, () => {
    console.log(`Ara katman sunucusu ${PORT} portunda çalışıyor...`);
});
