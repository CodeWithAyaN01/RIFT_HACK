// 1. The VCF Parser (The "Librarian")
// WHEN to use it: Whenever you have a massive raw data file (like a 5MB genetic report) and you only need a tiny fraction of it.
// WHY it exists: You cannot send a 5MB file to an AI. It's too expensive, too slow, and contains "noise" that confuses the AI. You need to "Retrieve" only the relevant data first.
// HOW it works (The Analogy): Imagine a 5,000-page book of 
// city records. 
// You only care about the 6 Highway Checkpoints (the genes). The Librarian (the parser) doesn't read 
// the whole book; they just run their finger down the page, ignore the headers (#), and only stop when they see the word "CYP2D6" or "TPMT". They rip those 
// lines out and hand them to you.