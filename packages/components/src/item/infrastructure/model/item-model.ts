import { Injectable } from '@nestjs/common';
import {
  DataTypes,
  Model,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
  type Sequelize,
} from 'sequelize';

@Injectable()
export class ItemModel extends Model<
  InferAttributes<ItemModel>,
  InferCreationAttributes<ItemModel>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export function initItemModel(sequelize: Sequelize): typeof ItemModel {
  ItemModel.init(
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      createdAt: {
        field: 'created_at',
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        field: 'updated_at',
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      tableName: 'items',
      underscored: true,
    },
  );
  return ItemModel;
}
