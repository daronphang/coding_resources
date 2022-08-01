var splitArray = function (nums, m) {
  // difficult problem to come up with binary search
  // smallest largest sum is the max of nums i.e. by itself
  // largest largest sum is the sum of entire array
  // between left and right boundaries represent possible solutions
  let l = Math.max(...nums);
  let r = nums.reduce((acc, val) => acc + val, 0);
  let ans = r;

  function canSplit(largest) {
    let subarrayCount = 0;
    let sum = 0;

    // greedy approach
    for (let n of nums) {
      sum += n;
      if (sum > largest) {
        // left subarray can be further split which gives
        // a lower mid sum can be found if allowed
        subarrayCount += 1;

        // take current n as the new subarray
        sum = n;
      }
    }
    return subarrayCount + 1 <= m;
  }

  // initially assume best solution is the sum of entire array
  // take mid sum as the possible answer

  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    if (canSplit(mid)) {
      ans = mid;
      // look for smaller values
      r = mid - 1;
    } else l = mid + 1;
  }

  return ans;
};
