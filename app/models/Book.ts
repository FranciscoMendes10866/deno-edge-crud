import { DataTypes, Model } from "denodb";

export enum BookStatus {
  AVAILABLE = "Available",
  IN_PROCESS = "InProcess",
  NOT_AVAILABLE = "NotAvailable",
  DAMAGED = "Damaged",
  MISSING = "Missing",
}

export default class Book extends Model {
  static table = "books";
  static timestamps = true;

  static fields = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      length: 25,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      length: 100,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      length: 100,
    },
  };

  static defaults = {
    status: BookStatus.IN_PROCESS,
  };
}
