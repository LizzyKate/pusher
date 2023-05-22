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

  try {
    await pusher.trigger("presence-channel", "chat-update", {
      message,
      username,
    });

    res.json({ status: 200, message, username }); // Include message and username in the response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" }); // Return an error response if there's an exception
  }
}
