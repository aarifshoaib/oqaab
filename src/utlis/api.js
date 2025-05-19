// utils/fetchSlides.js

export const fetchapi = async (url) => {
    try {
        const BASE_URL = "https://safaerp.com/apex/oqaab_fashions/";
        const response = await fetch(`${BASE_URL}${url}`);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("API response:", data);
        return { data: data.items, error: null };
    } catch (error) {
        console.error("Error fetching API:", error);
        return { data: null, error };
    }
};
