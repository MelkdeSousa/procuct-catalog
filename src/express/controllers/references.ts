/**
 * @swagger
 * components:
 *   responses:
 *     NotFoundOwnerOrCategory:
 *       description: When a owner or a category not found
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CommonError'
 *
 *   parameters:
 *     X-Owner:
 *       in: header
 *       name: X-Owner
 *       required: true
 *       schema:
 *         type: string
 *       description: The id of the user that is owner of the resource
 *
 *     Page:
 *       name: page
 *       in: query
 *       description: The page number to retrieve
 *       required: false
 *       schema:
 *         type: integer
 *         default: 1
 *         minimum: 1
 *     Limit:
 *       name: limit
 *       in: query
 *       description: The number of items per page
 *       required: false
 *       schema:
 *         type: integer
 *         minimum: 1
 *         default: 10
 *
 *   schemas:
 *     CreateUserResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *
 *     CreateUserRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *       required:
 *         - name
 *
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
 *           required: false
 *       required:
 *         - title
 *         - price
 *         - description
 *
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
 *           nullable: true
 *         ownerId:
 *           type: string
 *
 *     CreateCategoryRequest:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *       required:
 *         - title
 *         - description
 *
 *     CreateCategoryResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         ownerId:
 *           types: string
 *
 *     CommonError:
 *        type: object
 *        properties:
 *          error:
 *            type: string
 *        required:
 *          - error
 */
