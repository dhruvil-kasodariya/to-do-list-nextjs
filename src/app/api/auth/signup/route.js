import { NextResponse } from "next/server";
import sequelize from "@/db/sequelize";
import User from "@/models/User";

// Synchronize database (in a real app, handle migrations separately)
await sequelize.sync();

// Handle POST request to add a new task
export async function POST(req) {
  try {
    const body = await req.json();
    const { username, email, password } = body;
    const newUser = await User.create({ username, email, password });
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
