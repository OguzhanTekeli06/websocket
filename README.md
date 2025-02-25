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

