migrate((db) => {
  const collection = new Collection({
    "id": "3k8abv1o8xagq07",
    "created": "2022-12-27 16:14:29.686Z",
    "updated": "2022-12-27 16:14:29.686Z",
    "name": "message",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "xjudbgpx",
        "name": "room_id",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "collectionId": "xer96qycyvwl8ve",
          "cascadeDelete": false
        }
      },
      {
        "system": false,
        "id": "jdddesk6",
        "name": "user_id",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false
        }
      },
      {
        "system": false,
        "id": "ymwcqxyp",
        "name": "message",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": 0,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("3k8abv1o8xagq07");

  return dao.deleteCollection(collection);
})
