import { Router } from 'express';
import { ProjectsComponent } from '@/components';
import * as jwtConfig from '@/config/middleware/jwtAuth';

/**
 * @constant {express.Router}
 */
const router: Router = Router();

router.get('/', ProjectsComponent.findAll);

router.post('/', jwtConfig.isAuthenticated, ProjectsComponent.create);

// TODO: Create a delete route

router.put('/', jwtConfig.isAuthenticated, ProjectsComponent.update);

router.delete('/', jwtConfig.isAuthenticated, ProjectsComponent.remove);

/**
 * @export {express.Router}
 */
export default router;
