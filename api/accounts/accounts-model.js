const db = require('../../data/db-config')

const getAll = () => {
  return db("accounts")
}

const getById = id => {
  return db("accounts")
    .where('id', id)
    .first()
}

const create = (account) => {
  return db("accounts")
    .insert(account)
    .then(ids =>{
      return getById(ids[0])
    })

}

const updateById = async (id, account) => {
  await db("accounts")
    .update(account)
    .where('id', id)
  return getById(id)
}

const deleteById = async (id) => {
  const deleted = await getById(id)
  await db("accounts")
    .where('id', id)
    .delete()
  return deleted
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
