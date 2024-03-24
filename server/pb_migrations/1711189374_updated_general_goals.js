/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hxuiumkci6z22f1")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mxfcelkz",
    "name": "gpt_answer",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 2000000
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hxuiumkci6z22f1")

  // remove
  collection.schema.removeField("mxfcelkz")

  return dao.saveCollection(collection)
})
