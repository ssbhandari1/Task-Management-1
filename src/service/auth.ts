import User from "@/models/user";
import { hash } from "bcryptjs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface UserData {
  username: string;
  email: string;
  password: string;
}

const JWT_SECRET = process.env.JWT_SECRET || "dijaslkfe4333_kaslskei";

/**
 * Adds a new user to the database after validating and hashing the password.
 * @param userData Object containing user details (username, email, password, etc.)
 * @returns The newly created user
 * @throws Error if validation fails or saving to the database fails
 */



export const getUser = async (email: string) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error: unknown) {
    console.log(error)
    throw new Error(`Error fetching user: `);
  }
};




// Handle Sign Up logic
export const signUpUser = async (userData: UserData) => {
    const { username, email, password } = userData;
  
  
    if (!username || !email || !password) {
      throw new Error("All fields (username, email, password) are required.");
    }
  
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User with this email already exists.");
    }
  
    const hashedPassword = await hash(password, 10);
  
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
  
    await newUser.save();
  
    const { ...userWithoutPassword } = newUser.toObject();
    return userWithoutPassword;
  };




// Handle login logic
export const logInUser = async (email: string, password: string) => {
  try {
    const user = await getUser(email);
    if (!user) {
      throw new Error("Invalid credentials");
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return {
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
      },
    };
  } catch (error: unknown) {
    console.log(error)
    throw new Error(`Login failed:`);
  }
};


export const getUserById = async (userId: string) => {
  return await User.findById(userId).select("_id name email");
};