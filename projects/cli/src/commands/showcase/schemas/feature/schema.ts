/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface FeatureConfig {
  /**
   * Name of the component.
   */
  name?: string;
  /**
   * Id of the component.
   */
  id?: string;
  /**
   * Category of the component.
   */
  category?: string;
  /**
   * Relative file path of readme file.
   */
  readmePath?: string;
  /**
   * Relative file path of entry point used in API generation.
   */
  entryPointPath?: string;
  [k: string]: unknown;
}