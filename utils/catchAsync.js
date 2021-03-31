// Calling async function and catching error
module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next); // It will pass error using next to the global error handler(errorController.js)
  };
};
