const connectDB = require("./conn");

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    res.status(500).json({ error: "Database connection failed", details: error.message });
  }
});