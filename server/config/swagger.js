const path = require('path');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Skill Exchange & Learning Marketplace API',
    description: 'RESTful API for a peer-to-peer skill exchange and learning platform',
    version: '1.0.0',
  },
  servers: [
    {
      url: 'http://localhost:5000',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      User: {
        type: 'object',
        properties: {
          _id: { type: 'string', example: '64a1b2c3d4e5f6a7b8c9d0e1' },
          name: { type: 'string', example: 'Alice Smith' },
          email: { type: 'string', format: 'email', example: 'alice@example.com' },
          role: { type: 'string', enum: ['learner', 'instructor', 'both'], example: 'instructor' },
          bio: { type: 'string', example: 'Experienced web developer and mentor.' },
          profilePicture: { type: 'string', example: 'https://example.com/avatar.jpg' },
          skillsToTeach: {
            type: 'array',
            items: { type: 'string' },
            example: ['JavaScript', 'React'],
          },
          createdAt: { type: 'string', format: 'date-time', example: '2024-01-01T00:00:00.000Z' },
        },
      },
      Skill: {
        type: 'object',
        properties: {
          _id: { type: 'string', example: '64a1b2c3d4e5f6a7b8c9d0e2' },
          title: { type: 'string', example: 'Introduction to React' },
          description: { type: 'string', example: 'Learn the fundamentals of React.js.' },
          category: { type: 'string', example: 'Web Development' },
          availability: { type: 'string', example: 'Weekends, 10am-2pm' },
          instructor: { $ref: '#/components/schemas/User' },
          createdAt: { type: 'string', format: 'date-time', example: '2024-01-01T00:00:00.000Z' },
        },
      },
      Booking: {
        type: 'object',
        properties: {
          _id: { type: 'string', example: '64a1b2c3d4e5f6a7b8c9d0e3' },
          skill: { $ref: '#/components/schemas/Skill' },
          learner: { $ref: '#/components/schemas/User' },
          instructor: { $ref: '#/components/schemas/User' },
          date: { type: 'string', format: 'date-time', example: '2024-06-15T10:00:00.000Z' },
          status: {
            type: 'string',
            enum: ['pending', 'accepted', 'rejected', 'completed'],
            example: 'pending',
          },
          message: { type: 'string', example: 'Looking forward to learning React!' },
          createdAt: { type: 'string', format: 'date-time', example: '2024-01-01T00:00:00.000Z' },
        },
      },
      Review: {
        type: 'object',
        properties: {
          _id: { type: 'string', example: '64a1b2c3d4e5f6a7b8c9d0e4' },
          skill: { $ref: '#/components/schemas/Skill' },
          reviewer: { $ref: '#/components/schemas/User' },
          instructor: { $ref: '#/components/schemas/User' },
          rating: { type: 'integer', minimum: 1, maximum: 5, example: 5 },
          comment: { type: 'string', example: 'Excellent session, very informative!' },
          createdAt: { type: 'string', format: 'date-time', example: '2024-01-01T00:00:00.000Z' },
        },
      },
      AuthResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
          user: { $ref: '#/components/schemas/User' },
        },
      },
      Error: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: false },
          message: { type: 'string', example: 'An error occurred.' },
          errors: {
            type: 'array',
            items: { $ref: '#/components/schemas/ValidationError' },
          },
        },
      },
      ValidationError: {
        type: 'object',
        properties: {
          type: { type: 'string', example: 'field' },
          msg: { type: 'string', example: 'Email is required.' },
          path: { type: 'string', example: 'email' },
          location: { type: 'string', example: 'body' },
        },
      },
    },
  },
  tags: [
    { name: 'Auth', description: 'Authentication endpoints' },
    { name: 'Users', description: 'User profile endpoints' },
    { name: 'Skills', description: 'Skill listing endpoints' },
    { name: 'Bookings', description: 'Booking management endpoints' },
    { name: 'Reviews', description: 'Review endpoints' },
  ],
};

const options = {
  swaggerDefinition,
  apis: [path.join(__dirname, '../routes/*.js')],
};

module.exports = options;
