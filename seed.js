const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = "mongodb+srv://chan638356_db_user:Chan6383%40@cluster0.bzykol2.mongodb.net/accsysindia?retryWrites=true&w=majority&appName=Cluster0";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

async function seedDatabase() {
  try {
    console.log("Connecting to MongoDB at", MONGODB_URI, "...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected successfully! Creating the database by inserting a document...");

    const adminEmail = "admin@accsysindia.com";
    const existingAdmin = await User.findOne({ email: adminEmail });
    
    if (!existingAdmin) {
      // Hashing the password just like a typical auth setup
      const hashedPassword = await bcrypt.hash("admin123", 10);
      
      await User.create({
        name: "Admin",
        email: adminEmail,
        password: hashedPassword,
        role: "admin"
      });
      console.log("Database 'accsysindia' successfully created! Inserted an admin user.");
    } else {
      console.log("Database already exists and admin user is present.");
    }
  } catch (err) {
    console.error("Failed to connect or insert data. Is MongoDB running locally?", err);
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
