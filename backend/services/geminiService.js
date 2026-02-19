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

    const prompt =`Act as a board-level clinical pharmacogeneticist with direct CPIC guideline implementation experience.
Analyze the following genetic variants: ${geneticText} for the drug: ${drugName}.

STRICT CLINICAL DIRECTIVES (MANDATORY):
1. Phenotype assignment (PM, IM, NM, RM, UM) MUST be derived exclusively from the latest CPIC standardized allele activity score system for the relevant gene.
   - Do NOT infer phenotype heuristically.
   - Do NOT extrapolate from partial evidence.
   - If allele function or activity score is not explicitly defined by CPIC, assign phenotype as "Unknown".

2. Diplotype-to-phenotype mapping MUST follow CPIC-published activity score thresholds exactly.
   - CYP2D6 activity score boundaries MUST be respected without modification.
   - No dose escalation assumptions are permitted unless explicitly stated in CPIC drug–gene guidelines.

3. Risk classification MUST reflect CPIC clinical intent:
   - Use "Ineffective" when CPIC recommends avoiding the drug due to reduced activation or lack of efficacy.
   - Use "Toxic" only when CPIC indicates increased risk of serious adverse effects.
   - Use "Adjust Dosage" ONLY if CPIC provides an explicit dose modification recommendation.
   - If CPIC recommends an alternative therapy rather than dose adjustment, "Adjust Dosage" MUST NOT be used.

4. If the drug requires multiple genes for a complete CPIC recommendation (e.g., WARFARIN requires CYP2C9 AND VKORC1):
   - You MUST verify presence of all required genes.
   - If any required gene is missing, phenotype-dependent dosing MUST NOT be inferred.
   - This limitation MUST be explicitly stated in the clinical_recommendation.rationale.
   - Risk label should be downgraded appropriately (e.g., "Unknown" if dosing cannot be determined).

5. Clinical recommendations MUST:
   - Be directly traceable to CPIC guideline intent.
   - Avoid vague phrasing such as "consider monitoring" unless CPIC explicitly states this.
   - Prefer alternative drug recommendations when CPIC advises avoidance.

6. Explanations MUST remain biologically accurate and clinically conservative.
   - No speculative mechanisms.
   - No generalized pharmacogenomics logic beyond CPIC guidance.

Return ONLY a raw, valid JSON object matching this EXACT snake_case schema.
Do not include markdown, backticks, commentary, or any text outside the JSON.

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
    "action": "Specific actionable dosing or avoidance advice explicitly aligned with CPIC.",
    "rationale": "CPIC-based justification, explicitly stating any missing required genes if applicable."
  },
  "llm_generated_explanation": {
    "summary": "Concise CPIC-aligned summary of the gene–drug interaction.",
    "mechanism": "Established biological mechanism affecting drug metabolism or response.",
    "clinical_impact": "Expected clinical outcome based on CPIC phenotype interpretation."
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