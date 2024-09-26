"use client";
import React, { useState, useEffect, useMemo } from "react";
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
import { cn } from "@/lib/utils";
import { Pencil, Trash2 } from "lucide-react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { Spinner } from "@/components/ui/spinner";

const taskSchema = z.object({
  task: z.string().min(1, {
    message: "Task cannot be empty.",
  }),
});

function Task() {
  const { toast } = useToast();
  const [tasks, setTasks] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [editingTask, setEditingTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const form = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      task: "",
    },
  });

  async function onSubmit(values) {
    if (editingTask) {
      // Update task if editing
      try {
        setIsLoading(true);
        const response = await axios.put(`/api/tasks/${editingTask?.id}`, {
          name: values.task,
          status: values.status,
        });
        if (response?.status === 200) {
          toast({
            variant: "success",
            title: "Update Task",
            description: response?.data?.message,
          });
          const updatedData = response.data.task;
          setTasks((prevTasks) =>
            prevTasks.map((task) =>
              task.id === editingTask?.id ? updatedData : task
            )
          );
          setEditingTask(null);
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error While Updating Task",
          description: error || "Something went wrong",
        });
        console.error("Error updating task:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      // Add new task
      try {
        setIsLoading(true);
        const res = await axios.post("/api/tasks", {
          name: values.task,
          status: "new",
        });
        toast({
          variant: "success",
          title: "Add new Task",
          description: "Task Add successfully",
        });
        const newTask = res.data;
        setTasks([...tasks, newTask]);
      } catch (error) {
        console.error("Failed to add task", error);
        toast({
          variant: "destructive",
          title: "Error While Add Task",
          description: error || "Something went wrong",
        });
      } finally {
        setIsLoading(false);
      }
    }
    form.reset();
  }

  const handleChangeTaskStatus = async (taskId, newStatus) => {
    try {
      setIsLoading(true);
      const response = await axios.patch(`/api/tasks/${taskId}`, {
        status: newStatus,
      });
      toast({
        variant: "success",
        title: "Update Task Status",
        description: response?.data?.message,
      });
      const updatedTask = response.data.task;

      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? updatedTask : task))
      );
    } catch (error) {
      console.error("Error updating task status:", error);
      toast({
        variant: "destructive",
        title: "Error While Updating Task Status",
        description: error || "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    form.setValue("task", task.name);
  };

  const handleDeleteTask = async (taskId) => {
    const originalTasks = [...tasks];
    setTasks(tasks.filter((task) => task.id !== taskId));
    try {
      setIsLoading(true);
      await axios.delete(`/api/tasks/${taskId}`);
      toast({
        variant: "success",
        title: "Delete Task",
        description: "Task Delete Successfully",
      });
    } catch (error) {
      setTasks(originalTasks);
      toast({
        variant: "destructive",
        title: "Error While Deleteing Task",
        description: error || "Something went wrong",
      });
      console.error("Error deleting task:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredTasks = useMemo(() => {
    return activeTab === "all"
      ? tasks
      : tasks.filter((task) => task.status === activeTab);
  }, [tasks, activeTab]);

  const getTask = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("/api/tasks");
      const newTask = res.data;
      setTasks(newTask);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error While Getting Task",
        description: error || "Something went wrong",
      });
      console.error("error while fetch task", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTask();
  }, []);

  return (
    <div className="flex flex-col items-center h-screen w-full">
      <Card className="w-[90%] md:w-[50%] h-fit mt-5">
        <CardHeader>
          <CardTitle className="text-3xl w-full flex items-center justify-center">
            TO DO LIST
          </CardTitle>
        </CardHeader>

        <CardContent>
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
              <Button
                type="submit"
                className="w-full md:w-[20%]"
                aria-label={editingTask ? "Update Task" : "Add Task"}
              >
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
          <Card className="min-h-96">
            {isLoading ? (
              <p className="w-full min-h-96 flex justify-center items-center">
                <Spinner size="large" />
              </p>
            ) : (
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
                              aria-label="Edit Task"
                            >
                              <Pencil />
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteTask(task.id)}
                            title="Delete Task"
                            aria-label="Delete Task"
                          >
                            <Trash2 />
                          </button>
                          {task.status !== "completed" && (
                            <button
                              aria-label="Mark as Completed"
                              onClick={() =>
                                handleChangeTaskStatus(task.id, "completed")
                              }
                              className="ml-2 px-3 py-1 bg-green-500 text-white rounded"
                            >
                              Mark as Completed
                            </button>
                          )}
                        </div>
                      </Card>
                    </li>
                  ))
                ) : (
                  <p className="w-full min-h-96 flex justify-center items-center">
                    No tasks in this category.
                  </p>
                )}
              </ul>
            )}
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}

export default Task;
