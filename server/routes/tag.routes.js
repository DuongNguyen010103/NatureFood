import express from 'express';
import TagController from '../controllers/tag.controllers.js';


const router = express.Router();

router.get('/all', TagController.getAll);
router.get('/:id', TagController.getProductsByTagId);

router.post('/', TagController.createTags);

router.put('/:productId', TagController.addTagsToProduct);

router.delete('/:id', TagController.deleteTag);
export default router;