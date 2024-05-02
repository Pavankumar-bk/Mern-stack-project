// Higher-order function to catch asynchronous errors
export const catchAsyncErrors = (theFunction) => {
  return (req, res, next) => {
    // Wrap the function in a Promise to catch any asynchronous errors
    Promise.resolve(theFunction(req, res, next)).catch(next);
  };
};
