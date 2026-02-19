// 2. The Gemini Service (The "Specialist")
// WHEN to use it: When you have the facts (the genes) but you need an expert interpretation (clinical advice) in a very specific format (JSON).
// WHY it exists: Code can find the data, but it doesn't "understand" what a *2/*3 diplotype means for Warfarin. The LLM acts as the bridge between raw data and medical wisdom.
// HOW it works (The Analogy): You hand the 
// Librarian's notes to a world-class Geneticist. You don't just ask, "What is this?" You give them a Strict Questionnaire (the Prompt). You tell them: "Look at these notes. Fill out this JSON form. 
// Do not add extra words. Use these exact labels." The "Generation" part is just the AI filling out your form based on the notes you provided.

const { GoogleGenerativeAI } = require("@google/generative-ai");


const analyzeWithGemini = async (geneticText, drugName) => {
    
    const genAI = new GoogleGenerativeAI(process.env.GEMINI);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt =`
Analyze these variants: ${geneticText} for drug: ${drugName}.
Return ONLY valid JSON matching this exact schema:

{
  "patient id": "PATIENT_001",
  "drug": "${drugName}",
  "timestamp": "${new Date().toISOString()}",
  "risk assessment": {
    "risk label": "Safe|Adjust Dosage|Toxic|Ineffective|Unknown",
    "confidence_score": 0.9,
    "severity": "none|low|moderate|high|critical"
  },
  "pharmacogenomic_profile": {
    "primary_gene": "GENE_SYMBOL",
    "diplotype": "*X/*Y",
    "phenotype": "PM|IM|NM|RM|URM|Unknown",
    "detected variants": [
      { "rsid": "rsXXXX" }
    ]
  },
  "clinical recommendation": "Dosing advice here.",
  "lim_generated_explanation": {
    "summary": "Biological mechanism summary."
  },
  "quality_metrics": {
    "vcf_parsing_success": true
  }
}

Note: Use 'NM' for Normal Metabolizer, 'IM' for Intermediate, 'PM' for Poor, 'RM' for Rapid, and 'URM' for Ultrarapid. 
DO NOT deviate from these keys or abbreviations.`;

    const result = await model.generateContent(prompt);
    let text = result.response.text();
    // Clean markdown if present
    text = text.replace(/```json|```/g, "").trim();
    return JSON.parse(text);
};

module.exports = { analyzeWithGemini };