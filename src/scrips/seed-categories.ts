import { db } from "#/db";
import { categories } from "#/db/schema";

const categoryNames = [
  "Comedy",
  "Entertainment",
  "Music",
  "Cars and vehicles",
  "Education",
  "Gaming",
  "Film and animation",
  "How-to and style",
  "News and politics",
  "People and blogs",
  "Pets and animals",
  "Science and technology",
  "Sports",
  "Travel and events"
];

async function seedCategories() {
  console.log("Seeding categories...");

  const values = categoryNames.map((name) => ({
    name,
    description: `Videos related to ${name.toLowerCase()}`
  }));

  await db.insert(categories).values(values).onConflictDoNothing();

  console.log("Success: Categories seeded successfully.");
}

async function main() {
  try {
    await seedCategories();
  } catch (error) {
    console.error("Error seeding categories: ", error);
    process.exit(1);
  }
}

main()
  .then(() => {
    console.log("Done seeding categories.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error: ", error);
    process.exit(1);
  });
