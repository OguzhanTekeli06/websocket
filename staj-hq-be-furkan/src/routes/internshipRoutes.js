const express = require("express");
const router = express.Router();
const internshipController = require("../controllers/internshipController.js")

/**
 * @swagger
 * tags:
 *   name: Internships
 *   description: Staj Dönemi Yönetimi API Uçları 
 */

/**
 * @swagger
 * /api/internship-periods:
 *   get:
 *     summary: Tüm Staj Dönemlerini Getir
 *     description: Sistemdeki tüm staj dönemlerini getir.
 *     tags: [Internships]
 *     responses:
 *       200:
 *         description: Staj dönemleri başarıyla getirildi.
 */
router.get("/", internshipController.internshipGetAll);

/**
 * @swagger
 * /api/internship-periods:
 *   post:
 *     summary: Yeni Staj Dönemi Ekle
 *     description: Yeni bir staj dönemi ekler.
 *     tags: [Internships]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Staj döneminin adı
 *               start:
 *                 type: date
 *                 description: Staj döneminin başlangıç tarihi
 *               end:
 *                 type: date
 *                 description: Staj döneminin bitiş tarihi
 *     responses:
 *       201:
 *         description: Staj dönemi başarıyla oluşturuldu.
 */
router.post("/", internshipController.internshipAdd);

/**
 * @swagger
 * /api/internship-periods/{id}:
 *   put:
 *     summary: Staj Dönemini Güncelle
 *     description: ID'si verilen staj dönemini günceller.
 *     tags: [Internships]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Güncellenecek staj döneminin ID'si
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Staj döneminin adı
 *               start:
 *                 type: date
 *                 description: Staj döneminin başlangıç tarihi
 *               end:
 *                 type: date
 *                 description: Staj döneminin bitiş tarihi
 *     responses:
 *       200:
 *         description: Staj dönemi başarıyla güncellendi
 */
router.put("/:id", internshipController.internshipUpdate);

/**
 * @swagger
 * /api/internship-periods/{id}:
 *   delete:
 *     summary: Staj Dönemini Sil
 *     description: ID'si verilen staj dönemini siler.
 *     tags: [Internships]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Staj dönemi başarıyla silindi.
 */
router.delete("/:id", internshipController.internshipDelete);

module.exports = router;