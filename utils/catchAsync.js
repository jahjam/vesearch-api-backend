// to avoid writing multiple identical catch blocks we can use a function like this to catch the async function. As async functions are promises which will either return a success or rejection, we can capture that response within a function, and return that function within another function, that way, if an error is thrown we can simply pass that error on to a catch method. This method demonstates closures as it shows that the function passed into catchAsync function is enclosed within the returned function and 'remembered'.
/*
http request
catchAsync(async function) 
return function(req, res, next)
async function(req, res, next)
success = send response 
fail = .catch(err => next(err))
*/
module.exports = fn => (req, res, next) => {
  fn(req, res, next).catch(next);
};
