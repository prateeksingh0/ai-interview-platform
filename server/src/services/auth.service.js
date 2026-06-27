import bcrypt from "bcrypt";
import prisma from "../config/prisma.js";
import { generateToken } from "../utils/jwt.js";

class AuthService {
  async register({ name, email, password }) {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    const token = generateToken({
      id: user.id,
      email: user.email,
    });

    return {
      user,
      token,
    };
  }

  async login({ email, password }) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      throw new Error("Invalid email or password");
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    };
  }
}

export default new AuthService();