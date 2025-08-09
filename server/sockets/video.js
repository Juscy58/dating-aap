module.exports = (io) => {
  const users = {};

  io.of('/video').on('connection', (socket) => {
    console.log('a user connected for video');

    socket.on('register', (userId) => {
      users[userId] = socket.id;
      socket.userId = userId;
    });

    // One-to-one call signaling
    socket.on('call-user', (data) => {
      const { to, offer } = data;
      io.of('/video').to(to).emit('call-made', {
        offer,
        socket: socket.id,
      });
    });

    socket.on('make-answer', (data) => {
      io.of('/video').to(data.to).emit('answer-made', {
        answer: data.answer,
        socket: socket.id,
      });
    });

    socket.on('ice-candidate', (data) => {
      io.of('/video').to(data.to).emit('ice-candidate', {
        candidate: data.candidate,
      });
    });

    // Simple live streaming (mesh)
    socket.on('broadcast', (streamId) => {
      socket.streamId = streamId;
      socket.join(streamId);
      socket.emit('broadcaster');
    });

    socket.on('watcher', (streamId) => {
      socket.join(streamId);
      socket.to(streamId).emit('watcher', socket.id);
    });

    socket.on('offer', (id, offer) => {
      socket.to(id).emit('offer', socket.id, offer);
    });

    socket.on('answer', (id, answer) => {
      socket.to(id).emit('answer', socket.id, answer);
    });

    socket.on('candidate', (id, candidate) => {
      socket.to(id).emit('candidate', socket.id, candidate);
    });

    socket.on('disconnect', () => {
      console.log('user disconnected from video');
      if (socket.streamId) {
        socket.to(socket.streamId).emit('broadcaster-disconnected');
      }
      if (socket.userId) {
        delete users[socket.userId];
      }
    });
  });
};