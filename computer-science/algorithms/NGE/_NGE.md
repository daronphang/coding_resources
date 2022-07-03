## Next Greater Element

Next greater element for an element x in an array is the first greater element on the right side. Elements for which no greater element exist, consider it to be -1.

### Stack Approach

Push element to stack if:

-   Stack is empty.
-   The current element is less than or equal to top element.

If element is greater than top element, pop stack till the element is less than or eqaul to top element.

```js
// [4, 5, 2, 25]
//  NGE is 5,25,25,-1
function NGE(arr, n) {
    const stack = [];
    const results = Array(arr.length);
    stack.push(0);
    let index = 1;

    while (stack.length > 0 && index < arr.length) {
        if (arr[index] <= arr[stack[stack.length - 1]]) {
            stack.push(index);
            index++;
        } else {
            // NGE for top stack element is current element
            while (stack.length > 0 && arr[stack[stack.length - 1]] < arr[index]) {
                results[stack.pop()] = arr[index];
            }

            if (stack.length === 0) stack.push(arr[index]);
        }
        return results;
    }

    for (let i = 0; i < results.length; i++) {
        if (!results[i]) results[i] = -1;
    }
}
```
