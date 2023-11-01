import { describe } from '@jest/globals';
import { Cities } from '../../enums';
import { MarketReport } from './market-report';

describe('market-report', () => {
  describe('valid market report', () => {
    const marketReport = new MarketReport({
      city: Cities.Martlock,
      itemId: 1,
      sellEntries: [
        {
          price: 4,
          quantity: 2,
        },
        {
          price: 6,
          quantity: 2,
        },
      ],
      buyEntries: [
        {
          price: 2,
          quantity: 3,
        },
        {
          price: 1,
          quantity: 1,
        },
      ],
    });

    it('calculates the top price', () => {
      expect(marketReport.topBuy).toEqual(2);
      expect(marketReport.lowestSell).toEqual(4);
    });

    it('calculates the weighted average', () => {
      expect(marketReport.buyWeightedAvg).toEqual(1.75);
      expect(marketReport.sellWeightedAvg).toEqual(5);
    });
  });

  describe('order with no entries', () => {
    const marketReport = new MarketReport({
      city: Cities.Martlock,
      itemId: 1,
      sellEntries: [],
      buyEntries: [],
    });

    it('leaves the top price as null', () => {
      expect(marketReport.topBuy).toEqual(null);
      expect(marketReport.lowestSell).toEqual(null);
    });

    it('leaves the weighted average as null', () => {
      expect(marketReport.buyWeightedAvg).toEqual(null);
      expect(marketReport.sellWeightedAvg).toEqual(null);
    });
  });
});
