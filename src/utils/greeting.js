export const getGreetingWithDate = () => {
  // Get current date and time
  const now = new Date();

  // Extract current hour (0–23)
  const hours = now.getHours();

  let greeting;

  // Determine greeting based on time
  switch (true) {
    case hours < 12:
      greeting = "Good Morning";
      break;

    case hours < 18:
      greeting = "Good Afternoon";
      break;

    default:
      greeting = "Good Evening";
  }

  // Extract date parts
  const day = now.getDate();
  const month = now.toLocaleString("default", { month: "long" });
  const year = now.getFullYear();

  // Format date as: "13 June, 2025"
  const date = `${day} ${month}, ${year}`;

  // Return greeting and formatted date
  return { greeting, date };
};
