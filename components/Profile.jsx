import React from "react";
import PromptCard from "./PromptCard";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>
      {console.log(data)}
      <div className="prompt_layout mt-10">
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)} // if handleEdit exits it can be triggered
            handleDelete={() => handleDelete && handleDelete(post)} // if handleDelete exits it can be triggered
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
