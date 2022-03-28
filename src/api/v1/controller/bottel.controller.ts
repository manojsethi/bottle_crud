import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";
import { IAPIResponse } from "../interfaces/IAPIResponse";
import Utility, { ValidationResult } from "../utils/common";
import {
  AddBottleViewModel,
  FetchOrDeleteBottleViewModel,
  UpdateBottleViewModel
} from "../viewmodels";
import bottleServices from "./bottle.services";

class BottleController {
  /**
   * @swagger
   *
   * /bottle:
   *   post:
   *     tags:
   *      - Bottle
   *     summary: Request to add a bottle.
   *     description: Request to add a bottle.
   *     requestBody:
   *      content:
   *        application/json:
   *          schema:
   *            name: Bottle
   *            required: true
   *            properties:
   *             name:
   *              type: string
   *              required: true
   *             capacity:
   *              type: number
   *              required: true
   *             brand:
   *              type: string
   *              required: true
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Request Successful
   *         content:
   *            application/json:
   *              example:
   *                status_code: 200
   *                success: true
   *                data: Bottle
   *       400:
   *         description: Request Failed
   *         content:
   *            application/json:
   *              example:
   *                status_code: 500
   *                succes: false
   *                errors:
   *                  error:
   *                      "any error"
   *                  message:
   *                      "any message"
   *       500:
   *         description: Request Failed
   *         content:
   *            application/json:
   *              example:
   *                status_code: 500
   *                succes: false
   *                errors:
   *                  error:
   *                      "any error"
   *                  message:
   *                      "any message"
   *
   */
  addBottle = async (
    req: Request,
    res: Response<IAPIResponse>,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        AddBottleViewModel,
        req.body
      );

