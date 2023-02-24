const router = require("express").Router();
const mongodb = require("mongodb");
require("dotenv").config();
const uri = process.env.MONGO_URI;
const XLSX = require("xlsx");

module.exports = async function fonksiyon(req, res, next) {
  const { store_name } = req.body;

  try {
    const client = await mongodb.MongoClient.connect(uri, {
      maxPoolSize: 100,
      useNewUrlParser: true,
      writeConcern: { wtimeout: 3000 },
    });

    const db = client.db("ipsizcambaz");

    switch (store_name) {
      case "b2b":
        const b2bCollections = await db
          .collection("b2bproducts")
          .aggregate([
            { $unwind: "$store" },
            {
              $group: {
                _id: "$store",
                count: { $sum: 1 },
                docs: { $push: "$_id" },
              },
            },
            {
              $match: {
                _id: { $not: { $size: 0 } },
              },
            },
          ])
          .toArray();
        const b2bData = [];

        b2bCollections.forEach((item) => {
          const data = {
            id: item._id.toString(), 
            count: item.count,
            docs: item.docs.join(", "), 
          };
          b2bData.push(data);
        });

        const b2bWorksheet = XLSX.utils.json_to_sheet(b2bData);
        const b2bWorkbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(
          b2bWorkbook,
          b2bWorksheet,
          "B2B Collections"
        );
        XLSX.writeFile(b2bWorkbook, "b2b-collections.xlsx");
        
        res.json(b2bCollections);
        break;

      case "b2c":
        const b2cCollections = await db
          .collection("b2cproducts")
          .aggregate([
            { $unwind: "$store" },
            {
              $group: {
                _id: "$store",
                count: { $sum: 1 },
                docs: { $push: "$_id" },
              },
            },
            {
              $match: {
                _id: { $not: { $size: 0 } },
              },
            },
          ])
          .toArray();
          const b2cData = [];

          b2cCollections.forEach((item) => {
            const data = {
              id: item._id.toString(), 
              count: item.count,
              docs: item.docs.join(", "), 
            };
            b2cData.push(data);
          });
  
          const b2cWorksheet = XLSX.utils.json_to_sheet(b2cData);
          const b2cWorkbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(
            b2cWorkbook,
            b2cWorksheet,
            "B2B Collections"
          );
          XLSX.writeFile(b2cWorkbook, "b2c-collections.xlsx");
       

        res.json(b2cCollections);
        break;

      case "c2c":
        const c2cCollections = await db
          .collection("c2cproducts")
          .aggregate([
            { $unwind: "$store" },
            {
              $group: {
                _id: "$store",
                count: { $sum: 1 },
                docs: { $push: "$_id" },
              },
            },
            {
              $match: {
                _id: { $not: { $size: 0 } },
              },
            },
          ])
          .toArray();
          const c2cData = [];

          c2cCollections.forEach((item) => {
            const data = {
              id: item._id.toString(), 
              count: item.count,
              docs: item.docs.join(", "), 
            };
            c2cData.push(data);
          });
  
          const c2cWorksheet = XLSX.utils.json_to_sheet(c2cData);
          const c2cWorkbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(
            c2cWorkbook,
            c2cWorksheet,
            "C2C Collections"
          );
          XLSX.writeFile(c2cWorkbook, "c2c-collections.xlsx");
     
        res.json(c2cCollections);
        break;

      default:
        console.log("Olmadı");
        break;
    }

    client.close();
  } catch (error) {
    next(error);
  }
};
