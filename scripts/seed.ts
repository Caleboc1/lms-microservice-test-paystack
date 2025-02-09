const { PrismaClient } = require("@prisma/client");
const database = new PrismaClient();

async function main() {
    try {
        const categories = [
            { name: "Software Engineering" },
            { name: "Music" },
            { name: "Fitness" },
            { name: "Photography" },
            { name: "Engineering" },
            { name: "Accounting" },
            { name: "Filming" },
        ];

        for (const category of categories) {
            await database.category.upsert({
                where: { name: category.name }, // Check if the category already exists
                update: {}, // Do nothing if it exists
                create: category, // Create only if it doesn't exist
            });
        }

        console.log("Database seeding completed successfully.");
    } catch (error) {
        console.error("Error seeding the database categories", error);
    } finally {
        await database.$disconnect();
    }
}

main();
