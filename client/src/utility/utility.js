export const updateObject = (oldObject, updatedProperties) => ({
  ...oldObject,
  ...updatedProperties,
});

export const checkValidity = (value, rules) => {
  let isValid = true;
  if (!rules) {
    return true;
  }

  if (rules.required) {
    isValid = value.trim() !== '' && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid;
  }

  return isValid;
};

// search for item in array
export const findItem = (array, id) => array.find((item) => item._id === id);

// replace item in array with an item matching by id
export const updateArray = (currentArray, updatedItem) => {
  const newArray = currentArray.map((obj) => {
    // use new object or return original obj
    const newObj = [updatedItem].find((item) => item._id === obj._id) || obj;
    return newObj;
  });
  return newArray;
};

// multiply item.price by orderAmt in cart, then add each total
export const getTotalPrice = (cart) => {
  const totalPrice = cart.map((item) => item.price * item.orderAmt);
  return totalPrice.reduce((prev, curr) => prev + curr, 0);
};

// get totalNumber of items
export const getTotalItems = (cart) => cart.reduce((a, b) => a + b.orderAmt, 0);

// Copy array
export const copyArray = (array) => JSON.parse(JSON.stringify(array));

// remove Item from array
export const removeItem = (array, id) => array.filter((item) => item._id !== id);

// stringify and store cart session in browser
export const storeLocally = (arrayName, array) => {
  const arrayString = JSON.stringify(array);
  localStorage.setItem(arrayName, arrayString);
};

export const getLocalStorage = async () => {
  // console.log(' getLocalStorage');
  const arrayString = localStorage.getItem('cart');
  // console.log('arrayString', arrayString);
  let array = [];
  if (arrayString) {
    array = JSON.parse(arrayString);
  }

  // console.log('load cart', array);
  return array;
};
