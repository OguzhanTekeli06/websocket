const app = require("./src/app");
const connectDB = require("./config/db");
const http = require("http");
const { Server } = require("socket.io");
const axios = require("axios");

const PORT = process.env.PORT || 5001;

connectDB(); // Veritabanı bağlantısını başlat
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

const LOGIN_API_URL = "http://localhost:5001/api/auth/login"; // Backend'in kendi login endpointi

io.on("connection", (socket) => {
    console.log("Bir istemci bağlandı: ", socket.id);

    socket.on("login", async (data, callback) => {
        console.log("Login isteği alındı", data);
        try {
            const response = await axios.post(LOGIN_API_URL, data, {
                headers: { "Content-Type": "application/json" }
            });
            callback(response.data);
        } catch (error) {
            callback({ success: false, message: "Login başarısız oldu" });
        }
    });
});

server.listen(PORT, () => console.log(`Server ${PORT} portunda çalışıyor...`));
