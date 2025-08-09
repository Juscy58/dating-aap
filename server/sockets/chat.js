module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('a user connected for chat');

    socket.on('join conversation', (conversationId) => {
      socket.join(conversationId);
    });

    socket.on('send message', (message) => {
      if (!message || !message.conversation) return;
      io.to(message.conversation).emit('receive message', message);
    });

    socket.on('disconnect', () => {
      console.log('user disconnected from chat');
    });
  });
};