const express = require('express');
const router = express.Router();
const { createBooking, getMyBookings, updateBookingStatus } = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');
const { createBookingValidator } = require('../validators/bookingValidator');

/**
 * @swagger
 * /api/bookings/my-bookings:
 *   get:
 *     summary: Get all bookings for the authenticated user (as learner and instructor)
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 bookings:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Booking'
 *       401:
 *         description: Not authorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// /my-bookings must come before /:id/status to avoid route conflict
router.get('/my-bookings', protect, getMyBookings);

/**
 * @swagger
 * /api/bookings:
 *   post:
 *     summary: Create a new booking (protected)
 *     tags: [Bookings]
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
 *               - date
 *             properties:
 *               skill:
 *                 type: string
 *                 description: Skill ID
 *                 example: 64a1b2c3d4e5f6a7b8c9d0e2
 *               instructor:
 *                 type: string
 *                 description: Instructor user ID
 *                 example: 64a1b2c3d4e5f6a7b8c9d0e1
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: '2024-06-15T10:00:00.000Z'
 *               message:
 *                 type: string
 *                 example: Looking forward to learning React!
 *     responses:
 *       201:
 *         description: Booking created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 booking:
 *                   $ref: '#/components/schemas/Booking'
 *       400:
 *         description: Validation errors
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
router.post('/', protect, createBookingValidator, createBooking);

/**
 * @swagger
 * /api/bookings/{id}/status:
 *   put:
 *     summary: Update the status of a booking (protected, instructor only)
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The booking ID
 *         example: 64a1b2c3d4e5f6a7b8c9d0e3
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [accepted, rejected, completed]
 *                 example: accepted
 *     responses:
 *       200:
 *         description: Updated booking
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 booking:
 *                   $ref: '#/components/schemas/Booking'
 *       403:
 *         description: Not authorized (not the instructor)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Booking not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/:id/status', protect, updateBookingStatus);

module.exports = router;
