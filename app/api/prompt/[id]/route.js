import { connectDB } from "@utils/database";
import Prompt from "@models/prompt";

// GET to read
export const GET = async (request, { params }) => {
  try {
    await connectDB();

    const prompt = await Prompt.findById(params.id).populate("creator");

    if (!prompt) return new Response("Prompts not found", { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch the prompt", { status: 500 });
  }
};

// PATCH to update
export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();

  try {
    await connectDB();

    const existingPrompt = await Prompt.findById(params.id); //looking for a prompt with specific id

    if (!existingPrompt)
      return new Response("Prompt not found", { status: 404 }); // checking prompt exists or not

    existingPrompt.prompt = prompt;

    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to update prompt", { status: 500 });
  }
};

// DELETE to delete

export const DELETE = async (request, { params }) => {
  try {
    await connectDB();

    await Prompt.findByIdAndRemove(params.id);

    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete prompt", { status: 500 });
  }
};
