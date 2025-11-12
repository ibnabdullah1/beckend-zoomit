import { UserRole } from "../modules/user/user.interface";
import User from "../modules/user/user.model";

const adminUser = {
  email: "super.admin@thezoomit.com",
  password: "S@ZoomAdmin2025!",
  name: "Shiblee Muzumder",
  role: UserRole.SUPER_ADMIN,
  profilePhoto: "",
  clientInfo: {
    device: "Desktop",
    browser: "Chrome",
    ipAddress: "58.145.190.207",
    pcName: "DESKTOP-8G8H8H8",
    os: "Windows 10",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.5735.110 Safari/537.36",
  },
};

const seedAdmin = async () => {
  try {
    // Check if an admin already exists
    const isAdminExist = await User.findOne({ role: UserRole.SUPER_ADMIN });
    if (!isAdminExist) {
      await User.create(adminUser);
      console.log("Admin user created successfully.");
    } else {
      console.log("Admin user already exists.");
    }
  } catch (error) {
    console.error("Error seeding admin user:", error);
  }
};

export default seedAdmin;
