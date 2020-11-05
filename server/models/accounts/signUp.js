/* eslint-disable camelcase */
const aws = require("aws-sdk");
const sharp = require("sharp");
const { hash, compare } = require("bcryptjs");
const uuid_generate = require("uuid");
const pool = require("../../database/db");

aws.config = new aws.Config();
aws.config.accessKeyId = "AKIAWQYC7JAF2DDUN2DM";
aws.config.secretAccessKey = "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";
aws.config.region = "us-east-2";

const s3 = new aws.S3();

exports.signUp = async (req) => {
  const { person_name, password } = req.body;

  // 1. Check if the user exist
  const checkDB = await pool.query(
    `SELECT person_name FROM person WHERE person_name = '${person_name}'`
  );
  console.log("DB", checkDB);
  const doesUserExist = checkDB.rows[0];

  if (doesUserExist !== undefined)
    throw new Error(`USER NAME " ${person_name} " IS TAKEN.`);
  console.log(doesUserExist);
  // 2. If not user exist already, hash the password
  const hashedPassword = await hash(password, 10);

  // 3. Check if an image is attached then store to DB
  if (req.file) {
    const imageName = `${req.file.originalname}-${uuid_generate.v4()}.${
      req.file.mimetype.split("/")[1]
    }`;

    sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toBuffer()
      .then((buffer) => {
        const s3Params = {
          Bucket: "userspictures",
          Key: imageName,
          Body: buffer,
        };

        s3.putObject(s3Params)
          .promise()
          .then(async (resp) => {
            console.log("put pic on s3");
            //Insert the user in database
            await pool.query(
              "INSERT INTO person (id_uid, person_name, password, person_image) VALUES($1, $2, $3, $4)",
              [
                uuid_generate.v4(),
                person_name.toUpperCase(),
                hashedPassword,
                imageName,
              ]
            );
          })
          .catch((error) => {
            throw new Error(error);
          });
      });
  } else if (!req.file) {
    //Insert the user in database with default image
    await pool.query(
      "INSERT INTO person (id_uid, person_name, password, person_image) VALUES($1, $2, $3, $4)",
      [
        uuid_generate.v4(),
        person_name.toUpperCase(),
        hashedPassword,
        "default.jpg",
      ]
    );
  }
};
