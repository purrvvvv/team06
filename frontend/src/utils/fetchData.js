// export const fetchSentiments = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/portfolio/sentiment");
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
  
//       // Parse the sentiment data into a usable format
//       let parsedSentiments = {};
  
//       data.forEach((item) => {
//         if (typeof item === "string") {
//           const lines = item.split("\r\n"); // Split the string into lines
//           lines.forEach((line) => {
//             const match = line.match(/Stock: (\w+), Recommendation: (\w+)/); // Match stock and recommendation
//             if (match) {
//               const [_, stock, recommendation] = match;
//               parsedSentiments[stock] = recommendation; // Add to parsedSentiments
//             }
//           });
//         }
//       });
  
//       return parsedSentiments;
//     } catch (err) {
//       console.error("Error fetching sentiment data:", err);
//       throw err;
//     }
//   };
  
  