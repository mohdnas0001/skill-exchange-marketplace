const express = require('express');
const router = express.Router();
const { createReview, getSkillReviews, getInstructorReviews } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');
const { createReviewValidator } = require('../validators/reviewValidator');

/**
 * @swagger
 * /api/reviews:
 *   post:
 *     summary: Create a new review (protected)
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - skill
 *               - instructor
 *               - rating
 *               - comment
 *             properties:
 *               skill:
 *                 type: string
 *                 description: Skill ID
 *                 example: 64a1b2c3d4e5f6a7b8c9d0e2
 *               instructor:
 *                 type: string
 *                 description: Instructor user ID
 *                 example: 64a1b2c3d4e5f6a7b8c9d0e1
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 5
 *               comment:
 *                 type: string
 *                 example: Excellent session, very informative!
 *     responses:
 *       201:
 *         description: Review created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 review:
 *                   $ref: '#/components/schemas/Review'
 *       400:
 *         description: Validation errors, duplicate review, or no completed booking
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Not authorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', protect, createReviewValidator, createReview);

/**
 * @swagger
 * /api/reviews/skill/{skillId}:
 *   get:
 *     summary: Get all reviews for a specific skill
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: skillId
 *         required: true
 *         schema:
 *           type: string
 *         description: The skill ID
 *         example: 64a1b2c3d4e5f6a7b8c9d0e2
 *     responses:
 *       200:
 *         description: List of reviews with reviewer populated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 reviews:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Review'
 */
router.get('/skill/:skillId', getSkillReviews);

/**
 * @swagger
 * /api/reviews/instructor/{instructorId}:
 *   get:
 *     summary: Get all reviews for a specific instructor
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: instructorId
 *         required: true
 *         schema:
 *           type: string
 *         description: The instructor user ID
 *         example: 64a1b2c3d4e5f6a7b8c9d0e1
 *     responses:
 *       200:
 *         description: List of reviews with reviewer populated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 reviews:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Review'
 */
router.get('/instructor/:instructorId', getInstructorReviews);

module.exports = router;