      if (conversionResult && conversionResult.error) {
        return res.status(HttpStatus.BAD_REQUEST).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error,
        });
      } else {
        let model: AddBottleViewModel =
          conversionResult.data as AddBottleViewModel;

        let bottleResult = await bottleServices.addBottle(model);
        if (bottleResult && bottleResult.status_code === HttpStatus.OK)
          return res.status(bottleResult.status_code).send({
            status_code: bottleResult.status_code,
            success: true,
            data: bottleResult.data,
          });
        else
          return res.status(bottleResult.status_code).send({
            status_code: bottleResult.status_code,
            success: false,
            errors: bottleResult.data,
          });
      }
    } catch (error) {
      next(error);
    }
  };
  /**
   * @swagger
   *
   * /bottle:
   *   put:
   *     tags:
   *      - Bottle
   *     summary: Request to update a bottle.
   *     description: Request to update a bottle.
   *     requestBody:
   *      content:
   *        application/json:
   *          schema:
   *            name: Bottle
   *            required: true
   *            properties:
   *             bottle_id:
   *              type: string
   *              required: true
   *             name:
   *              type: string
   *              required: false
   *             capacity:
   *              type: number
   *              required: false
   *             brand:
   *              type: string
   *              required: false
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Request Successful
   *         content:
   *            application/json:
   *              example:
   *                status_code: 200
   *                success: true
   *                data:
   *                  updated:
   *                    true
   *       400:
   *         description: Request Failed
   *         content:
   *            application/json:
   *              example:
   *                status_code: 400
   *                succes: false
   *                errors:
   *                  error:
   *                      "any error"
   *                  message:
   *                      "any message"
   *
   *       500:
   *         description: Request Failed
   *         content:
   *            application/json:
   *              example:
   *                status_code: 500
   *                succes: false
   *                errors:
   *                  error:
   *                      "any error"
   *                  message:
   *                      "any message"
   *
   */
  updateBottle = async (
    req: Request,
    res: Response<IAPIResponse>,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        UpdateBottleViewModel,
        req.body
      );

      if (conversionResult && conversionResult.error) {
        return res.status(HttpStatus.BAD_REQUEST).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error,
        });
      } else {
        let model: UpdateBottleViewModel =
          conversionResult.data as UpdateBottleViewModel;

        let bottleResult = await bottleServices.updateBottle(model);
        if (bottleResult && bottleResult.status_code === HttpStatus.OK)
          return res.status(bottleResult.status_code).send({
            status_code: bottleResult.status_code,
            success: true,
            data: bottleResult.data,
          });
        else
          return res.status(bottleResult.status_code).send({
            status_code: bottleResult.status_code,
            success: false,
            errors: bottleResult.data,
          });
      }
    } catch (error) {
      next(error);
    }
  };
  /**
   * @swagger
   *
   * /bottle:
   *   delete:
   *     tags:
   *      - Bottle
   *     summary: Request to delete bottle record.
   *     description: Request to delete bottle record.
   *     requestBody:
   *      content:
   *        application/json:
   *          schema:
   *            name: Bottle
   *            required: true
   *            properties:
   *             bottle_id:
   *              type: string
   *              required: true
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Request Successful
   *         content:
   *            application/json:
   *              example:
   *                status_code: 200
   *                success: true
   *                data:
   *                  deleted:
   *                     true
   *       400:
   *         description: Request Failed
   *         content:
   *            application/json:
   *              example:
   *                status_code: 400
   *                succes: false
   *                errors:
   *                  error:
   *                      "any error"
   *                  message:
   *                      "any message"
   *
   *       500:
   *         description: Request Failed
   *         content:
   *            application/json:
   *              example:
   *                status_code: 500
   *                succes: false
   *                errors:
   *                  error:
   *                      "any error"
   *                  message:
   *                      "any message"
   *
   */

  deleteBottle = async (
    req: Request,
    res: Response<IAPIResponse>,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        FetchOrDeleteBottleViewModel,
        req.body
      );

      if (conversionResult && conversionResult.error) {
        return res.status(HttpStatus.BAD_REQUEST).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error,
        });
      } else {
        let model: FetchOrDeleteBottleViewModel =
          conversionResult.data as FetchOrDeleteBottleViewModel;

        let bottleResult = await bottleServices.deleteBottle(model);
        if (bottleResult && bottleResult.status_code === HttpStatus.OK)
          return res.status(bottleResult.status_code).send({
            status_code: bottleResult.status_code,
            success: true,
            data: bottleResult.data,
          });
        else
          return res.status(bottleResult.status_code).send({
            status_code: bottleResult.status_code,
            success: false,
            errors: bottleResult.data,
          });
      }
    } catch (error) {
      next(error);
    }
  };

  /**
   * @swagger
   *
   * /bottle:
   *   get:
   *     tags:
   *      - Bottle
   *     summary: Request to get all bottle records.
   *     description: Request to get all bottle records.
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Request Successful
   *         content:
   *            application/json:
   *              example:
   *                status_code: 200
   *                success: true
   *                data:
   *                - name: nameofbottle1
   *                  _id: 0ss000s0sjdjkljkldj,
   *                  brand: brandname1
   *                  capacity: 1
   *                - name: nameofbottle2
   *                  _id: 0ss000s0sjdjkljkldj,
   *                  brand: brandname2
   *                  capacity: 2
   *       400:
   *         description: Request Failed
   *         content:
   *            application/json:
   *              example:
   *                status_code: 400
   *                succes: false
   *                errors:
   *                  error:
   *                      "any error"
   *                  message:
   *                      "any message"
   *
   *       500:
   *         description: Request Failed
   *         content:
   *            application/json:
   *              example:
   *                status_code: 500
   *                succes: false
   *                errors:
   *                  error:
   *                      "any error"
   *                  message:
   *                      "any message"
   *
   */

  getBottlesList = async (
    req: Request,
    res: Response<IAPIResponse>,
    next: NextFunction
  ) => {
    try {
      let bottleResult = await bottleServices.getAllBottleRecords();
      if (bottleResult && bottleResult.status_code === HttpStatus.OK)
        return res.status(bottleResult.status_code).send({
          status_code: bottleResult.status_code,
          success: true,
          data: bottleResult.data,
        });
      else
        return res.status(bottleResult.status_code).send({
          status_code: bottleResult.status_code,
          success: false,
          errors: bottleResult.data,
        });
    } catch (error) {
      next(error);
    }
  };

  /**
   * @swagger
   *
   * /bottle/{bottle_id}:
   *   get:
   *     tags:
   *      - Bottle
   *     summary: Request to get single bottle record.
   *     description: Request to get single bottle record.
   *     parameters:
   *        - in: path
   *          name: bottle_id
   *          required: true
   *          type: string
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Request Successful
   *         content:
   *            application/json:
   *              example:
   *                status_code: 200
   *                success: true
   *                data:
   *                 name: nameofbottle1
   *                 _id: 0ss000s0sjdjkljkldj,
   *                 brand: brandname1
   *                 capacity: 1
   *       400:
   *         description: Request Failed
   *         content:
   *            application/json:
   *              example:
   *                status_code: 400
   *                succes: false
   *                errors:
   *                  error:
   *                      "any error"
   *                  message:
   *                      "any message"
   *
   *       500:
   *         description: Request Failed
   *         content:
   *            application/json:
   *              example:
   *                status_code: 500
   *                succes: false
   *                errors:
   *                  error:
   *                      "any error"
   *                  message:
   *                      "any message"
   *
   */

  getBottleDetails = async (
    req: Request,
    res: Response<IAPIResponse>,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        FetchOrDeleteBottleViewModel,
        JSON.parse(`{"bottle_id":"${req.params.bottle_id}"}`)
      );

      if (conversionResult && conversionResult.error) {
        return res.status(HttpStatus.BAD_REQUEST).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error,
        });
      } else {
        let model: FetchOrDeleteBottleViewModel =
          conversionResult.data as FetchOrDeleteBottleViewModel;

        let bottleResult = await bottleServices.getBottleDetails(model);
        if (bottleResult && bottleResult.status_code === HttpStatus.OK)
          return res.status(bottleResult.status_code).send({
            status_code: bottleResult.status_code,
            success: true,
            data: bottleResult.data,
          });
        else
          return res.status(bottleResult.status_code).send({
            status_code: bottleResult.status_code,
            success: false,
            errors: bottleResult.data,
          });
      }
    } catch (error) {
      next(error);
    }
  };
}
export default new BottleController();
