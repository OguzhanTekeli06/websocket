const express= require("express");
const {login, changePassword, userLogin, changeUserPassword, mentorLogin, changeMentorPassword}= require("../controllers/authController");
const router= express.Router();



/**
 * @swagger
 * tags:
 *   name: Login
 *   description: Giriş İşlemleri API Uçları
 */


/**
 * @swagger
 * /api/auth/login/:
 *   post:
 *     summary: Stajyer Girişi
 *     description: E-posta ve şifre ile giriş yapılır.
 *     tags: [Login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: E-posta
 *               password:
 *                 type: string
 *                 description: Şifre
 *     responses:
 *       200:
 *         description: Başarıyla giriş yapıldı.
 */
router.post("/login", login);



/**
 * @swagger
 * /api/auth/user-login/:
 *   post:
 *     summary: Kullanıcı Girişi
 *     description: E-posta ve şifre ile giriş yapılır.
 *     tags: [Login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: E-posta
 *               password:
 *                 type: string
 *                 description: Şifre
 *     responses:
 *       200:
 *         description: Başarıyla giriş yapıldı.
 */
router.post("/user-login",userLogin);




/**
 * @swagger
 * /api/auth/change-password/:
 *   post:
 *     summary: Stajyer İçin Şifre Değiştir
 *     description: Şifre değiştirme işlemi yapılır.
 *     tags: [Login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: E-posta
 *               newPassword:
 *                 type: string
 *                 description: Yeni şifre
 *     responses:
 *       200:
 *         description: Şifre başarıyla değiştirildi.
 */
router.post("/change-password", changePassword);



/**
 * @swagger
 * /api/auth/change-userpassword/:
 *   post:
 *     summary: Kullanıcı İçin Şifre Değiştir
 *     description: Şifre değiştirme işlemi yapılır.
 *     tags: [Login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: E-posta
 *               newPassword:
 *                 type: string
 *                 description: Yeni şifre
 *     responses:
 *       200:
 *         description: Şifre başarıyla değiştirildi.
 */
router.post("/change-userpassword", changeUserPassword);




module.exports=router;