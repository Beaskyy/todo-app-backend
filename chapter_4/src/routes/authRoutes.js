import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db.js";
import prisma from "../prismaClient.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  // save the new user and hashed password to the db

  try {
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    // Now we have a user, I want to add their first todo for them
    const defaultTodo = `Hello :) Add your first todo!`;
    await prisma.todo.create({
        data: {
            task: defaultTodo,
            userId: user.id
        }
    })

    // create a token
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
    );
    res.json({ token });
  } catch (err) {
    console.log(err.message);
    res.status(503);
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
const user = await prisma.user.findUnique({
    where: {
        username
    }
})

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid password" });
    }

    // If everything goes well
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.json({ token });
  } catch (err) {
    console.log(err.message);
    res.status(503);
  }
});

export default router;
