"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react"; //to know who logged in now
import { useRouter } from "next/navigation"; //to route back to home page
import Profile from "@components/Profile";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession(); //data is fetched from useSession and renamed as session
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);

      const data = await response.json();

      setPosts(data);
    };

    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    try {
      await fetch(`/api/prompt/${post._id.toString()}`, { method: "DELETE" });

      const filteredPosts = posts.filter((p) => p._id !== post._id);

      setPosts(filteredPosts);
    } catch (error) {}
  };
  return (
    <Profile
      name="THiru"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
