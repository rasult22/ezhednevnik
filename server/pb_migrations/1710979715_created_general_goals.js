/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "hxuiumkci6z22f1",
    "created": "2024-03-21 00:08:35.842Z",
    "updated": "2024-03-21 00:08:35.842Z",
    "name": "general_goals",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "l5cod7iv",
        "name": "type",
        "type": "select",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "short",
            "middle",
            "long"
          ]
        }
      },
      {
        "system": false,
        "id": "zkxwkwmj",
        "name": "value",
        "type": "json",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSize": 2000000
        }
      },
      {
        "system": false,
        "id": "jvgv8r9k",
        "name": "user",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      }
    ],
    "indexes": [],
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
  const collection = dao.findCollectionByNameOrId("hxuiumkci6z22f1");

  return dao.deleteCollection(collection);
})
