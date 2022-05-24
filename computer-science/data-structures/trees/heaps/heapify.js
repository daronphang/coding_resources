const maxHeapify = (nums, n, i) => {
  // n is size of heap
  let left = 2 * i + 1;
  let right = 2 * i + 2;
  let largest = i;

  if (left < n && nums[left] > nums[largest]) largest = left;

  if (right < n && nums[right] > nums[largest]) largest = right;

  if (largest !== i) {
    // one of two children is largest
    // largest element gets bubbled up to A[i]
    // swap i with largest
    let temp = nums[i];
    nums[i] = nums[largest];
    nums[largest] = temp;

    maxHeapify(nums, n, largest);
  }
};

const heapSort = (nums) => {
  const n = nums.length;
  let temp;
  let smallest = Infinity;

  // build max heap
  for (let i = Math.floor((n - 1) / 2); i >= 0; i--) {
    maxHeapify(nums, n, i);
  }

  // extract element from heap one by one
  for (let i = n - 1; i > 0; i--) {
    // find smallest number
    if (nums[0] >= 0 && nums[0] < smallest) smallest = nums[0];

    // swap largest at first element with last element
    temp = nums[0];
    nums[0] = nums[i];
    nums[i] = temp;

    // heapify to sort largest element to nums[0]
    maxHeapify(nums, i, 0);
  }

  // for edge cases whereby i === 0 after maxHeapify and smallest gets bubbled up
  if (nums[0] >= 0 && nums[0] < smallest) smallest = nums[0];

  return smallest;
};
