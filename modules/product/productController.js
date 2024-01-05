const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const Person = require("./productService");
const validationhandler = require("../../utility/achievesrp");

router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    // const productName = req.body.productName;
    // const productDescription = req.body.productDescription;
    // const rate = req.body.rate;

    // const imageBuffer = req.file.buffer;

    const data = req.body;
    // console.log("VODY----", data);
    const resp = await Person.createProduct(
      // productName:"jdcsd",
      // productDescription,
      // rate,
      // image: imageBuffer,
      data
    );
    

    res.status(200).json({
      data: resp,
      message: "Product created successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(validationhandler(err));
  }
});

router.get("/", async (req, res) => {
  try {
    const rest = await Person.getAllProducts();
    // console.log(rest);
    res.status(200).json({ data: rest, message: "success" });
  } catch (err) {
    res.status(500).json(validationhandler(err));
  }
});

router.get("/productdetails/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const rest = await Person.getById(id);
    res.status(200).json({ data: rest, message: "success" });
  } catch (err) {
    res.status(500).json(validationhandler(err));
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const resp = await Person.deleteOne(req.params.id);
    res.status(200).json({ data: resp, message: "successfully deleted" });
  } catch (err) {
    res.status(500).json(validationhandler(err));
  }
});

router.put("/:id", async (req, res) => {
  try {
    const posts = await Person.updateData(req.params.id, req.body);
    res.status(200).json({ data: posts, message: "updated successfully" });
  } catch (err) {
    res.status(500).json(validationhandler(err));
  }
});

module.exports = router;
