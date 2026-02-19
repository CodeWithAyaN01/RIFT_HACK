// 3. The API Route (The "Toll Booth")
// WHEN to use it: When you need a doorway for your React app to talk to your Node.js "brain."
// WHY it exists: The React app lives on the user's computer; the AI logic lives on your server. You need a secure, specific "Address" (POST /api/analysis/check) where the React app can drop off its packages.
// HOW it works (The Analogy): This is the front gate of your facility. It has a Security Guard (Multer). When a truck (the React request) arrives, 
// the guard checks if they have the proper cargo (the vcfFile and the drug name). If they do, the guard signs for the package, stores the file in the "Warehouse" (uploads/), 
// and calls the Librarian to start working.

// 4. How to Remember This for Life
// The "Librarian" Pattern (Retrieval): Always filter your data before sending it to an AI.

// The "Form-Filler" Pattern (Generation): Use a strict JSON schema in your prompt so your code can read the AI's answer without crashing.

// The "Warehouse" Pattern (Multer): Use middleware to handle "Heavy Cargo" (files) separate from "Letters" (text data).