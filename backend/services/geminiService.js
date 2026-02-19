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

    const prompt =`Act as an expert clinical pharmacogeneticist. Analyze the following genetic variants: ${geneticText} for the drug: ${drugName}.

STRICT CLINICAL DIRECTIVES:
1. Base all phenotype assignments (PM, IM, NM, RM, UM) strictly on the latest CPIC (Clinical Pharmacogenetics Implementation Consortium) standardized allele activity scores.
2. Note: Use 'NM' for Normal Metabolizer, 'IM' for Intermediate, 'PM' for Poor, 'RM' for Rapid, and 'UM' for Ultrarapid (per updated CPIC standardization).
3. If the drug requires multiple genes for a complete CPIC dosing recommendation (e.g., Warfarin requires both CYP2C9 and VKORC1) and a required gene is missing from the variants, you MUST explicitly state this limitation in the 'rationale'.

Return ONLY a raw, valid JSON object matching this EXACT snake_case schema. Do not include markdown formatting, backticks, or explanatory text outside the JSON.

{
  "patient_id": "PATIENT_MLTVCZF6",
  "drug": "${drugName}",
  "timestamp": "${new Date().toISOString()}",
  "risk_assessment": {
    "risk_label": "Safe|Adjust Dosage|Toxic|Ineffective|Unknown",
    "confidence_score": 0.95,
    "severity": "none|low|moderate|high|critical"
  },
  "pharmacogenomic_profile": {
    "primary_gene": "GENE_SYMBOL",
    "diplotype": "*X/*Y",
    "phenotype": "PM|IM|NM|RM|UM|Unknown",
    "detected_variants": [
      { "rsid": "rsXXXX" }
    ]
  },
  "clinical_recommendation": {
    "action": "Specific actionable dosing advice based on CPIC.",
    "rationale": "Why this action is recommended, explicitly mentioning any missing crucial genes."
  },
  "llm_generated_explanation": {
    "summary": "Brief summary of the gene-drug interaction.",
    "mechanism": "Biological mechanism of the altered metabolism.",
    "clinical_impact": "Expected impact on the patient."
  },
  "quality_metrics": {
    "vcf_parsing_success": true
  }
}`;

    const result = await model.generateContent(prompt);
    let text = result.response.text();
    // Clean markdown if present
    text = text.replace(/```json|```/g, "").trim();
    return JSON.parse(text);
};

module.exports = { analyzeWithGemini };