const express = require("express");
const { getChatResponse } = require("../services/openaiService");
const { getRooms, bookRoom } = require("../services/bookingService");
const Conversation = require("../models/conversation");


const router = express.Router();

router.post("/chat", async (req, res) => {
  const { message, userId } = req.body;

  try {
    let conversations = await Conversation.findAll({
      where: { userId },
      order: [["createdAt", "ASC"]],
    });

    let messages = conversations.map((conv) => ({
      role: conv.role,
      content: conv.message,
    }));

    messages.push({ role: "user", content: message });

    const functions = [
      {
        name: "get_rooms",
        description: "Get available hotel rooms",
        parameters: { type: "object", properties: {} },
      },
      {
        name: "book_room",
        description: "Book a hotel room",
        parameters: {
          type: "object",
          properties: {
            roomId: { type: "number" },
            fullName: { type: "string" },
            email: { type: "string" },
            nights: { type: "number" },
          },
          required: ["roomId", "fullName", "email", "nights"],
        },
      },
    ];

    let assistantMessage = await getChatResponse(messages, functions);

    if (assistantMessage.function_call) {
      const functionName = assistantMessage.function_call.name;
      const functionArgs = JSON.parse(assistantMessage.function_call.arguments);

      let functionResult;
      if (functionName === "get_rooms") {
        functionResult = await getRooms();
      } else if (functionName === "book_room") {
        functionResult = await bookRoom(
          functionArgs.roomId,
          functionArgs.fullName,
          functionArgs.email,
          functionArgs.nights
        );

        if (functionResult && functionResult.bookingId) {
          assistantMessage.content = `Booking confirmed! Here are the details:
            Booking ID: ${functionResult.bookingId}
            Room: ${functionResult.roomName}
            Name: ${functionResult.fullName}
            Email: ${functionResult.email}
            Nights: ${functionResult.nights}
            Total Price: $${functionResult.totalPrice}`;
        } else {
          assistantMessage.content =
            "I'm sorry, but there was an error with the booking. Please try again.";
        }
      }

      messages.push({
        role: "function",
        name: functionName,
        content: JSON.stringify(functionResult),
      });

      if (!assistantMessage.content) {
        const secondResponse = await getChatResponse(messages, functions);
        assistantMessage = secondResponse;
      }
    }

    await Conversation.create({
      userId,
      message: message,
      role: "user",
    });

    if (assistantMessage.content) {
      await Conversation.create({
        userId,
        message: assistantMessage.content,
        role: "assistant",
      });
    }

    res.json({  
      response:
        assistantMessage.content 
    });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
  }
});

module.exports = router;
 