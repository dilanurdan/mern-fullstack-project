const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const User = require('../models/User');

//KULLANICI GİRİŞ & KAYIT ROTALARI
router.post('/register', authController.register);
router.post('/login', authController.login);

// GİRİŞ YAPMIŞ KULLANICI BİLGİLER
router.get('/me', protect, authController.getMe);

//PROFiL GÜNCELLEME
router.put('/update', protect, async (req, res) => {
    try {
        const { name, avatar } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            req.user.id, // middleware'den gelen güvenli id
            { name, avatar },
            { new: true }
        ).select('-password');

        res.json({ message: "Profil güncellendi!", user: updatedUser });
    } catch (err) {
        res.status(500).json({ message: "Güncelleme hatası" });
    }
});

//FAVORİ EKLE / ÇIKAR
router.post('/favorite', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: "Kullanıcı bulunamadı" });
        }

        const courseId = req.body.courseId;

        const isFavorite = user.favorites.some(
            (id) => id.toString() === courseId
        );

        if (isFavorite) {
            user.favorites = user.favorites.filter(
                (id) => id.toString() !== courseId
            );
        } else {
            user.favorites.push(courseId);
        }

        await user.save();

        res.json({
            message: "Favoriler güncellendi",
            favorites: user.favorites
        });

    } catch (err) {
        console.error("Favori Hatası:", err);
        res.status(500).json({ message: "Favori işlemi hatası" });
    }
});

module.exports = router;