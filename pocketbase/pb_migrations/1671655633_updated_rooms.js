migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xer96qycyvwl8ve")

  collection.listRule = null
  collection.updateRule = null

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xer96qycyvwl8ve")

  collection.listRule = ""
  collection.updateRule = ""

  return dao.saveCollection(collection)
})
