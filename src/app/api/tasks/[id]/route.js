import { NextResponse } from "next/server";
import Task from "@/models/Task";
import sequelize from "@/db/sequelize";

// DELETE /api/tasks/[id]
export async function DELETE(req, { params }) {
  const { id } = params;
  try {
    const task = await Task.findByPk(id);
    if (!task) {
      return new Response(JSON.stringify({ error: "Task not found" }), {
        status: 404,
      });
    }

    await task.destroy(); // Deletes the task from the database
    return new Response(
      JSON.stringify({ message: "Task deleted successfully" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error deleting task:", error);
    return new Response(JSON.stringify({ error: "Failed to delete task" }), {
      status: 500,
    });
  }
}

export async function PUT(req, { params }) {
  const { id } = params;
  const { name, status } = await req.json(); // Extract data from request body

  try {
    // Find the task by its ID
    const task = await Task.findByPk(id);
    if (!task) {
      return new Response(JSON.stringify({ error: "Task not found" }), {
        status: 404,
      });
    }

    // Update the task's name and status
    task.name = name || task.name; // Keep existing name if not provided
    task.status = status || task.status; // Keep existing status if not provided

    await task.save(); // Save the updated task to the database

    return new Response(
      JSON.stringify({ message: "Task updated successfully", task }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error updating task:", error);
    return new Response(JSON.stringify({ error: "Failed to update task" }), {
      status: 500,
    });
  }
}

export async function PATCH(req, { params }) {
  const { id } = params;
  const { status } = await req.json(); // Extract 'status' from request body

  try {
    // Find the task by its ID
    const task = await Task.findByPk(id);
    if (!task) {
      return new Response(JSON.stringify({ error: "Task not found" }), {
        status: 404,
      });
    }

    // Update the task's status
    if (status) {
      task.status = status;
      await task.save(); // Save the updated status to the database

      return new Response(
        JSON.stringify({ message: "Task status updated successfully", task }),
        {
          status: 200,
        }
      );
    } else {
      return new Response(JSON.stringify({ error: "Status is required" }), {
        status: 400,
      });
    }
  } catch (error) {
    console.error("Error updating task status:", error);
    return new Response(
      JSON.stringify({ error: "Failed to update task status" }),
      {
        status: 500,
      }
    );
  }
}
