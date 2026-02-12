const BASE_URL = "https://potterapi-fedeperin.vercel.app";

//Helper to build query string
const buildQueryString = (params) => {
  const query = new URLSearchParams(params);
  return query.toString();
};

// Generic Fetch Function
export const fetchData = async (endpoint, lang = "en", params = {}) => {
  const queryString = buildQueryString(params);

  const url = `${BASE_URL}/${lang}/${endpoint}${
    queryString ? `?${queryString}` : ""
  }`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
