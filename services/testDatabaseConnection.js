async function testDatabaseConnection(db) {
  if (!db || typeof db.getConnection !== "function") {
    console.error("ERROR: Database instance is not defined or invalid.");
    process.exit(1);
  }

  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const connection = await db.getConnection();
    console.log("Database connected successfully!");

    connection.release();
  } catch (error) {
    console.error("ERROR: Failed to connect to MySQL: ", error.message);
    process.exit(1);
  }
}

module.exports = testDatabaseConnection;
