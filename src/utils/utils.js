export const errorHandling = (error) => {
  console.log(error);

  if (error.isAxiosError) {
    if (error.code === "ERR_NETWORK")
      return alert("Network error. Please check your internet connection.");

    if (error.response) {
      const { status } = error.response;

      if (status === 403) {
        return alert("API quota exceeded. Please try again later.");

      } else {
        return alert(`Request failed with status ${status}. Please try again.`);
      }
    }

    if (error.code === "ECONNABORTED") {
      return alert("Request timeout. Please check your network connection.");
    } else {
      return alert("An error occurred while fetching data. Please try again later.");
    }

  } else {
    return alert("An unexpected error occurred. Please try again later.");
  }
};
