const app = require("./src/app");
const connectDB = require("./config/db");
const http = require("http");
const { Server } = require("socket.io");
const axios = require("axios");

const PORT = process.env.PORT || 5000;

connectDB(); // Veritabanı bağlantısını başlat
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

const LOGIN_API_URL = "http://localhost:5000/api/auth/user-login"; // Backend'in kendi login endpointi

//çalışmıyor
// io.on("connection", (socket) => {
//     console.log("Bir istemci bağlandı: ", socket.id);

//     socket.on("login", async (data, callback) => {
//         console.log("Login isteği alındı", data);
//         try {
//             const response = await axios.post(LOGIN_API_URL, data, {
//                 headers: { "Content-Type": "application/json" }
//             });

//             // Gelen yanıtı kontrol et
//             if (response.error.mustChangePassword) {
//                 callback({
//                     success: false,
//                     message: "Şifrenizi ilk girişte değiştirmeniz gerekiyor.",
//                     error: { message: "Şifrenizi ilk girişte değiştirmeniz gerekiyor.", redirect: "/api/auth/change-userpassword" }
//                 });
//             } else {
//                 callback(response.data);
//             }
//         } catch (error) {
//             console.error("Login hatası:", error.response ? error.response.data : error.message);
//             callback({ success: false, message: "Login başarısız oldu", error: error.response ? error.response.data : error.message });
//         }
//     });
// });
io.on("connection", (socket) => {
    console.log("Bir istemci bağlandı: ", socket.id);

    socket.on("login", async (data, callback) => {
        console.log("Login isteği alındı", data);
        try {
            const response = await axios.post(LOGIN_API_URL, data, {
                headers: { "Content-Type": "application/json" }
            });

            // Gelen yanıtı kontrol et
            if (response.data.mustChangePassword) {
                callback({
                    success: false,
                    message: "Şifrenizi ilk girişte değiştirmeniz gerekiyor.",
                    error: { message: "Şifrenizi ilk girişte değiştirmeniz gerekiyor.", redirect: "/api/auth/change-userpassword" }
                });
            } else {
                callback(response.data);
            }
        } catch (error) {
            console.error("Login hatası:", error.response ? error.response.data : error.message);
            const errorResponse = {
                success: false,
                message: "Login başarısız oldu",
                mustChangePassword: error.response ? error.response.data.mustChangePassword : false,
                error: error.response ? error.response.data : error.message
            };
            if (error.response && error.response.data && error.response.data.redirect) {
                errorResponse.error.redirect = error.response.data.redirect;
            }
            callback(errorResponse);
        }
    });
});








// çalışan hali
// io.on("connection", (socket) => {
//     console.log("Bir istemci bağlandı: ", socket.id);

//     socket.on("login", async (data, callback) => {
//         console.log("Login isteği alındı", data);
//         try {
//             const response = await axios.post(LOGIN_API_URL, data, {
//                 headers: { "Content-Type": "application/json" }
//             });
//             callback(response.data);
//         } catch (error) {
//             console.error("Login hatası:", error.response ? error.response.data : error.message);
//             callback({ success: false, message: "Login başarısız oldu", error: error.response ? error.response.data : error.message  });
//         }
//     });
// });

server.listen(PORT, () => console.log(`Server ${PORT} portunda çalışıyor...`));


// io.on("connection", (socket) => {
//     console.log("Bir istemci bağlandı: ", socket.id);

//     socket.on("login", async (data, callback) => {
//         console.log("Login isteği alındı", data);
//         try {
//             const response = await axios.post(LOGIN_API_URL, data, {
//                 headers: { "Content-Type": "application/json" }
//             });

//             // Gelen yanıtı kontrol et
//             if (response.data.mustChangePassword) {
//                 callback({
//                     success: false,
//                     message: "Şifrenizi ilk girişte değiştirmeniz gerekiyor.",
//                     error: { redirect: "/api/auth/change-userpassword" }
//                 });
//             } else {
//                 callback(response.data);
//             }
//         } catch (error) {
//             console.error("Login hatası:", error.response ? error.response.data : error.message);
//             callback({ success: false, message: "Login başarısız oldu", error: error.response ? error.response.data : error.message });
//         }
//     });
// });