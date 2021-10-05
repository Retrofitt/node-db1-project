const router = require('express').Router()

const Account = require('./accounts-model')

const {checkAccountPayload, checkAccountNameUnique, checkAccountId} = require('./accounts-middleware')

router.get('/', async (req, res, next) => {
  try{
    const accounts = await Account.getAll()
    res.json(accounts)
  }catch(err){
    next(err)
  }
})

router.get('/:id', checkAccountId, async (req, res, next) => {
  try{
    const account = await Account.getById(req.params.id)
    res.json(account)
  }catch(err){
    next(err)
  }
})

router.post('/',checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  try{
    const newAccount = await Account.create({name: req.name, budget: req.budget})
    res.status(201).json(newAccount)
  }catch(err){
    next(err)
  }
})

router.put('/:id', checkAccountId, checkAccountPayload, async  (req, res, next) => {
  try{
    const {id} = req.params.id
    const account = await Account.updateById(id, {name: req.name, budget: req.budget})
    res.status(200).json(account)
  }catch(err){
    next(err)
  }
})

router.delete('/:id', checkAccountId, async  (req, res, next) => {
  try{
    const deletedAccount = await Account.deleteById(req.params.id)
    res.json(deletedAccount)
  }catch (err){
    next(err)
  }
})

router.use((err, req, res, next)=>{ //eslint-disable-line
  res.status(err.status || 500).json({
    customMessage:'some error has occurred',
    message: err.message,
    stack: err.stack
  })
})

module.exports = router;
