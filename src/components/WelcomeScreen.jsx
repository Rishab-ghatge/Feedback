export default function WelcomeScreen({ onStart }) {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome 👋</h1>
        <p className="mb-6">Please take a quick survey</p>
        <button
          onClick={onStart}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg"
        >
          Start
        </button>
      </div>
    </div>
  );
}

