"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils"; // Tailwind utility for conditional classes
import { Pencil, Trash2 } from "lucide-react";

// Validation schema for tasks using Zod
const taskSchema = z.object({
  task: z.string().min(1, {
    message: "Task cannot be empty.",
  }),
});

function Task() {
  const [tasks, setTasks] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [editingTask, setEditingTask] = useState(null); // State to manage editing task

  // React Hook Form with Zod resolver
  const form = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      task: "",
    },
  });

  // Form submit handler
  async function onSubmit(values) {
    if (editingTask) {
      // Update task if editing
      setTasks((prev) =>
        prev.map((task) =>
          task.id === editingTask.id ? { ...task, name: values.task } : task
        )
      );
      setEditingTask(null);
    } else {
      // Add new task
      try {
        const res = await fetch("/api/tasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: values.task, status: "new" }),
        });
        const newTask = await res.json();
        setTasks([...tasks, newTask]); // Add the new task to the state
        // form.reset(); // Reset form input
      } catch (error) {
        console.error("Failed to add task", error);
      }
      // setTasks([
      //   ...tasks,
      //   { id: Date.now(), name: values.task, status: "new" },
      // ]);
    }
    form.reset(); // Reset the form after submission
  }

  // Handle changing task status
  const changeTaskStatus = (taskId, newStatus) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  // Handle editing task
  const handleEditTask = (task) => {
    setEditingTask(task);
    form.setValue("task", task.name); // Set task name in the input for editing
  };

  // Handle deleting task
  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  // Filter tasks based on the active tab
  const filteredTasks =
    activeTab === "all"
      ? tasks
      : tasks.filter((task) => task.status === activeTab);

  return (
    <div className="flex flex-col items-center h-screen w-full">
      <h1 className="mt-5 mb-3 text-2xl font-bold">Welcome to my home page</h1>

      <Card className="w-[90%] md:w-[50%] h-[90%]">
        <CardHeader>
          <CardTitle className="text-lg">TO DO LIST</CardTitle>
        </CardHeader>

        <CardContent>
          {/* Task input field with validation */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 mb-4"
            >
              <FormField
                className="w-full"
                control={form.control}
                name="task"
                render={({ field }) => (
                  <FormItem className="flex-grow w-full md:w-[80%]">
                    <FormControl>
                      <Input placeholder="Add a new task" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full md:w-[20%]">
                {editingTask ? "Update Task" : "Add Task"}
              </Button>
            </form>
          </Form>

          <Tabs
            defaultValue="all"
            onValueChange={setActiveTab}
            className="w-full mb-4"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="new">New</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Task list based on the selected tab */}
          <Card className="min-h-96">
            <ul>
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <li
                    key={task.id}
                    className="flex justify-between items-center mb-2"
                  >
                    <Card className="w-full h-10 flex justify-between items-center px-2 mx-2 mt-2">
                      <span>{task.name}</span>
                      <div className="flex flex-row justify-evenly">
                        {task.status !== "completed" && (
                          <button
                            onClick={() => handleEditTask(task)}
                            title="Edit Task"
                          >
                            <Pencil />
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          title="Delete Task"
                        >
                          <Trash2 />
                        </button>
                        <select
                          value={task.status}
                          onChange={(e) =>
                            changeTaskStatus(task.id, e.target.value)
                          }
                          className="border p-1 rounded-md"
                        >
                          <option value="new">New</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>
                    </Card>
                  </li>
                ))
              ) : (
                <p>No tasks in this category.</p>
              )}
            </ul>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}

export default Home;
