import {
  DataTypes,
  Model,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
  type Sequelize,
} from 'sequelize';
import { Cities } from '../../../enums';
import { type MarketEntry } from '../../domain/market-entry';

export class MarketReportModel extends Model<
  InferAttributes<MarketReportModel>,
  InferCreationAttributes<MarketReportModel>
> {
  declare id: CreationOptional<number>;
  declare itemId: number;
  declare city: Cities;
  declare buyEntries: MarketEntry[];
  declare sellEntries: MarketEntry[];
  declare topBuy: number;
  declare lowestSell: number;
  declare buyWeightedAverage: number;
  declare sellWeightedAverage: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export function initMarketReportModel(
  sequelize: Sequelize,
): typeof MarketReportModel {
  MarketReportModel.init(
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      itemId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'items',
          key: 'id',
        },
      },
      city: {
        allowNull: false,
        type: DataTypes.ENUM(...Object.values(Cities)),
      },
      buyEntries: {
        allowNull: false,
        type: DataTypes.JSONB,
      },
      sellEntries: {
        allowNull: false,
        type: DataTypes.JSONB,
      },
      topBuy: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      lowestSell: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      buyWeightedAverage: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      sellWeightedAverage: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      timestamps: true,
      sequelize,
      tableName: 'market_reports',
      underscored: true,
    },
  );
  return MarketReportModel;
}
