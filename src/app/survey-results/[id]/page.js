// pages/survey-results/[id].js
import { useEffect, useState } from "react";
import api from "../services/api";

export default function SurveyResults({ id }) {
  const [survey, setSurvey] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      const response = await api.get(`/survey/${id}/results`);
      setSurvey(response.data);
    };
    fetchResults();
  }, [id]);

  if (!survey) return <p>Loading...</p>;

  return (
    <div>
      <h1>{survey.title} Results</h1>
      {survey.questions.map((question, questionIndex) => (
        <div key={questionIndex}>
          <h3>{question.questionText}</h3>
          {question.options.map((option, optionIndex) => (
            <div key={optionIndex}>
              <p>
                Option: {option.text} - Responses: {survey.responses.length}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
