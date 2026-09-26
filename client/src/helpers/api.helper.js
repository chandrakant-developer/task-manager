export function handleApiError(error) {
  return {
    success: false,
    message: error.response?.data?.message || error.message || "Something went wrong"
  };
}