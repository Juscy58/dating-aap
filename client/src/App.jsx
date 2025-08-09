import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './index.css';

function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold">Dating App MVP</h1>
      <nav className="flex gap-4">
        <Link to="/login" className="text-blue-500 underline">Login</Link>
        <Link to="/signup" className="text-blue-500 underline">Signup</Link>
        <Link to="/profile" className="text-blue-500 underline">Profile</Link>
        <Link to="/chat" className="text-blue-500 underline">Chat</Link>
        <Link to="/call" className="text-blue-500 underline">Video Call</Link>
        <Link to="/live" className="text-blue-500 underline">Live</Link>
        <Link to="/admin" className="text-blue-500 underline">Admin</Link>
      </nav>
    </div>
  );
}

function Placeholder({ title }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <Link to="/" className="text-blue-500 underline">Back Home</Link>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Placeholder title="Login" />} />
        <Route path="/signup" element={<Placeholder title="Signup" />} />
        <Route path="/profile" element={<Placeholder title="Profile" />} />
        <Route path="/chat" element={<Placeholder title="Chat" />} />
        <Route path="/call" element={<Placeholder title="Video Call" />} />
        <Route path="/live" element={<Placeholder title="Live Stream" />} />
        <Route path="/admin" element={<Placeholder title="Admin" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
