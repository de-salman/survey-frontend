"use client";

import { useForm, useFieldArray } from "react-hook-form";
import api from "../services/api";
import jwt from "jsonwebtoken";

export default function CreateSurvey() {
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      title: "",
      questions: [
        {
          questionText: "",
          options: [{ text: "" }, { text: "" }, { text: "" }],
        },
      ],
    },
  });

  const {
    fields: questionFields,
    append: appendQuestion,
    remove: removeQuestion,
  } = useFieldArray({
    control,
    name: "questions",
  });

  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Token is missing, please log in.");
      return;
    }

    // Format the data to ensure each option is an object with a text field
    const formattedData = {
      title: data.title,
      questions: data.questions.map((question) => ({
        questionText: question.questionText,
        options: question.options.map((option) => ({ text: option.text })),
      })),
      createdBy: jwt.decode(token).id, // Get user ID from token
    };

    try {
      await api.post("/survey/create", formattedData);
      alert("Survey created successfully!");
    } catch (error) {
      console.error("Error creating survey:", error);
      alert("Failed to create survey.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-8 lg:px-16">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Create a New Survey
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Survey Title */}
          <div>
            <input
              {...register("title")}
              placeholder="Survey Title"
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Questions */}
          {questionFields.map((question, questionIndex) => (
            <div key={question.id} className="border p-4 rounded-md mb-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold text-gray-700">
                  Question {questionIndex + 1}
                </h3>
                <button
                  type="button"
                  onClick={() => removeQuestion(questionIndex)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove Question
                </button>
              </div>

              {/* Question Text Input */}
              <input
                {...register(`questions.${questionIndex}.questionText`)}
                placeholder="Enter Question"
                className="w-full p-2 border rounded mb-3"
              />

              {/* Options for the Question */}
              <div className="space-y-2">
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex}>
                    <input
                      {...register(
                        `questions.${questionIndex}.options.${optionIndex}.text`
                      )}
                      placeholder={`Option ${optionIndex + 1}`}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Add More Questions */}
          <div className="flex flex-row space-x-4">
            <button
              type="button"
              onClick={() =>
                appendQuestion({
                  questionText: "",
                  options: [{ text: "" }, { text: "" }, { text: "" }],
                })
              }
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
            >
              Add More Questions
            </button>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-300"
            >
              Create Survey
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
