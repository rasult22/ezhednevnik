/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "i290ekfrykj1krs",
    "created": "2024-03-19 07:10:00.030Z",
    "updated": "2024-03-19 07:10:00.030Z",
    "name": "diary_years_created",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "qnhc1j4l",
        "name": "year",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
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
  const collection = dao.findCollectionByNameOrId("i290ekfrykj1krs");

  return dao.deleteCollection(collection);
})
