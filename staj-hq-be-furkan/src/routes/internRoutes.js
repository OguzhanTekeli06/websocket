const express = require("express");
const router = express.Router();
const internController = require("../controllers/internController.js")
const upload = require("../config/multer.js")

/**
 * @swagger
 * tags:
 *   name: Interns
 *   description: Stajyer Yönetimi API Uçları
 */

/**
 * @swagger
 * /api/interns:
 *   get:
 *     summary: Tüm Stajyerleri Getir
 *     description: Sistemdeki tüm stajyerleri getirir.
 *     tags: [Interns]
 *     responses:
 *       200:
 *         description: Tüm stajyerler başarıyla getirildi.
 */
router.get("/", internController.internGetAll);

/**
 * @swagger
 * /api/interns/{id}:
 *   get:
 *     summary: Belirli Bir Stajyeri Getir
 *     description: ID'si verilen stajyeri getirir.
 *     tags: [Interns]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Stajyer başarıyla getirildi.
 *       404:
 *         description: Stajyer bulunamadı!
 */
router.get("/:id", internController.internGetOne);


/**
 * @swagger
 * /api/interns:
 *   post:
 *     summary: Yeni Stajyer Ekle
 *     description: Yeni bir stajyer ekler.
 *     tags: [Interns]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               applicationId:
 *                 type: string
 *                 description: Satjyerin başvuru numarası
 *               name:
 *                 type: string
 *                 description: Stajyer adı
 *               identityNo:
 *                 type: number
 *                 description: Stajyerin TC kimlik numarası
 *               school:
 *                 type: string
 *                 description: Stajyerin okulu
 *               department:
 *                 type: string
 *                 description: Stajyerin bölümü
 *               grade:
 *                 type: string
 *                 description: Stajyerin sınıfı
 *               gpa_4:
 *                 type: number
 *                 description: Stajyerin 4 üzerinden not ortalaması
 *               term:
 *                 type: string
 *                 description: Stajyerin staj yapacağı dönem
 *               city:
 *                 type: string
 *                 description: Stajyerin yaşadığı şehir
 *               phoneNumber:
 *                 type: number
 *                 description: Stajyerin telefon numarası
 *               email:
 *                 type: string
 *                 description: Stajyerin email adresi
 *               faculty:
 *                 type: string
 *                 description: Stajyerin fakültesi
 *               yoksisVerification:
 *                 type: string
 *                 description: Stajyerin YÖKSİS doğrulaması var mı?
 *               gpa_100:
 *                 type: number
 *                 description: Stajyerin 100 üzerinden ortalaması
 *               transcriptLink:
 *                 type: string
 *                 description: Stajyerin transkript linki
 *               hasInternshipExperience:
 *                 type: string
 *                 description: Daha önce staj yaptı mı?
 *               gender:
 *                 type: string
 *                 description: Stajyerin cinsiyeti
 *               nationality:
 *                 type: string
 *                 description: Stajyerin milliyeti
 *               address:
 *                 type: string
 *                 description: Stajyerin adresi
 *               postCode:
 *                 type: number
 *                 description: Posta kodu
 *               district:
 *                 type: string
 *                 description: Stajyerin yaşadığı ilçe
 *               mentorId:
 *                  type: string
 *                  description: Stajyere atanan mentörün ID'si
 *               internshipPeriod:
 *                 type: string
 *                 description: Stajyerin staj dönemi
 *     responses:
 *       201:
 *         description: Stajyer başarıyla oluşturuldu.
 */
router.post("/", internController.internAdd);



/**
 * @swagger
 * /api/interns/fromExcel:
 *   post:
 *     summary: Excel Dosyasından Toplu Stajyer Ekle
 *     description: Excel dosyasından toplu şekilde stajyer ekler.
 *     tags: [Interns]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               excelFile:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Stajyerler başarıyla eklendi.
 */
router.post("/fromExcel", upload.single("excelFile"), internController.internAddFromExcel);

/**
 * @swagger
 * /api/interns/{id}:
 *   put:
 *     summary: Stajyeri Güncelle
 *     description: ID'si verilen stajyerin bilgilerini günceller.
 *     tags: [Interns]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Güncellenecek stajyerin ID'si
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               applicationId:
 *                 type: string
 *                 description: Satjyerin başvuru numarası
 *               name:
 *                 type: string
 *                 description: Stajyer adı
 *               identityNo:
 *                 type: number
 *                 description: Stajyerin TC kimlik numarası
 *               school:
 *                 type: string
 *                 description: Stajyerin okulu
 *               department:
 *                 type: string
 *                 description: Stajyerin bölümü
 *               grade:
 *                 type: string
 *                 description: Stajyerin sınıfı
 *               gpa_4:
 *                 type: number
 *                 description: Stajyerin 4 üzerinden not ortalaması
 *               term:
 *                 type: string
 *                 description: Stajyerin staj yapacağı dönem
 *               city:
 *                 type: string
 *                 description: Stajyerin yaşadığı şehir
 *               phoneNumber:
 *                 type: number
 *                 description: Stajyerin telefon numarası
 *               email:
 *                 type: string
 *                 description: Stajyerin email adresi
 *               faculty:
 *                 type: string
 *                 description: Stajyerin fakültesi
 *               yoksisVerification:
 *                 type: string
 *                 description: Stajyerin YÖKSİS doğrulaması var mı?
 *               gpa_100:
 *                 type: number
 *                 description: Stajyerin 100 üzerinden ortalaması
 *               transcriptLink:
 *                 type: string
 *                 description: Stajyerin transkript linki
 *               hasInternshipExperience:
 *                 type: string
 *                 description: Daha önce staj yaptı mı?
 *               gender:
 *                 type: string
 *                 description: Stajyerin cinsiyeti
 *               nationality:
 *                 type: string
 *                 description: Stajyerin milliyeti
 *               address:
 *                 type: string
 *                 description: Stajyerin adresi
 *               postCode:
 *                 type: number
 *                 description: Posta kodu
 *               district:
 *                 type: string
 *                 description: Stajyerin yaşadığı ilçe
 *               mentorId:
 *                  type: string
 *                  description: Stajyere atanan mentörün ID'si
 *               internshipPeriod:
 *                 type: string
 *                 description: Stajyerin staj dönemi
 *     responses:
 *       200:
 *         description: Stajyer başarıyla güncellendi.
 */
router.put("/:id", internController.internUpdate);



/**
 * @swagger
 * /api/interns/setMentor/{id}:
 *   put:
 *     summary: Stajyere Mentör Ata
 *     description: ID'si verilen stajyere mentör atar.
 *     tags: [Interns]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Mentörün atanacağı stajyerin ID'si
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mentorId:
 *                  type: string
 *                  description: Stajyere atanan mentörün ID'si
 *     responses:
 *       200:
 *         description: Mentör başarıyla atandı.
 */
router.put("/setMentor/:id" , internController.internSetMentor);

/**
 * @swagger
 * /api/interns/{id}:
 *   delete:
 *     summary: Stajyeri Sil
 *     description: ID'si verilen stajyeri siler.
 *     tags: [Interns]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Stajyer başarıyla silindi.
 */
router.delete("/:id", internController.internDelete);



module.exports = router;
