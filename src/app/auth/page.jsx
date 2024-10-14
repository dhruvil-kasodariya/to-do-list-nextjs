"use client";
import Login from "@/components/Login";
import SignUp from "@/components/SignUp";
import React, { useState } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

function Auth() {
  const [isLoging, setIsLogin] = useState(true);
  const toast = useToast();

  // Handle form submission
  const onSignUpSubmit = async (values) => {
    console.log("SignUp Data:", values);
    // Perform your sign-up logic here (e.g., API request)
    try {
      const res = await axios.post("/api/auth/signup", {
        username: values.username,
        email: values.email,
        password: values.password,
      });
      console.log("res :>> ", res);
      if (res?.status === 201) {
        toast({
          variant: "success",
          title: "SignUp success",
          description: "Your accont has been created SuccessFully",
        });
      }
    } catch (error) {
      console.error("Failed to create user", error);
      toast({
        variant: "destructive",
        title: "Error While Createing new account",
        description: error || "Something went wrong",
      });
    }
  };

  // Handle form submission
  const onLoginSubmit = (values) => {
    console.log("Login Data:", values);
    // Perform your login logic here (e.g., API request)
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      {isLoging ? (
        <Login setIsLogin={setIsLogin} onSubmit={onLoginSubmit} />
      ) : (
        <SignUp setIsLogin={setIsLogin} onSubmit={onSignUpSubmit} />
      )}
    </div>
  );
}

export default Auth;
