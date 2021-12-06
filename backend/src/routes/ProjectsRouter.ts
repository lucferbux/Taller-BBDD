import { Router } from 'express';
import { ProjectsComponent } from '@/components';
import * as jwtConfig from '@/config/middleware/jwtAuth';

/**
 * @constant {express.Router}
 */
const router: Router = Router();

router.get('/', ProjectsComponent.findAll);

router.post('/', jwtConfig.isAuthenticated, ProjectsComponent.create)

// TODO: 6) Create a delete and update route

/**
 * @export {express.Router}
 */
export default router;
