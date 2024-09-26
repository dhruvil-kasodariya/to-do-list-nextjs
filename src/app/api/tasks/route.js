import { NextResponse } from "next/server";
import Task from "@/models/Task";
import sequelize from "@/db/sequelize";

// Synchronize database (in a real app, handle migrations separately)
await sequelize.sync();

// Handle GET request to fetch tasks
export async function GET() {
  try {
    const tasks = await Task.findAll();
    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}

// Handle POST request to add a new task
export async function POST(req) {
  try {
    const body = await req.json();
    const { name, status } = body;
    const newTask = await Task.create({ name, status });
    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 }
    );
  }
}
