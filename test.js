var maxProfit = function (k, prices) {
  // kadane algorithm
  // find first maximum subarray
  // then find subsequent ones by removing till ith index of first

  if (prices.length < 2 || k === 0) return 0;

  let curProfit;
  let maxCurProfit;
  let finalProfit = 0;
  let priceDiff;
  let tempStart;
  let start;
  let end;

  // record length of max subarray for each iteration
  const dp = [];
  let dpIndex;

  for (let i = 0; i < k; i++) {
    start = 0;
    end = 0;
    maxCurProfit = 0;
    curProfit = 0;
    tempStart = 0;
    j = 1;
    dpIndex = i;

    while (j < prices.length) {
      if (prices[j] === -1) {
        j += dp[dpIndex] + 2;
        start = j;
        curProfit = 0;
        dpIndex++;
        continue;
      }

      priceDiff = prices[j] - prices[j - 1];

      if (priceDiff > 0) {
        curProfit += priceDiff;
      } else {
        if (prices[j] <= prices[start]) {
          start = j;
          curProfit = 0;
        } else {
          curProfit += priceDiff;
        }
      }

      if (curProfit > maxCurProfit) {
        maxCurProfit = curProfit;
        end = j;
        tempStart = start;
      }

      j++;
    }

    // all trending down, no positive gain found
    if (!maxCurProfit) return finalProfit;

    finalProfit += maxCurProfit;
    dp[i + 1] = end - tempStart;
    for (let i = tempStart; i <= end; i++) prices[i] = -1;
  }

  return finalProfit;
};

console.log(
  maxProfit(3, [3, 2, 6, 5, 0, 3, 10, 5, 4, 0, 2, 20, 11, 3, 5, 10, 7, 6])
);
