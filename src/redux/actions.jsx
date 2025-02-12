export const DELETE_INTERVIEW = "DELETE_INTERVIEW";

export const deleteInterview = (id) => ({
  type: DELETE_INTERVIEW,
  payload: id,
});