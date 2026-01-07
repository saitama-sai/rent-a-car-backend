
const { DataSource } = require('typeorm');
const path = require('path');

async function checkUsers() {
    const dataSource = new DataSource({
        type: "sqlite",
        database: "database.sqlite", // Adjust if using different filename
        entities: [path.join(__dirname, "dist/**/*.entity.js")],
        synchronize: false,
    });

    try {
        // Since I can't easily join entities without full config, let's just use raw query
        const db = new DataSource({
            type: "sqlite",
            database: "database.sqlite",
        });
        await db.initialize();

        const users = await db.query("SELECT id, email, firstName, lastName FROM user");
        console.log("Current Users in DB:");
        console.table(users);
        await db.destroy();
    } catch (err) {
        console.error("Error checking db:", err.message);
    }
}

checkUsers();
