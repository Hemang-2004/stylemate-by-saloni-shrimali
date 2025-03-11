// import { OpenAIStream } from "ai";

// import OpenAI from "openai";
// import type { ChatCompletionMessageParam } from "openai/resources/chat";

// const openai = new OpenAI({
//   apiKey: "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", // Securely replace this
// });

// export const runtime = "nodejs";

// export async function POST(req: Request) {
//   try {
//     const { messages } = await req.json();

//     // Format messages for OpenAI API
//     const formattedMessages: ChatCompletionMessageParam[] = messages.map((msg: any) => ({
//       role: msg.role,
//       content: msg.image
//         ? [
//             { type: "text", text: msg.content || "Describe this outfit" },
//             {
//               type: "image_url",
//               image_url: {
//                 url: msg.image,
//                 detail: "high",
//               },
//             },
//           ]
//         : msg.content,
//     }));

//     // Add system message for fashion context **(Only Once)**
//     formattedMessages.unshift({
//       role: "system",
//       content: `You are StyleMate, a fashion and styling expert AI assistant. 
//       Your expertise includes:
//       - Personal styling and fashion advice
//       - Color coordination and pattern mixing
//       - Wardrobe organization and capsule wardrobes
//       - Body type styling recommendations
//       - Sustainable fashion practices
//       - Current fashion trends
//       - Occasion-specific outfit recommendations
      
//       Provide detailed, practical advice while considering:
//       - The user's specific needs and context
//       - Body positivity and inclusivity
//       - Sustainability and ethical fashion
//       - Budget-consciousness
//       - Versatility and practicality
      
//       When analyzing images:
//       - Identify clothing items and styles
//       - Suggest styling options and combinations
//       - Comment on color coordination
//       - Provide constructive feedback
//       - Recommend improvements or alternatives`,
//     });

//     // Call OpenAI API with Streaming Enabled
//     const response = await openai.chat.completions.create({
//         model: "gpt-3.5-turbo", // ✅ Lower cost, available in free-tier
//         messages: formattedMessages,
//         stream: true,
//         max_tokens: 1000,
//       });
      
      
      

//     ;iytrdnm,.tesr
//     return new Response(stream); 

//   } catch (error) {
//     console.error("OpenAI API Error:", error);
//     return new Response(
//       JSON.stringify({ response: "Sorry, I encountered an error. Please try again." }),
//       { status: 500, headers: { "Content-Type": "application/json" } }
//     );
//   }
// }

import OpenAI from "openai";
import type { ChatCompletionMessageParam } from "openai/resources/chat";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, 
  });

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Format messages for OpenAI API
    const formattedMessages: ChatCompletionMessageParam[] = messages.map((msg: any) => ({
      role: msg.role,
      content: msg.image
        ? [
            { type: "text", text: msg.content || "Describe this outfit" },
            { type: "image_url", image_url: { url: msg.image, detail: "high" } },
          ]
        : msg.content,
    }));

    // Add system message
    formattedMessages.unshift({
      role: "system",
      content: `You are StyleMate, a fashion and styling expert AI assistant. Provide personalized fashion recommendations.`,
    });

    // Call OpenAI API (Streaming Response)
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: formattedMessages,
      stream: true,
      max_tokens: 1000,
    });

    // Handle OpenAI Stream
    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of response) {
          const content = chunk.choices[0]?.delta?.content || "";
          controller.enqueue(new TextEncoder().encode(content));
        }
        controller.close();
      },
    });

    return new Response(stream, { headers: { "Content-Type": "text/plain" } });

  } catch (error) {
    console.error("OpenAI API Error:", error);
    return new Response(JSON.stringify({ response: "Error occurred. Try again." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}


// import { OpenAIStream, StreamingTextResponse } from "ai"
// import OpenAI from "openai"
// import type { ChatCompletionMessageParam } from "openai/resources/chat"

// // Initialize the OpenAI client with the API key
// const openai = new OpenAI({
// apiKey: "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", // Replace securely
// })

// export const runtime = "nodejs"

// export async function POST(req: Request) {
//   try {
//     const { messages } = await req.json()

//     // Format messages for OpenAI API
//     const formattedMessages: ChatCompletionMessageParam[] = messages.map((msg: any) => ({
//       role: msg.role,
//       content: msg.image
//         ? [
//             { type: "text", text: msg.content || "Describe this outfit" },
//             {
//               type: "image_url",
//               image_url: {
//                 url: msg.image,
//                 detail: "high",
//               },
//             },
//           ]
//         : msg.content,
//     }))

//     // Add system message for fashion context
//     formattedMessages.unshift({
//       role: "system",
//       content: `You are StyleMate, a fashion and styling expert AI assistant. 
//       Your expertise includes:
//       - Personal styling and fashion advice
//       - Color coordination and pattern mixing
//       - Wardrobe organization and capsule wardrobes
//       - Body type styling recommendations
//       - Sustainable fashion practices
//       - Current fashion trends
//       - Occasion-specific outfit recommendations
      
//       Provide detailed, practical advice while considering:
//       - The user's specific needs and context
//       - Body positivity and inclusivity
//       - Sustainability and ethical fashion
//       - Budget-consciousness
//       - Versatility and practicality
      
//       When analyzing images:
//       - Identify clothing items and styles
//       - Suggest styling options and combinations
//       - Comment on color coordination
//       - Provide constructive feedback
//       - Recommend improvements or alternatives`,
//     })

//     // Call OpenAI API with streaming enabled
//     const response = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo", // Using gpt-3.5-turbo for wider availability
//       messages: formattedMessages,
//       stream: true,
//       max_tokens: 1000,
//     })

//     // Create a streaming response using the ai package's OpenAIStream
//     const stream = OpenAIStream(response)
//     return new StreamingTextResponse(stream)
//   } catch (error) {
//     console.error("OpenAI API Error:", error)

//     // Return a proper JSON response for error handling
//     return new Response(JSON.stringify({ response: "Sorry, I encountered an error. Please try again." }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     })
//   }
// }
// // 
