import { baseApi } from "../../api/baseApi";

const quizApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addQuiz: builder.mutation({
      query: (data) => ({
        url: "/quiz",
        method: "POST",
        body: data,
      }),
    }),

    getAllQuizByModuleId: builder.query({
      query: (moduleId) => ({
        url: `/quiz?module=${moduleId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useAddQuizMutation, useGetAllQuizByModuleIdQuery } = quizApi;
