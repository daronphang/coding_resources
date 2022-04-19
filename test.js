var numberOfArithmeticSlices = function (nums) {
  // min of 3 elements, difference has to be equal
  const hashmap = {};
  const hashmapZero = {};
  let diff;
  let temp;
  let isNew = false;

  for (let i = 0; i < nums.length; i++) {
    isNew = false;
    for (let j = i + 1; j < nums.length; j++) {
      diff = nums[j] - nums[i];

      // diff of 0 is unique case
      if (diff === 0) {
        if (hashmapZero[nums[i]] !== undefined) {
          if (!isNew) break;
          hashmapZero[nums[i]] = hashmapZero[nums[i]] + 1;
        } else {
          hashmapZero[nums[i]] = 2;
          isNew = true;
        }
        continue;
      }

      if (hashmap[diff] === undefined) {
        hashmap[diff] = [nums[j], 2];
      } else {
        temp = hashmap[diff];
        if (temp[0] === nums[i]) {
          temp = [nums[j], temp[1] + 1];
          hashmap[diff] = temp;
        }
      }
    }
  }

  let results = 0;

  for (let key in hashmap) {
    // each key represents the diff
    // value contains number of arithmetic elements
    temp = hashmap[key];
    if (temp[1] < 3) continue;

    results += calSeq(temp[1], false);
  }

  for (let key in hashmapZero) {
    temp = hashmapZero[key];
    if (temp < 3) continue;

    results += calSeq(temp, true);
  }

  function calSeq(num, isZero) {
    let total = 1;
    let val = 2;
    let zeroTotal = 1;

    while (num > 3) {
      total += val;
      val++;
      num--;

      zeroTotal = zeroTotal * 2 + total;
    }

    if (isZero) return zeroTotal;
    else return total;
  }

  return results;
};

console.log(numberOfArithmeticSlices([2, 4, 6, 2, 8, 2, 3, 10, 2, 2, 2, 1, 0]));
