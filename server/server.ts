import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import {Quote} from '../cli/commands/persistent-quote';
import { ChainId, } from '../src';

dotenv.config();
const quoter = new Quote();
let quoterInitialized: boolean = false;

quoter.init({
  chainId: ChainId.ARBITRUM_ONE,
  debug: true,
  debugJSON: false,
  router: 'alpha',
  tokenListURI: undefined
}).then(function() {
  quoterInitialized = true;
});

const app: Express = express();
const port = process.env.PORT;
app.use(express.json())

// @ts-ignore
app.get('/', function(req: Request, res: Response) {
  res.send('Express + TypeScript Server');
});

// @ts-ignore
app.post('/', async function(req: Request, res: Response) {
  console.log(req.body);

  if(quoterInitialized) {
    console.log('quoter initialized');

    try {
      const result = await quoter.run(req.body);

      const {
        routeAmounts,
        quote,
        quoteAmountFixed,
        quoteDecimals,
        quoteGasAdjusted,
        estimatedGasUsedQuoteToken,
        estimatedGasUsedUSD,
        methodParameters,
        blockNumber,
        estimatedGasUsed,
        gasPriceWei,
        simulationStatus
      } = result;

      res.send({
        routeAmounts,
        quote,
        quoteAmountFixed,
        quoteDecimals,
        quoteGasAdjusted,
        estimatedGasUsedQuoteToken,
        estimatedGasUsedUSD,
        methodParameters,
        blockNumber,
        estimatedGasUsed,
        gasPriceWei,
        simulationStatus
      });
    } catch(e: any) {
      console.log(e);
      res.send({});
    }
  } else {
    console.log('quoter not initialized');
    res.send({});
  }
});

app.listen(port, function() {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

(async () => {
  while(true) {
    try {
      const memoryUsage = process.memoryUsage();
      const heapTotal = parseInt(String(memoryUsage.heapTotal));
      const memStats = { heapUsed: ""+(parseInt(String(memoryUsage.heapUsed))/1000000).toFixed(2)+"MB", heapTotal: ""+(parseInt(String(heapTotal))/1000000).toFixed(2)+"MB" };
      console.log(JSON.stringify({memoryUsage: memStats}));
    } catch(e: any) {
      console.log(e);
    }

    await new Promise(resolve => setTimeout(resolve, 10000));
  }
})();
