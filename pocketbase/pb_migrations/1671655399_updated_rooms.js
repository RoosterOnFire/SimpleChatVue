migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xer96qycyvwl8ve")

  collection.createRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xer96qycyvwl8ve")

  collection.createRule = null

  return dao.saveCollection(collection)
})
