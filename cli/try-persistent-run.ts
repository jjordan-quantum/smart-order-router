import {Quote} from './commands/persistent-quote';
import {
  ChainId,
} from '../src';
const quoter = new Quote();

(async () => {
  console.log('=============================================================');
  console.log('------------------- INITIALIZING QUOTER ---------------------');
  console.log('=============================================================');

  await quoter.init({
    chainId: ChainId.ARBITRUM_ONE,
    debug: true,
    debugJSON: false,
    router: 'alpha',
    tokenListURI: undefined
  });

  while(true) {
    const start = Date.now();

    console.log('=============================================================');
    console.log('--------------------- RUNNING QUOTER -----------------------');
    console.log('=============================================================');

    await quoter.run({
      tokenIn: '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
      tokenOut: '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
      amount: '20000',
      exactIn: true,
      exactOut: false,
      chainId: ChainId.ARBITRUM_ONE,
      debug: true,
      debugJSON: false,
      router: 'alpha',
      tokenListURI: undefined,
      topN: 3,
      topNTokenInOut: 2,
      topNSecondHop: 2,
      topNSecondHopForTokenAddressRaw: '',
      topNWithEachBaseToken: 2,
      topNWithBaseToken: 6,
      topNWithBaseTokenInSet: false,
      topNDirectSwaps: 2,
      maxSwapsPerPath: 3,
      minSplits: 1,
      maxSplits: 3,
      distributionPercent: 5,
    });
    const end = Date.now();

    console.log(`Quote took ${end - start}ms`);
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

})();
