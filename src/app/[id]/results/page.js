import { useEffect, useState } from "react";
import api from "../../../services/api";
import { useRouter } from "next/router";

export default function SurveyResults() {
  const [results, setResults] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    async function fetchResults() {
      const res = await api.get(`/survey/${id}/results`);
      setResults(res.data);
    }
    if (id) fetchResults();
  }, [id]);

  return (
    <div>
      {results ? (
        <div>
          <h1>{results.title}</h1>
          <p>Total Responses: {results.responses.length}</p>
          {/* Render more results based on the questions */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
