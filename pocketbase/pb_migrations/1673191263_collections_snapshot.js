migrate((db) => {
  const snapshot = [
    {
      "id": "xer96qycyvwl8ve",
      "created": "2022-12-19 21:02:35.527Z",
      "updated": "2023-01-08 15:20:44.416Z",
      "name": "rooms",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "mij0bcw4",
          "name": "room_name",
          "type": "text",
          "required": true,
          "unique": true,
          "options": {
            "min": 4,
            "max": 16,
            "pattern": ""
          }
        }
      ],
      "listRule": "",
      "viewRule": "",
      "createRule": "",
      "updateRule": null,
      "deleteRule": null,
      "options": {}
    },
    {
      "id": "3k8abv1o8xagq07",
      "created": "2022-12-27 16:14:29.686Z",
      "updated": "2023-01-08 14:55:02.849Z",
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
            "cascadeDelete": true
          }
        },
        {
          "system": false,
          "id": "kqscgqd7",
          "name": "username",
          "type": "text",
          "required": true,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
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
      "listRule": "",
      "viewRule": "",
      "createRule": "",
      "updateRule": null,
      "deleteRule": null,
      "options": {}
    },
    {
      "id": "_pb_users_auth_",
      "created": "2023-01-08 14:50:23.989Z",
      "updated": "2023-01-08 14:55:02.849Z",
      "name": "users",
      "type": "auth",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "users_name",
          "name": "name",
          "type": "text",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "users_avatar",
          "name": "avatar",
          "type": "file",
          "required": false,
          "unique": false,
          "options": {
            "maxSelect": 1,
            "maxSize": 5242880,
            "mimeTypes": [
              "image/jpg",
              "image/jpeg",
              "image/png",
              "image/svg+xml",
              "image/gif"
            ],
            "thumbs": null
          }
        },
        {
          "system": false,
          "id": "dtqbagmw",
          "name": "rooms",
          "type": "relation",
          "required": false,
          "unique": false,
          "options": {
            "maxSelect": null,
            "collectionId": "xer96qycyvwl8ve",
            "cascadeDelete": false
          }
        }
      ],
      "listRule": "id = @request.auth.id",
      "viewRule": "id = @request.auth.id",
      "createRule": "",
      "updateRule": "id = @request.auth.id",
      "deleteRule": "id = @request.auth.id",
      "options": {
        "allowEmailAuth": true,
        "allowOAuth2Auth": true,
        "allowUsernameAuth": true,
        "exceptEmailDomains": null,
        "manageRule": null,
        "minPasswordLength": 8,
        "onlyEmailDomains": null,
        "requireEmail": false
      }
    }
  ];

  const collections = snapshot.map((item) => new Collection(item));

  return Dao(db).importCollections(collections, true, null);
}, (db) => {
  return null;
})
