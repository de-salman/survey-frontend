import { useForm } from "react-hook-form";
import api from "../../../services/api";
import { useRouter } from "next/router";

export default function SurveyResponse() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const { id } = router.query;

  const onSubmit = async (data) => {
    await api.post(`/survey/${id}/response`, { answers: Object.values(data) });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("0")} placeholder="Answer 1" />
      <input {...register("1")} placeholder="Answer 2" />
      <input {...register("2")} placeholder="Answer 3" />
      <button type="submit">Submit Response</button>
    </form>
  );
}
