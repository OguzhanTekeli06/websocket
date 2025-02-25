require("dotenv").config();
const express = require("express");
const axios = require("axios");

const { io } = require("socket.io-client");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

//backend ile iletişim için socket.io istemcisi
const socket = io(process.env.BACKEND_SOCKET_URL, {
    transports: ["websocket"],
});

socket.on("connect", () => {
    console.log("backend ile socket bağlantısı kuruldu");
});

//login isteğini yönlendiren REST endpoini
app.post("/login", (req, res) => {
    console.log("login isteği geldi", req.body);

    //backende login istediğinin yönledirilmesi

    socket.emit("login", req.body, (response) => {
        console.log("backend cevap", response);
        res.json(response);//gelen cevabı mobile geri döndür
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



const app = require("./src/app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5001;

connectDB(); // Veritabanı bağlantısını başlat
app.listen(PORT, () => console.log(`Server ${PORT} portunda çalisiyor...`));

const io = require("socket.io")(
    5000, {
    cors: {
        origin: "*"
    }
}
);

const axios = require("axios");

const LOGIN_API_URL = "http://localhost:5001/api/auth/login";   // backednndeki login url




io.on("connection", (socket) => {
    console.log("rotere bağlandı", socket.id);


    socket.on("login", async (data, callback) => {
        console.log("login eventi tetiklendi", data);
        try {
            const response = await axios.post(LOGIN_API_URL, data, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            callback(response.data);
        } catch (error) {
            callback({ succes: false, message: "login başarısız oldu server hatası" });
        }
    });
});
