const express = require("express");
const router = express.Router();
const announcementController = require("../controllers/announcementController.js");


/**
 * @swagger
 * tags:
 *   name: Announcements
 *   description: Duyuru Yönetimi API Uçları
 */

/**
 * @swagger
 * /api/announcements:
 *   get:
 *     summary: Tüm Duyuruları Getir
 *     description: Sistemdeki tüm duyuruları getirir.
 *     tags: [Announcements]
 *     responses:
 *       200:
 *         description: Tüm duyurular başarıyla getirildi.
 */
router.get("/", announcementController.getAllAnnouncements );

/**
 * @swagger
 * /api/announcements:
 *   post:
 *     summary: Yeni Duyuru Ekle
 *     description: Yeni bir duyuru ekler.
 *     tags: [Announcements]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Duyurunun başlığı
 *               message:
 *                 type: string
 *                 description: Duyurunun içeriği
 *               createdAt:
 *                 type: date
 *                 description: Duyurunun yayınlanma tarihi
 *     responses:
 *       201:
 *         description: Duyuru başarıyla eklendi.
 */
router.post("/", announcementController.addAnnouncement);

/**
 * @swagger
 * /api/announcements/{id}:
 *   delete:
 *     summary: Duyuruyu Sil
 *     description: ID'si verilen duyuruyu siler.
 *     tags: [Announcements]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Duyuru başarıyla silindi.
 */
router.delete("/:id", announcementController.deleteAnnouncement);

module.exports = router;
