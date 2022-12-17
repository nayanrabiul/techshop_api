
const formidable  = require ("formidable");



var field= {};

var file = [];

const readFile = (
  req: NextApiRequest,
  saveLocally?: boolean
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  const options: formidable.Options = {};
  if (saveLocally) {
    options.uploadDir = path.join(process.cwd(), "/public/uploaded_images");
    options.filename = (name, ext, path, form) => {
      const n = Date.now().toString() + "_" + path.originalFilename;
      file.push(n);
      return n;
    };
  }

  const form = formidable(options);
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      field = fields;
      resolve({ fields, files });
    });
  });
};
const handler: NextApiHandler = async (req, res) => {
  await readFile(req, true);
  if (req.method == "POST") {
    if (
      !field.title &&
      !field.stock &&
      !field.price &&
      !field.descriptions &&
      !file.toString()
    ) {
      res.json({ ok: "error" });
      return;
    }

    pool.getConnection(function (err, conn) {
      conn.query(
        "INSERT INTO products(title,stock,price,descriptions,images,subcategory_id) VALUES (?,?,?,?,?,?)",
        [
          field.title,
          field.stock,
          field.price,
          field.descriptions,
          file.toString(),
          field.subcategory_id,
        ],
        (err, result) => {
          res.send(result);
        }
      );
      // @ts-ignore
      pool.releaseConnection(conn);
    });
  }
  if (req.method == "PUT") {
    pool.getConnection(function (err, conn) {
      conn.query(
        "UPDATE products SET title = ?, stock=?, price = ?, descriptions = ?,subcategory_id = ? WHERE products.id = ?",
        [
          String(field.title),
          String(field.stock),
          String(field.price),
          String(field.descriptions),
          String(field.subcategory_id),
          String(field.product_id),
        ],
        (err, result) => {
          res.json({ ok: "ok" });
        }
      );
      //@ts-ignore
      pool.releaseConnection(conn);
    });
  }
};

export default handler;
