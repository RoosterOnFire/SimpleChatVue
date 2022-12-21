migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xer96qycyvwl8ve")

  collection.listRule = ""
  collection.viewRule = ""
  collection.updateRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xer96qycyvwl8ve")

  collection.listRule = null
  collection.viewRule = null
  collection.updateRule = null

  return dao.saveCollection(collection)
})
