const express = require('express');
const router = express.Router();
const {
  getSkills,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill,
  getMySkills,
} = require('../controllers/skillController');
const { protect } = require('../middleware/authMiddleware');
const { createSkillValidator, updateSkillValidator } = require('../validators/skillValidator');

/**
 * @swagger
 * /api/skills/my-skills:
 *   get:
 *     summary: Get all skills belonging to the authenticated user
 *     tags: [Skills]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of the user's skills
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 skills:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Skill'
 *       401:
 *         description: Not authorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// /my-skills must come before /:id to avoid route conflict
router.get('/my-skills', protect, getMySkills);

/**
 * @swagger
 * /api/skills:
 *   get:
 *     summary: Get all skills
 *     tags: [Skills]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Filter skills by title or description keyword
 *         example: React
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter skills by category
 *         example: Web Development
 *     responses:
 *       200:
 *         description: List of skills with instructor populated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 skills:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Skill'
 */
router.get('/', getSkills);

/**
 * @swagger
 * /api/skills:
 *   post:
 *     summary: Create a new skill (protected)
 *     tags: [Skills]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - category
 *             properties:
 *               title:
 *                 type: string
 *                 example: Introduction to React
 *               description:
 *                 type: string
 *                 example: Learn the fundamentals of React.js.
 *               category:
 *                 type: string
 *                 example: Web Development
 *               availability:
 *                 type: string
 *                 example: Weekends, 10am-2pm
 *     responses:
 *       201:
 *         description: Skill created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 skill:
 *                   $ref: '#/components/schemas/Skill'
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
router.post('/', protect, createSkillValidator, createSkill);

/**
 * @swagger
 * /api/skills/{id}:
 *   get:
 *     summary: Get a single skill by ID
 *     tags: [Skills]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The skill ID
 *         example: 64a1b2c3d4e5f6a7b8c9d0e2
 *     responses:
 *       200:
 *         description: Skill with instructor populated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 skill:
 *                   $ref: '#/components/schemas/Skill'
 *       404:
 *         description: Skill not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', getSkillById);

/**
 * @swagger
 * /api/skills/{id}:
 *   put:
 *     summary: Update a skill (protected, owner only)
 *     tags: [Skills]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The skill ID
 *         example: 64a1b2c3d4e5f6a7b8c9d0e2
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Advanced React
 *               description:
 *                 type: string
 *                 example: Deep dive into React hooks and state management.
 *               category:
 *                 type: string
 *                 example: Web Development
 *               availability:
 *                 type: string
 *                 example: Weekdays, 6pm-8pm
 *     responses:
 *       200:
 *         description: Updated skill
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 skill:
 *                   $ref: '#/components/schemas/Skill'
 *       403:
 *         description: Not authorized (not the owner)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Skill not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/:id', protect, updateSkillValidator, updateSkill);

/**
 * @swagger
 * /api/skills/{id}:
 *   delete:
 *     summary: Delete a skill (protected, owner only)
 *     tags: [Skills]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The skill ID
 *         example: 64a1b2c3d4e5f6a7b8c9d0e2
 *     responses:
 *       200:
 *         description: Skill deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Skill deleted successfully.
 *       403:
 *         description: Not authorized (not the owner)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Skill not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', protect, deleteSkill);

module.exports = router;
