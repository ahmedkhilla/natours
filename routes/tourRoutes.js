import express from 'express';
import {
    aliasTopTours,
    getAllTours,
    getTourStats,
    getMonthlyPlan,
    getToursWithin,
    getDistances,
    getTour,
    updateTour,
    deleteTour,
    uploadTourImages,
    resizeTourImages
} from './../controllers/tourController.js';
import { protect, restrictTo } from './../controllers/authController.js';
import reviewRouter from './../routes/reviewRoutes.js';

const router = express.Router();

router.use('/:tourId/reviews', reviewRouter);

router
    .route('/top-5-cheap')
    .get(
        aliasTopTours,
        getAllTours
    );

router
    .route('/tour-stats')
    .get(getTourStats);

router
    .route('/monthly-plan/:year')
    .get(
        protect,
        restrictTo('admin', 'lead-guide', 'guide'),
        getMonthlyPlan
    );

// /tours-within/233/center/-40,45/unit/mi
// /tours-within?distance=233&center=-40,45&unit=mi
router
    .route('/tours-within/:distance/center/:latlng/unit/:unit')
    .get(getToursWithin);

router.route('/distances/:latlng/unit/:unit').get(getDistances);

router
    .route('/')
    .get(getAllTours)
    .post(
        protect,
        restrictTo('admin', 'lead-guide'),
        updateTour
    );

router
    .route('/:id')
    .get(getTour)
    .patch(
        protect,
        restrictTo('admin', 'lead-guide'),
        uploadTourImages,
        resizeTourImages,
        updateTour
    )
    .delete(
        protect,
        restrictTo('admin', 'lead-guide'),
        deleteTour
    );

export default router;
