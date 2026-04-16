import { useEffect } from "react";

export default function ThankYouScreen({ onRestart }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRestart();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow text-center">
        <h1 className="text-3xl font-bold mb-4">Thank You 🙏</h1>
        <p>We appreciate your feedback!</p>
      </div>
    </div>
  );
}
