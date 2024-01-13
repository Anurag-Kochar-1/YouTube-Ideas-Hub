import { errors,  } from "@vinejs/vine";

export class CustomErrorReporter {
  /**
   * A flag to know if one or more errors have been
   * reported
   */
  hasErrors = false;

  /**
   * A collection of errors. Feel free to give accurate types
   * to this property
   */
  errors:  Record<string, string> = {};

  /**
   * VineJS call the report method
   */
  report(message: any, rule: any, field: any, meta: any): void {
    this.hasErrors = true;

    /**
     * Collecting errors as per the JSONAPI spec
     */

    this.errors[field.wildCardPath] = message;
  }

  /**
   * Creates and returns an instance of the
   * ValidationError class
   */
  createError() {
    return new errors.E_VALIDATION_ERROR(this.errors);
  }
}
