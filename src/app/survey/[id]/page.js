"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import api from "../../services/api";

export default function SurveyPage() {
  const pathname = usePathname();
  const id = pathname.split("/").pop();

  const [survey, setSurvey] = useState(null);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const response = await api.get(`/survey/${id}`);
        setSurvey(response.data);

        if (response.data.questions && Array.isArray(response.data.questions)) {
          setAnswers(new Array(response.data.questions.length).fill(null));
        }
      } catch (error) {
        console.error("Error fetching survey:", error);
      }
    };

    if (id) {
      fetchSurvey();
    }
  }, [id]);

  const handleAnswerChange = (questionIndex, optionIndex) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = optionIndex;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await api.post(
        `/survey/${id}/response`,
        { answers },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Response submitted!");
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred");
    }
  };

  if (!survey || !survey.questions) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-8 lg:px-16">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          {survey.title}
        </h1>

        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Submit Your Answers
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {survey.questions.map((question, questionIndex) => (
            <div key={questionIndex} className="border-b pb-4 mb-4">
              <h3 className="text-xl font-medium text-gray-800 mb-2">
                {question.questionText}
              </h3>
              <div className="space-y-2">
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="flex items-center">
                    <input
                      type="radio"
                      id={`q${questionIndex}_option${optionIndex}`}
                      name={`question${questionIndex}`}
                      checked={answers[questionIndex] === optionIndex}
                      onChange={() =>
                        handleAnswerChange(questionIndex, optionIndex)
                      }
                      className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <label
                      htmlFor={`q${questionIndex}_option${optionIndex}`}
                      className="text-gray-700"
                    >
                      {option.text}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300"
          >
            Submit Answers
          </button>
        </form>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Current Responses
          </h2>
          {survey.questions.map((question, questionIndex) => (
            <div key={questionIndex} className="mb-6">
              <h3 className="text-xl text-gray-800 mb-2">
                {question.questionText}
              </h3>
              {question.responses && question.responses.length > 0 ? (
                question.responses.map((response, index) => (
                  <p key={index} className="text-gray-600">
                    Response by User ID: {response.userId.toString()} - Selected
                    Option: {response.selectedOptionIndex + 1} (
                    {question.options[response.selectedOptionIndex]?.text ||
                      "Option not available"}
                    )
                  </p>
                ))
              ) : (
                <p className="text-gray-500">No responses yet.</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
