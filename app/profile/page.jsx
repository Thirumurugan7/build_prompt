"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react"; //to know who logged in now
import { useRouter } from "next/navigation"; //to route back to home page
import Profile from "@components/Profile";
const page = () => {
  return (
    <Profile name="My Profile" desc="Welcome to your personalized profile page" data={[]} handleEdit={} handleDelete={} />
  )
};

export default page;
