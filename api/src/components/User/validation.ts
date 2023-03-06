import * as Joi from "@hapi/joi";
import Validation from "@/components/validation";
import { IUserModel } from "./model";

/**
 * @export
 * @class UserValidation
 * @extends Validation
 */
class UserValidation extends Validation {
  /**
   * @param {IUserModel} params
   * @returns {Joi.ValidationResult<IUserModel >}
   * @memberof UserValidation
   */
  createUser(params: IUserModel): Joi.ValidationResult<IUserModel> {
    const schema: Joi.ObjectSchema = Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
        })
        .required(),
    });

    return schema.validate(params);
  }

  /**
   * @param {{ id: string }} body
   * @returns {Joi.ValidationResult<{ id: string }>}
   * @memberof UserValidation
   */
  getUser(body: { id: string }): Joi.ValidationResult<{
    id: string;
  }> {
    const schema: Joi.ObjectSchema = Joi.object().keys({
      id: this.customJoi.objectId().required(),
    });

    return schema.validate(body);
  }

  /**
   * @param {{ id: string }} body
   * @returns {Joi.ValidationResult<{ id: string }>}
   * @memberof UserValidation
   */
  removeUser(body: { id: string }): Joi.ValidationResult<{
    id: string;
  }> {
    const schema: Joi.ObjectSchema = Joi.object().keys({
      id: this.customJoi.objectId().required(),
    });

    return schema.validate(body);
  }
}

export default new UserValidation();
