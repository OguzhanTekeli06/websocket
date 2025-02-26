require("dotenv").config();
const express = require("express");
const { io } = require("socket.io-client");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000; // 3000 

app.use(express.json());
app.use(cors());

// Backend ile Socket.IO bağlantısı
const backendSocket = io("http://localhost:5000", {       //backedn ile socket io bağlantsı kurar.
    transports: ["websocket"]                               //websocket protekoli ile bağlantı kurar
});

backendSocket.on("connect", () => {                             //backend ile socket io bağlantısı kurulduğunda mesaj yazdırır
    console.log("Backend ile Socket.IO bağlantısı kuruldu.");
});

// Mobil cihazdan gelen login isteğini backend'e yönlendir
app.post("/login", (req, res) => {                                 //login endpoint'ine gelen POST isteklerini dinler. 
    console.log("Mobil cihazdan login isteği alındı:", req.body);

    backendSocket.emit("login", req.body, (response) => {        // Gelen isteği backend sunucusuna login olayı ile gönderir.
        console.log("Backend'den gelen yanıt:", response);      //Backend'den gelen yanıtı konsola yazdırır.
        res.json(response);                                     //Backend'den gelen yanıtı mobil cihaza JSON formatında geri döner.
    });
});


//şifre değiştirme endpointi
app.post("/change-password", (req, res) => {                 //change-password endpoint'ine gelen POST isteklerini dinler.  

});    



app.listen(PORT, () => {
    console.log(`Ara katman sunucusu ${PORT} portunda çalışıyor...`);
});
