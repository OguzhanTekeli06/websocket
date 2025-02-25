const express = require("express");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: Bildirim Yönetimi API Uçları
 */

/**
 * @swagger
 * /api/notifications:
 *   post:
 *     summary: Yeni bir bildirim gönder
 *     description: Admin, kullanıcılara push bildirimi gönderebilir.
 *     tags: [Notifications]
 *     responses:
 *       201:
 *         description: Bildirim başarıyla gönderildi
 */
router.post("/", (req, res) => res.json({ message: "Notification sent (TODO: Implement logic)" }));

/**
 * @swagger
 * /api/notifications:
 *   get:
 *     summary: Tüm bildirimleri getir
 *     description: Kullanıcıya gönderilen bildirimleri listeler.
 *     tags: [Notifications]
 *     responses:
 *       200:
 *         description: Bildirim listesi
 */
router.get("/", (req, res) => res.json([{ id: 1, message: "Stajyer toplantısı yarın" }]));

module.exports = router;
