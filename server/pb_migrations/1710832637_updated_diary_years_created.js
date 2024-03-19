/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i290ekfrykj1krs")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ryvoui7u",
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
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i290ekfrykj1krs")

  // remove
  collection.schema.removeField("ryvoui7u")

  return dao.saveCollection(collection)
})
