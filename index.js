// import weaviate from "weaviate-ts-client";

// const client = weaviate.client({
//   scheme: "http",
//   host: "localhost:8080",
// });

// const schemaRes = await client.schema.getter().do();

// console.log(schemaRes);

// const schemaConfig = {
//   class: "Movie",
//   vectorizer: "img2vec-neural",
//   vectorIndexType: "hnsw",
//   moduleConfig: {
//     "img2vec-neural": {
//       imageFields: ["image"],
//     },
//   },
//   properties: [
//     {
//       name: "image",
//       dataType: ["blob"],
//     },
//     {
//       name: "text",
//       dataType: ["string"],
//     },
//   ],
// };

// await client.schema.classCreator().withClass(schemaConfig).do();

// const img = readFileSync("./image-1.jpg");

// const b64 = Buffer.from(img).toString("base64");

// await client.data
//   .creator()
//   .withClassName("Movie")
//   .withProperties({
//     image: b64,
//     text: "Blade Runner",
//   })
//   .do();

// const test = Buffer.from(readFileSync("./image-1")).toString("base64");

// const resImage = await client.graphql
//   .get()
//   .withClassName("Movie")
//   .withFields(["image"])
//   .withNearImage({ image: test })
//   .withLimit(1)
//   .do();

// // Write result to filesystem
// const result = resImage.data.Get.Meme[0].image;
// writeFileSync("./result.jpg", result, "base64");

import * as weaviate from "weaviate-node-client";
import { readFileSync, writeFileSync } from "fs"; // Import the fs module functions

const client = weaviate.client({
  scheme: "http",
  host: "localhost:8080",
});

(async () => {
  try {
    const schemaRes = await client.schema.getter().do();
    console.log(schemaRes);

    const schemaConfig = {
      class: "Movie",
      vectorizer: "img2vec-neural",
      vectorIndexType: "hnsw",
      moduleConfig: {
        "img2vec-neural": {
          imageFields: ["image"],
        },
      },
      properties: [
        {
          name: "image",
          dataType: ["blob"],
        },
        {
          name: "text",
          dataType: ["string"],
        },
      ],
    };

    // Commenting out class creation since you mentioned it's throwing an error
    // await client.schema.classCreator().withClass(schemaConfig).do();

    const img = readFileSync("./image-1.jpg");
    const b64 = Buffer.from(img).toString("base64");

    await client.data
      .creator()
      .withClassName("Movie")
      .withProperties({
        image: b64,
        text: "Blade Runner",
      })
      .do();

    const test = Buffer.from(readFileSync("./image-1.jpg")).toString("base64"); // Fixed the file path and extension

    const resImage = await client.graphql
      .get()
      .withClassName("Movie")
      .withFields(["image"])
      .withNearImage({ image: test })
      .withLimit(1)
      .do();

    // Write result to filesystem
    const result = resImage.data.Get.Movie[0].image; // Corrected the class name here
    writeFileSync("./result.jpg", result, "base64");
  } catch (error) {
    console.error("Error:", error);
  }
})();
