var largestRectangleArea = function (heights) {
  // use concepts of stack and next smaller element
  // find NSE for left and right marker for each bar
  const NSEL = Array(heights.length);
  const NSER = Array(heights.length);
  const stack = [];
  let area = 0;
  let maxArea = 0;

  // NSER
  for (let i = 0; i < heights.length; i++) {
    while (stack.length > 0 && heights[i] < heights[stack[stack.length - 1]]) {
      NSER[stack.pop()] = i;
    }
    stack.push(i);
  }

  // check remaining stack
  while (stack.length > 0) {
    NSER[stack.pop()] = heights.length;
  }

  // NSEL
  for (let i = heights.length - 1; i >= 0; i--) {
    while (stack.length > 0 && heights[i] < heights[stack[stack.length - 1]]) {
      NSEL[stack.pop()] = i + 1;
    }
    stack.push(i);
  }

  // check remaining stack
  while (stack.length > 0) {
    NSEL[stack.pop()] = 0;
  }

  for (let i = 0; i < heights.length; i++) {
    area = heights[i] * (NSER[i] - NSEL[i]);
    if (area > maxArea) maxArea = area;
  }

  return maxArea;
};
