const express = require("express");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Surveys
 *   description: Anket Yönetimi API Uçları
 */

/**
 * @swagger
 * /api/surveys:
 *   get:
 *     summary: Tüm anketleri getir
 *     description: Sistemdeki tüm anketleri döndürür.
 *     tags: [Surveys]
 *     responses:
 *       200:
 *         description: Anket listesi
 */
router.get("/", (req, res) => res.json([{ id: 1, question: "Staj süreciniz nasıl geçiyor?" }]));

/**
 * @swagger
 * /api/surveys:
 *   post:
 *     summary: Yeni bir anket oluştur
 *     description: Admin, yeni bir anket oluşturabilir.
 *     tags: [Surveys]
 *     responses:
 *       201:
 *         description: Anket başarıyla oluşturuldu
 */
router.post("/", (req, res) => res.json({ message: "Survey created (TODO: Implement logic)" }));

module.exports = router;
