import { type Cities } from '../../enums';
import { type MarketEntry } from './market-entry';

export interface MarketReportProp {
  id?: number;
  city: Cities;
  itemId: number;
  buyEntries: MarketEntry[];
  sellEntries: MarketEntry[];
  buyWeightedAvg?: number | null;
  sellWeigthedAvg?: number | null;
  topBuyOrder?: number | null;
  lowestSellOrder?: number | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export class MarketReport {
  public readonly id?: number;
  public readonly city: Cities;
  public readonly itemId: number;
  public readonly buyEntries: MarketEntry[];
  public readonly sellEntries: MarketEntry[];
  public readonly buyWeightedAvg: number | null;
  public readonly sellWeightedAvg: number | null;
  public readonly topBuyOrder?: number | null;
  public readonly lowestSellOrder?: number | null;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;

  constructor(props: MarketReportProp) {
    this.id = props.id ?? 0;

    this.city = props.city;
    this.itemId = props.itemId;

    this.buyEntries = props.buyEntries;
    this.sellEntries = props.sellEntries;

    this.buyWeightedAvg =
      props.buyWeightedAvg ??
      MarketReport.calculateWeightedAverage(props.buyEntries);
    this.sellWeightedAvg =
      props.sellWeigthedAvg ??
      MarketReport.calculateWeightedAverage(props.sellEntries);

    this.topBuyOrder =
      props.topBuyOrder ?? MarketReport.calculateTopOrder(props.buyEntries);

    this.lowestSellOrder =
      props.lowestSellOrder ??
      MarketReport.calculateLowestOrder(props.sellEntries);

    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
  }

  private static calculateWeightedAverage(
    entries: MarketEntry[],
  ): number | null {
    const { numerator, denominator } = entries.reduce(
      (acc, cur) => {
        return {
          numerator: acc.numerator + cur.price * cur.quantity,
          denominator: acc.denominator + cur.quantity,
        };
      },
      {
        numerator: 0,
        denominator: 0,
      },
    );

    if (denominator === 0) return null;

    return numerator / denominator;
  }

  private static calculateTopOrder(entries: MarketEntry[]): number | null {
    const topOrder = entries.reduce((acc, cur) => {
      return Math.max(acc, cur.price);
    }, 0);

    return topOrder === 0 ? null : topOrder;
  }

  private static calculateLowestOrder(entries: MarketEntry[]): number | null {
    const lowestOrder = entries.reduce(
      (acc, cur) => (acc === 0 ? cur.price : Math.min(acc, cur.price)),
      0,
    );
    return lowestOrder === 0 ? null : lowestOrder;
  }
}
