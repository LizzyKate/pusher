import Pusher from "pusher";

const pusher = new Pusher({
  appId: process.env.app_id,
  key: process.env.key,
  secret: process.env.secret,
  cluster: process.env.cluster,
  useTLS: true,
});

export default async function handler(req, res) {
  const { message, username } = req.body;

  console.log("Received request:", req.body); // Log the received request

  try {
    console.log("Triggering Pusher event..."); // Log before triggering Pusher event

    await pusher.trigger("presence-channel", "chat-update", {
      message,
      username,
    });

    console.log("Pusher event triggered successfully."); // Log after triggering Pusher event

    res.json({ status: 200, message, username }); // Include message and username in the response
  } catch (error) {
    console.error("Pusher event triggering failed:", error); // Log the error when Pusher event triggering fails

    res.status(500).json({ error: "Internal Server Error" }); // Return an error response if there's an exception
  }
}
