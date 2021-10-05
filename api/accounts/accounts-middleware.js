const Account = require('./accounts-model')

exports.checkAccountPayload = (req, res, next) => {

  const {name, budget} = req.body
  if(name === undefined || budget === undefined){
    res.status(400).json({
      message: "name and budget are required"
    })
  }else if(typeof name != 'string'){
    res.status(400).json({
      message: "name of account must be a string"
    })
  }else if(name.trim().length < 3 || name.trim().length > 100){
    res.status(400).json({
      message: "name of account must be between 3 and 100"
    })
  }else if(typeof budget != "number"){
    res.status(400).json({
      message: "budget of account must be a number"
    })
  }else if(budget < 0 || budget > 1000000){
    res.status(400).json({
      message: "budget of account is too large or too small"
    })
  }else{
    req.name = name.trim()
    req.budget = budget
    next()
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  const {name} = req.body
  const accounts = await Account.getAll()
  if(accounts.indexOf(name.trim()) === -1){
    next()
  }else{
    res.status(400).json({
      message: "Name is taken"
    })
  }
}

exports.checkAccountId = async (req, res, next) => {
  try{
    const account = await Account.getById(req.params.id)
    if(!account){
      res.status(404).json({
        message: 'Account not found'
      })
    }else{
      next()
    }
  }catch (err){
    res.status(500).json({
      message:'An error has occurred'
    })
  }
}
