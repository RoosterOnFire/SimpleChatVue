migrate((db) => {
  const snapshot = [
    {
      "id": "_pb_users_auth_",
      "created": "2022-12-19 20:01:18.702Z",
      "updated": "2022-12-19 20:01:18.702Z",
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
    },
    {
      "id": "xer96qycyvwl8ve",
      "created": "2022-12-19 21:02:35.527Z",
      "updated": "2022-12-19 21:04:15.698Z",
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
            "min": 1,
            "max": 255,
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
    },
    {
      "id": "ybtww0on7e3fpwi",
      "created": "2022-12-19 21:06:28.470Z",
      "updated": "2022-12-19 21:06:55.769Z",
      "name": "room_users",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "1u1dq8mr",
          "name": "room_id",
          "type": "relation",
          "required": true,
          "unique": false,
          "options": {
            "maxSelect": null,
            "collectionId": "xer96qycyvwl8ve",
            "cascadeDelete": false
          }
        },
        {
          "system": false,
          "id": "bpnzwnet",
          "name": "user_id",
          "type": "relation",
          "required": true,
          "unique": false,
          "options": {
            "maxSelect": null,
            "collectionId": "_pb_users_auth_",
            "cascadeDelete": true
          }
        }
      ],
      "listRule": null,
      "viewRule": null,
      "createRule": null,
      "updateRule": null,
      "deleteRule": null,
      "options": {}
    },
    {
      "id": "af8w5417nq66otl",
      "created": "2022-12-19 21:08:39.240Z",
      "updated": "2022-12-19 21:08:39.240Z",
      "name": "room_chat_history",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "3s9woz9n",
          "name": "room_id",
          "type": "relation",
          "required": true,
          "unique": false,
          "options": {
            "maxSelect": null,
            "collectionId": "xer96qycyvwl8ve",
            "cascadeDelete": false
          }
        },
        {
          "system": false,
          "id": "puiblgxy",
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
          "id": "muz9qm9e",
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
    }
  ];

  const collections = snapshot.map((item) => new Collection(item));

  return Dao(db).importCollections(collections, true, null);
}, (db) => {
  return null;
})
