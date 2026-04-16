import { useState, useEffect } from "react";

export default function QuestionScreen({ question, index, total, onAnswer, onNext, onPrev }) {
  const [value, setValue] = useState(null);
  const [hover, setHover] = useState(null);

  // Reset selection when question changes
  useEffect(() => {
    setValue(null);
    setHover(null);
  }, [question.id]);

  const handleSubmit = () => {
    if (!value) return;
    onAnswer(question.id, value);
    onNext();
  };

  const progress = Math.round(((index + 1) / total) * 100);

  const renderStars = (count) => {
    return (
      <div className="flex justify-center gap-2 mb-4">
        {[...Array(count)].map((_, i) => {
          const starValue = i + 1;
          return (
            <span
              key={i}
              onClick={() => setValue(starValue)}
              onMouseEnter={() => setHover(starValue)}
              onMouseLeave={() => setHover(null)}
              className={`text-3xl cursor-pointer transition ${
                (hover || value) >= starValue ? "text-yellow-400" : "text-gray-300"
              }`}
            >
              ★
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow w-[400px] text-center">
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 h-2 rounded mb-4">
          <div
            className="bg-blue-500 h-2 rounded"
            style={{ width: `${progress}%` }}
          />
        </div>

        <h2 className="text-lg mb-2">Question {index + 1}/{total}</h2>
        <p className="mb-6">{question.text}</p>

        {question.type === "rating" && renderStars(question.scale)}

        {question.type === "text" && (
          <textarea
            className="border p-2 w-full mb-4"
            onChange={(e) => setValue(e.target.value)}
          />
        )}

        <div className="flex justify-between">
          <button onClick={onPrev} className="px-4 py-2 border rounded">Previous</button>
          <button
            onClick={handleSubmit}
            disabled={!value}
            className={`px-4 py-2 rounded text-white ${
              value ? "bg-blue-500" : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
