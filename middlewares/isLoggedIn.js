const isLoggedIn=(req,res,next)=>{
  if(!req.isAuthenticated()){
    req.session.redirectUrl=req.originalUrl;
    req.flash("error","you have to logged in first")
    return res.redirect("/login")
  }
  next()
}

const storeRedirUrl=(req,res,next)=>{
  res.locals.redirectUrl=req.session.redirectUrl
  next()
}
module.exports={isLoggedIn,storeRedirUrl}