import * as Joi from '@hapi/joi';
import AboutMeModel, { IProjectsModel } from './model';
import ProjectsValidation from './validation';
import { IProjectsService } from './interface';
import { Types } from 'mongoose';

/**
 * @export
 * @implements {IProjectsModelService}
 */
const ProjectsService: IProjectsService = {
    /**
     * @returns {Promise < IProjectsModel[] >}
     * @memberof ProjectsService
     */
    async findAll(): Promise<IProjectsModel[]> {
        try {
            return await AboutMeModel.find({});
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {string} id
     * @returns {Promise < IProjectsModel >}
     * @memberof ProjectsService
     */
    async findOne(id: string): Promise<IProjectsModel> {
        try {
            const validate: Joi.ValidationResult<{
                id: string;
            }> = ProjectsValidation.getProject({
                id,
            });

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            return await AboutMeModel.findOne(
                {
                    _id: Types.ObjectId(id),
                },
                {
                    password: 0,
                }
            );
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {IProjectsModel} user
     * @returns {Promise < IProjectsModel >}
     * @memberof ProjectsService
     */
    async insert(body: IProjectsModel): Promise<IProjectsModel> {
        try {
            const validate: Joi.ValidationResult<IProjectsModel> = ProjectsValidation.createProject(body);

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            const user: IProjectsModel = await AboutMeModel.create(body);

            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {string} id
     * @returns {Promise < IProjectsModel >}
     * @memberof ProjectsService
     */
    async remove(id: string): Promise<IProjectsModel> {
        try {
            const validate: Joi.ValidationResult<{
                id: string;
            }> = ProjectsValidation.removeProject({
                id,
            });

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            const user: IProjectsModel = await AboutMeModel.findOneAndRemove({
                _id: Types.ObjectId(id),
            });

            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    },
};

export default ProjectsService;
