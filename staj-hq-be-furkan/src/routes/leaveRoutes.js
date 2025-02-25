const express = require("express");
const router = express.Router();
const leaveController = require("../controllers/leaveController.js");

/**
 * @swagger
 * tags:
 *   name: Leaves
 *   description: İzin Talebi Yönetimi API Uçları
 */

/**
 * @swagger
 * /api/leave-requests:
 *   get:
 *     summary: Tüm İzin Taleplerini Getir
 *     description: Sistemdeki tüm izin taleplerini getirir.
 *     tags: [Leaves]
 *     responses:
 *       200:
 *         description: Tüm izin talepleri başarıyla getirildi.
 */
router.get("/", leaveController.leaveGetAll);

/**
 * @swagger
 * /api/leave-requests:
 *   post:
 *     summary: Yeni İzin Talebi Ekle
 *     description: Yeni bir izin talebi ekler.
 *     tags: [Leaves]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               internId:
 *                 type: string
 *                 description: Talebi açan stajyerin ID'si
 *               start:
 *                 type: string
 *                 format : date
 *                 example : YYYY-AA-GG
 *                 description: İzin talebinin başlangıç tarihi
 *               end:
 *                 type: string
 *                 format : date
 *                 example : YYYY-AA-GG
 *                 description: İzin talebinin bitiş tarihi
 *               status:
 *                 type: string
 *                 description: İzin talebinin durumu
 *     responses:
 *       201:
 *         description: İzin talebi başarıyla eklendi.
 */
router.post("/", leaveController.leaveAdd);

/**
 * @swagger
 * /api/leave-requests/{id}:
 *   put:
 *     summary: İzin Talebini Güncelle
 *     description: ID'si verilen izin talebini günceller.
 *     tags: [Leaves]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Güncellenecek talebin ID'si
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               internId:
 *                 type: string
 *                 description: Talebi açan stajyerin ID'si
 *               start:
 *                 type: date
 *                 description: İzin talebinin başlangıç tarihi
 *               end:
 *                 type: date
 *                 description: İzin talebinin bitiş tarihi
 *               status:
 *                 type: string
 *                 description: İzin talebinin durumu
 *     responses:
 *       200:
 *         description: İzin talebi başarıyla güncellendi.
 */
router.put("/:id", leaveController.leaveUpdate);

module.exports = router;
