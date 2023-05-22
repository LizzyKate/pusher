import Pusher from "pusher";

const pusher = new Pusher({
  appId: process.env.app_id,
  key: process.env.key,
  secret: process.env.secret,
  cluster: process.env.cluster,
  useTLS: true,
});

export default async function handler(req, res) {
  const { socket_id, channel_name, username } = req.body;

  const randomString = Math.random().toString(36).slice(2);

  const presenceData = {
    user_id: randomString,
    user_info: {
      username,
    },
  };

  try {
    const auth = pusher.authorizeChannel(socket_id, channel_name, presenceData);
    res.send(auth);
  } catch (error) {
    console.error(error);
  }
}
