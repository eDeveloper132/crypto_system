import { User, Favorite } from "../../../Schema/post"; // Adjust the import based on your directory structure

interface UserProps {
  username: string;
  password: string;
  email?: string;
  name: string;
}

export default class UserServices {
  async execute({ username, password, email, name }: UserProps) {
    // Create a new user
    const newUser = new User({
      username,
      password, // Consider hashing the password before saving
      name,
      email,
    });

    // Save the user to the database
    const createdUser = await newUser.save();

    // Create a new favorite associated with the user
    const favorite = new Favorite({
      user: createdUser._id, // Reference to the newly created user
      coins: ["61e9977a526da74e89d17df9"], // Array of coin IDs
    });

    await favorite.save();

    return createdUser;
  }
}
