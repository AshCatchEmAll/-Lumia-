import { prisma } from './db_init'


const load = async () => {
    try {
        await prisma.question.createMany({
            data: {
                content: "This is a question asked by user 1",
                userId: "1",
                isDraft:false,
            }
        })
        console.log("Created Questions in Question table");


        // await prisma.category.createMany({
        //     data: categories
        // });
        // console.log("Added category data");

        // await prisma.product.createMany({
        //     data: products
        // })
        // console.log("Added product data");
    } catch (e) {
        console.error(e);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    };
}

load();