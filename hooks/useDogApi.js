import { useState, useEffect } from "react";

export default function useDogApi() {
  const MIN_SPINNER_VISIBLE_MS = 350;

  // State variables
  const [currentDog, setCurrentDog] = useState(null);
  // Fetching state
  const [isFetching, setIsFetching] = useState(false);
  // Spinner visibility state
  const [showSpinner, setShowSpinner] = useState(false);

  // Function to fetch a random dog image
  const fetchDog = async () => {
    if (isFetching) return;

    const startedAt = Date.now();
    setIsFetching(true);
    setShowSpinner(true);

    try {
      // Fetch a random dog image from the API
      const response = await fetch("https://dog.ceo/api/breeds/image/random");
      const data = await response.json();
      // Update the current dog image URL
      setCurrentDog(data.message);
    } catch (error) {
      console.error("Error fetching dog image:", error);
      // finally block will execute regardless of success or failure of the fetch
    } finally {
      const elapsed = Date.now() - startedAt;

      if (elapsed < MIN_SPINNER_VISIBLE_MS) {
        await new Promise((resolve) =>
          setTimeout(resolve, MIN_SPINNER_VISIBLE_MS - elapsed),
        );
      }

      // Hide the spinner and reset fetching state
      setShowSpinner(false);
      setIsFetching(false);
    }
  };

  // Fetch a dog image when the component mounts
  useEffect(() => {
    fetchDog();
  }, []);

  return { currentDog, isFetching, showSpinner, fetchDog };
}
