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

const LOGIN_API_URL = "http://localhost:4000/api/login";




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
