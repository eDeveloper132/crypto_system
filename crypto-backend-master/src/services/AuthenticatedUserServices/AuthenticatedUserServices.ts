import { User } from "../../../Schema/post"; // Adjust the import based on your directory structure
import { sign } from "jsonwebtoken";

interface AuthenticatedProps {
  username: string;
  password: string;
}

export class AuthenticatedUserServices {
  async execute({ username, password }: AuthenticatedProps) {
    // Find user
    const user = await User.findOne({
      username,
    });

    if (!user) {
      throw new Error("Username or password incorrectly!");
    }

    // Here you should ideally use a hashed password check
    if (user.password !== password) {
      console.log("Password invalid");
      throw new Error("Username or password incorrectly!");
    }

    const token = sign(
      {
        user: {
          name: user.name,
          email: user.email,
          id: user._id.toString(), // Ensure you use _id for Mongoose
        },
      },
      process.env.JWT_SECRET,
      {
        subject: user._id.toString(),
        expiresIn: "1d",
      }
    );

    return { token };
  }
}
