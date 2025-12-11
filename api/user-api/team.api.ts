import { baseApi } from "../baseApi";

export const teamApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEmployees: builder.query({
      query: () => "/auth/company/employee/"
    }),
    updateEmployeeRoles: builder.mutation({
      query: ({ id, body }: { id: number; body: any }) => ({
         url: `/auth/company/employee/update-permissions/${id}/`,
         method: "POST",
         body
      })
    })
  }),
});

export const { useGetEmployeesQuery, useUpdateEmployeeRolesMutation } = teamApi;
