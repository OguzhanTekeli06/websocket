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



MONGO_URI = "mongodb://localhost:27017/hvl-staj"

PORT = 5000

ACCESS_TOKEN_SECRET = 8752fb030dad0e1a6a02134ad2df59aea818af2da8dc2ac364723abdc10c9893NPM

REFRESH_TOKEN_SECRET = 44dc1bf900dfea0d307f350fabba1edb8cda08d947db8b885e70e1daf3f96bd8




async function kullanicibilgi(req, res, next) {
    try {
        const { email, password } = req.body; // İstekten e-posta ve şifre bilgilerini al
        const responses = await io.timeout(2000).emitWithAck("login", { email, password }); // Tüm istemcilerde 'login' olayını tetikle ve yanıtları bekle.
        
        console.log('Received responses:', responses);

        // Yanıtı döndür
        res.json({
            success: true,
            data: responses
        });
    } catch (error) {
        console.error('Error or timeout:', error);

        // Hata durumunda bir yanıt dön
        res.status(500).json({
            success: false,
            message: 'Error or timeout occurred',
            error: error.message // Hata mesajını ekle
        });
    }

    // Middleware zinciri için next'i çağır
    return next();
}

TEMP_TOKEN_SECRET = 303dccd2e7ef99baad309365142fcbb68ba6ca11211d05bb0c1ecb3d65ab4ede

ACCESS_EXPIRES_IN = 3h

REFRESH_EXPIRES_IN = 3d
