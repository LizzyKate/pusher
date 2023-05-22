import Image from "next/image";

export default function Home({ handleLoginChange, username, handleLogin }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <form onSubmit={handleLogin}>
        <input
          onChange={handleLoginChange}
          type="text"
          placeholder="Enter your username"
          className="border-2 border-gray-900"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}
