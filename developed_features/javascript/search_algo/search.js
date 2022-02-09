  const primitiveValues = ["testing", "hello", "world"];
  const nestedArrays = [
    ["test", "hello", "world"],
    ["one", "two"],
  ];
  const arrayObjects = [
    {
      key1: "test",
      key2: ["one", "two", "three", "eight"],
      key3: {
        key4: "world",
      },
      key5: null,
    },
    {
      key6: "awesome",
      key7: ["five", "six", "one", "ten"],
      key8: {
        key9: "this is a test!",
      },
      key10: null,
    },
  ];

 const handleSearch = (input, products) => {
    // returns either an array of primitive values or objects
    const regEx = new RegExp(input, "i");

    if (!input) {
      return [];
    }

    // Filters original array based on user input
    const matchedValues = [];

    products.forEach((item) => {
      if (!item) {
        // if null, to continue with next iteration
        return;
      }
      if (typeof item !== "object") {
        // For arrays containing primitive values only
        const result = regEx.test(item);
        if (result) {
          matchedValues.push(item);
        }
      } else if (Array.isArray(item)) {
        const results = handleSearch(input, item);
        matchedValues.push(...results);
      } else {
        // item is an object
        Object.keys(item).some((key) => {
          if (!item[key]) {
            return false;
          }
          if (typeof item[key] !== "object") {
            // object value is primitive
            const result = regEx.test(item[key]);
            if (result) {
              // break out of key iteration and continue with next item
              matchedValues.push(item);
              return true;
            }
          } else {
            // If value is an array or nested object, to call recursive fn
            const results = nestedSearch(input, item[key]);
            if (results) {
              matchedValues.push(item);
              return true;
            }
          }
          return false;
        });
      }
    });
    return matchedValues;
  };

  const nestedSearch = (input, nestedObj) => {
    // Handler for iterating values of an object
    // nestedObj can be an object or an array
    // Will stop nested recursion if first value returns true
    // returns true or false
    const regEx = new RegExp(input, "i");
    let boolResult;

    if (!nestedObj) return false;

    if (Array.isArray(nestedObj)) {
      for (let i = 0; i < nestedObj.length; i += 1) {
        if (typeof nestedObj[0] !== "object") {
          // iterating through primitive values
          const result = regEx.test(nestedObj[i]);
          if (result) {
            boolResult = true;
            break;
          }
        } else {
          // if nested value is an array, to call recursively
          const result = nestedSearch(input, nestedObj[i]);
          if (result) {
            boolResult = true;
            break;
          }
        }
      }
    } else {
      // nestedObj is an object
      Object.keys(nestedObj).some((key) => {
        if (typeof nestedObj[key] !== "object") {
          // iterating through primitive values
          const result = regEx.test(nestedObj[key]);
          if (result) {
            boolResult = true;
            return true;
          }
        } else {
          const result = nestedSearch(input, nestedObj[key]);
          if (result) {
            boolResult = true;
            return true;
          }
        }
        // No matched values in nested object values
        return false;
      });
    }
    return boolResult;
  };
