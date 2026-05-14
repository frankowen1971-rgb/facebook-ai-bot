require('dotenv').config();
const express = require('express');
const Anthropic = require('@anthropic-ai/sdk');

const app = express();
app.use(express.json());

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Webhook Verification
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === process.env.VERIFY_TOKEN) {
    console.log('✅ Webhook verified!');
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// Message Receive
app.post('/webhook', async (req, res) => {
  const body = req.body;

  if (body.object === 'page') {
    for (const entry of body.entry) {
      const event = entry.messaging[0];
      const senderId = event.sender.id;

      if (event.message && event.message.text) {
        const userMessage = event.message.text;
        console.log(`📩 Message from ${senderId}: ${userMessage}`);

        // Claude AI দিয়ে উত্তর তৈরি
        const response = await client.messages.create({
          model: process.env.CLAUDE_MODEL || 'claude-sonnet-4-5',
          max_tokens: 500,
          messages: [
            {
              role: 'user',
              content: userMessage,
            },
          ],
          system: 'তুমি একটি helpful Facebook Page assistant। সংক্ষিপ্ত ও সহায়ক উত্তর দাও।',
        });

        const replyText = response.content[0].text;

        // Facebook-এ Reply পাঠাও
        await sendMessage(senderId, replyText);
      }
    }
    res.status(200).send('EVENT_RECEIVED');
  } else {
    res.sendStatus(404);
  }
});

// Facebook Message Send Function
async function sendMessage(recipientId, text) {
  const url = `https://graph.facebook.com/v18.0/me/messages?access_token=${process.env.PAGE_ACCESS_TOKEN}`;

  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      recipient: { id: recipientId },
      message: { text },
    }),
  });
}

// Server Start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
