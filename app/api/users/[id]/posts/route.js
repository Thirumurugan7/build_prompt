import { connectDB } from "@utils/database";

import Prompt from "@models/prompt";

export const GET = async (request, { params }) => {
  //params is the dynamic parameter being passed
  try {
    await connectDB();

    const prompts = await Prompt.find({
      creator: params.id,
    }).populate("creator");
    console.log(prompts);
    //it fetched the prompts created by a particular user

    return new Response(JSON.stringify(prompts), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to fetch the prompts", { status: 500 });
  }
};
