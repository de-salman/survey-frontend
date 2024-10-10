"use client";

import { useForm, useFieldArray } from "react-hook-form";
import api from "../services/api";
import jwt from "jsonwebtoken";

export default function CreateSurvey() {
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      questions: [
        {
          questionText: "",
          options: [{ text: "" }, { text: "" }, { text: "" }],
        },
      ], // Initialize with one question
    },
  });

  const { fields: questionFields, append: appendQuestion } = useFieldArray({
    control,
    name: "questions",
  });

  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
    // Format the data to ensure options are sent as an array of objects
    const formattedData = {
      title: data.title,
      questions: data.questions.map((question) => ({
        questionText: question.questionText,
        options: question.options.map((option) => ({ text: option.text })), // Ensure each option is an object
      })),
      createdBy: jwt.decode(token).id,
    };

    await api.post("/survey/create", formattedData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("title")} placeholder="Survey Title" />

      {questionFields.map((question, questionIndex) => (
        <div key={question.id}>
          <input
            {...register(`questions.${questionIndex}.questionText`)}
            placeholder={`Question ${questionIndex + 1}`}
          />
          {question.options.map((option, optionIndex) => (
            <input
              key={optionIndex}
              {...register(
                `questions.${questionIndex}.options.${optionIndex}.text`
              )}
              placeholder={`Option ${optionIndex + 1}`}
            />
          ))}
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          appendQuestion({
            questionText: "",
            options: [{ text: "" }, { text: "" }, { text: "" }],
          })
        }
      >
        Add More Questions
      </button>

      <button type="submit">Create Survey</button>
    </form>
  );
}
