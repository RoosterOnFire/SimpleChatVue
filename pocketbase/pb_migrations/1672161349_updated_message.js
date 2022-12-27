migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3k8abv1o8xagq07")

  collection.listRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3k8abv1o8xagq07")

  collection.listRule = null

  return dao.saveCollection(collection)
})
