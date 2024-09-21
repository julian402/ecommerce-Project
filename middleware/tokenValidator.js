async function tokenValidator(req, res, next) {
  if (req.rawHeaders.includes("Authorization")) {
    next();
  } else {
    return res.status(401).json({message:'you need login first'});
  }
}

export default tokenValidator;
