migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3k8abv1o8xagq07")

  collection.viewRule = ""
  collection.createRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3k8abv1o8xagq07")

  collection.viewRule = null
  collection.createRule = null

  return dao.saveCollection(collection)
})
