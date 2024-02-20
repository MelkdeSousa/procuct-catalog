/**
 * @swagger
 * components:
 *   schemas:
 *     CreateUserResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *     CreateUserRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *       required:
 *         - name
 *     CreateProductRequest:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: integer
 *         category:
 *           type: string
 *       required:
 *         - title
 *         - category
 *         - price
 *         - description
 *     CreateProductResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: integer
 *         categoryId:
 *           type: string
 *         ownerId:
 *           type: string
 *         href:
 *           type: string
 */
