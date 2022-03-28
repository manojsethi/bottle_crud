import { mongoose } from "@typegoose/typegoose";
import HttpStatus from "http-status-codes";
import { IServiceResponse } from "../interfaces/IServiceResponse";
import BottleModel from "../models/bottel";
import {
  AddBottleViewModel,
  FetchOrDeleteBottleViewModel,
  UpdateBottleViewModel
} from "../viewmodels";
class BottleService {
  /**
   * Add new bottle record
   * @param model typeof `AddBottleViewModel`
   * @returns `IServiceResponse`
   */
  addBottle = async (model: AddBottleViewModel): Promise<IServiceResponse> => {
    try {
      let bottleModel = await BottleModel.create(model);
      if (bottleModel)
        return {
          status_code: HttpStatus.OK,
          data: bottleModel,
        };
      else
        return {
          status_code: HttpStatus.BAD_REQUEST,
          data: {
            message: "An error occured while adding new record.",
            error: "On Add Error",
          },
        };
    } catch (err) {
      return {
        status_code: HttpStatus.INTERNAL_SERVER_ERROR,
        data: {
          message: "Internal server error",
          error: "On Add Error",
        },
      };
    }
  };
  /**
   * Update bottle record
   * @param model typeof `UpdateBottleViewModel`
   * @returns `IServiceResponse`
   */
  updateBottle = async (
    model: UpdateBottleViewModel
  ): Promise<IServiceResponse> => {
    try {
      let modelToUpdate = {
        ...(model.brand && {
          brand: model.brand,
        }),
        ...(model.capacity && {
          capacity: model.capacity,
        }),
        ...(model.name && {
          name: model.name,
        }),
      };
      if (Object.keys(modelToUpdate).length <= 0) {
        return {
          status_code: HttpStatus.OK,
          data: {
            updated: true,
          },
        };
      }
      let updateResult = await BottleModel.updateOne(
        {
          _id: mongoose.Types.ObjectId(model.bottle_id),
        },
        modelToUpdate
      );
      if (updateResult && updateResult.nModified > 0)
        return {
          status_code: HttpStatus.OK,
          data: {
            updated: true,
          },
        };
      else
        return {
          status_code: HttpStatus.BAD_REQUEST,
          data: {
            message: "An error occured while updating record.",
            error: "On Update Error",
          },
        };
    } catch (err) {
      return {
        status_code: HttpStatus.INTERNAL_SERVER_ERROR,
        data: {
          message: "Internal server error",
          error: "On Update Error",
        },
      };
    }
  };

  /**
   * Delete bottle record
   * @param model typeof `FetchOrDeleteBottleViewModel`
   * @returns `IServiceResponse`
   */
  deleteBottle = async (
    model: FetchOrDeleteBottleViewModel
  ): Promise<IServiceResponse> => {
    try {
      let deleteResult = await BottleModel.deleteOne({
        _id: mongoose.Types.ObjectId(model.bottle_id),
      });
      if (
        deleteResult &&
        deleteResult?.deletedCount &&
        deleteResult?.deletedCount > 0
      )
        return {
          status_code: HttpStatus.OK,
          data: {
            deleted: true,
          },
        };
      else
        return {
          status_code: HttpStatus.BAD_REQUEST,
          data: {
            message: "An error occured while deleting record.",
            error: "On Delete Error",
          },
        };
    } catch (err) {
      return {
        status_code: HttpStatus.INTERNAL_SERVER_ERROR,
        data: {
          message: "Internal server error",
          error: "On Delete Error",
        },
      };
    }
  };

  /**
   * Fetch single bottle record
   * @param model typeof `FetchOrDeleteBottleViewModel`
   * @returns `IServiceResponse`
   */
  getBottleDetails = async (
    model: FetchOrDeleteBottleViewModel
  ): Promise<IServiceResponse> => {
    try {
      let foundRecord = await BottleModel.findOne({
        _id: mongoose.Types.ObjectId(model.bottle_id),
      });
      if (foundRecord)
        return {
          status_code: HttpStatus.OK,
          data: foundRecord,
        };
      else
        return {
          status_code: HttpStatus.BAD_REQUEST,
          data: {
            message: "Record not found.",
            error: "On Fetch Error",
          },
        };
    } catch (err) {
      return {
        status_code: HttpStatus.INTERNAL_SERVER_ERROR,
        data: {
          message: "Internal server error",
          error: "On Fetch Error",
        },
      };
    }
  };

  /**
   * Fetch all bottle records
   * @returns `IServiceResponse`
   */
  getAllBottleRecords = async (): Promise<IServiceResponse> => {
    try {
      let foundRecords = await BottleModel.find();
      if (foundRecords && foundRecords.length > 0)
        return {
          status_code: HttpStatus.OK,
          data: foundRecords,
        };
      else
        return {
          status_code: HttpStatus.OK,
          data: [],
        };
    } catch (err) {
      return {
        status_code: HttpStatus.INTERNAL_SERVER_ERROR,
        data: {
          message: "Internal server error",
          error: "On Fetch Error",
        },
      };
    }
  };
}
export default new BottleService();
