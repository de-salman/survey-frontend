"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "../services/api"; // Adjust the path as necessary

export default function SurveyList() {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await api.get("/survey/all"); // Adjust the endpoint as necessary
        setSurveys(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSurveys();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Loading surveys...</p>
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">Error fetching surveys: {error}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-8 lg:px-16">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Available Surveys
      </h1>
      {surveys.length === 0 ? (
        <p className="text-center text-gray-600">No surveys found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {surveys.map((survey) => (
            <Link
              key={survey._id}
              href={`/survey/${survey._id}`}
              className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                {survey.title}
              </h2>
              <ul className="text-gray-600">
                {survey.questions.slice(0, 3).map((question, index) => (
                  <li key={index} className="mb-2">
                    <strong>Q{index + 1}:</strong> {question.questionText}
                  </li>
                ))}
              </ul>
              <p className="text-blue-500 hover:text-blue-700 mt-4">
                View Survey →
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
