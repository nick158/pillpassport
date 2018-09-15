function log(error){
  if (error){
    console.log(error)
  }
  else{
    console.log("Write success to database")
  }
}

module.exports = log;
