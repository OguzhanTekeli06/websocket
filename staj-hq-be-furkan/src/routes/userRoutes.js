const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController")



/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Kullanıcı Yönetimi API Uçları
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Tüm Kullanıcıları Getir
 *     description: Sistemdeki tüm kullanıcıları getirir.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Kullanıcı listesi başarıyla döndü.
 */
router.get("/", userController.userGetAll);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Belirli bir kullanıcıyı getir
 *     description: ID'si verilen kullanıcıyı döndürür.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Kullanıcının ID'si
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Kullanıcı bilgisi başarıyla döndü.
 *       404:
 *         description: Kullanıcı bulunamadı.
 */
router.get("/:id", userController.userGetOne);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Yeni Bir Kullanıcı Ekle
 *     description: Sİsteme yeni bir kullanıcı ekler.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               employeeId:
 *                 type: string
 *                 description: Sicil numarası 
 *               name:
 *                 type: string
 *                 description: Ad soyad
 *               email:
 *                 type: string
 *                 description: Kullanıcının e-posta adresi
 *               password:
 *                 type: string
 *                 description: Kullanıcın şifresi
 *               phoneNumber:
 *                 type: number
 *                 description: Telefon numarası
 *               department:
 *                 type: string
 *                 description: Departman
 *               title:
 *                 type: string
 *                 description: Ünvan
 *               role:
 *                 type: string
 *                 description: Kullanıcının rolü (Admin , BSYM , İK , Mentör)
 *     responses:
 *       201:
 *         description: Kullanıcı başarıyla oluşturuldu.
 */
router.post("/", userController.userAdd);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Kullanıcıyı Güncelle
 *     description: ID'si verilen kullanıcıyı günceller.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Güncellenecek kullanıcının ID'si
 *         schema:
 *           type: string
  *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               employeeId:
 *                 type: string
 *                 description: Sicil numarası 
 *               name:
 *                 type: string
 *                 description: Ad soyad
 *               email:
 *                 type: string
 *                 description: Kullanıcının e-posta adresi
 *               password:
 *                 type: string
 *                 description: Kullanıcın şifresi
 *               phoneNumber:
 *                 type: number
 *                 description: Telefon numarası
 *               department:
 *                 type: string
 *                 description: Departman
 *               title:
 *                 type: string
 *                 description: Ünvan
 *               role:
 *                 type: string
 *                 description: Kullanıcının rolü (Admin , BSYM , İK , Mentör)
 *     responses:
 *       200:
 *         description: Kullanıcı bilgisi başarıyla güncellendi.
 */
router.put("/:id", userController.userUpdate);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Kullanıcıyı Sil
 *     description: ID'si verilen kullanıcıyı sistemden siler.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Silinecek kullanıcının ID'si
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Kullanıcı başarıyla silindi.
 */
router.delete("/:id", userController.userDelete);

module.exports = router;
