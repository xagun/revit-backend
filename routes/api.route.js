const router = require('express').Router();
const authRouter = require('./../controllers/auth.controller');
const bookingRouter = require('./../controllers/booking.controller');
const contactRouter = require('./../controllers/contact.controller');
const newsletterRouter = require('./../controllers/newsletter.controller');
const sliderRouter = require('./../controllers/slider.controller');
const homenewsRouter = require('./../controllers/homenews.controller');
const testrideRouter = require('./../controllers/testRide.controller');
const galleryRouter = require('./../controllers/gallery.controller');



// middleware
const authenticate = require('./../middlewares/authenticate');

router.use('/auth',authRouter);
router.use('/booking',bookingRouter);
router.use('/contact',contactRouter);
router.use('/newsletter',newsletterRouter);
router.use('/slider',sliderRouter);
router.use('/homenews',homenewsRouter);
router.use('/testride', testrideRouter);
router.use('/gallery',galleryRouter);





module.exports = router;