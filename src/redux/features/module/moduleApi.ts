import { baseApi } from "../../api/baseApi";

const moduleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllModules: builder.query({
      query: () => ({
        url: "/module",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllModulesQuery } = moduleApi;
