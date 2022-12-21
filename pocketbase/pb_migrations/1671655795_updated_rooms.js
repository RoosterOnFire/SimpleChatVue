migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xer96qycyvwl8ve")

  collection.listRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xer96qycyvwl8ve")

  collection.listRule = null

  return dao.saveCollection(collection)
})
