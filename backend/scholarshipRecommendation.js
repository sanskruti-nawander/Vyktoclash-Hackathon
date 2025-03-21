const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: `You are a smart assistant that recommends scholarships to users based on their input. The user will provide details like academic performance, financial background, gender, field of study, state of residence, and extracurricular activities. Your task is to recommend the most suitable scholarships by listing their names followed by their links from the following categories. Do not include extra information or explanations, just list the scholarship names and their links.
  
  Categories and Scholarships:
  1. Need Based Scholarship
  - HDFC Bank Parivartan's ECSS Programme: https://www.buddy4study.com/page/hdfc-bank-parivartans-ecss-programme
  - National Overseas Scholarship Scheme for SC: https://www.buddy4study.com/scholarship/national-overseas-scholarship-scheme-for-sc
  - IDFC FIRST Bank MBA Scholarship: https://www.buddy4study.com/page/idfc-first-bank-mba-scholarship
  - Sitaram Jindal Foundation Scholarship Scheme: https://www.buddy4study.com/scholarship/sitaram-jindal-foundation-scholarship-scheme
  
  2. Merit-based Scholarship Programmes
  - Aspire Scholarship Program: https://www.buddy4study.com/page/aspire-scholarship-program
  - Saksham Scholarship Program for Driver's Children: https://www.buddy4study.com/page/saksham-scholarship-program-for-drivers-children
  - Virchow Scholarship Program: https://www.buddy4study.com/page/virchow-scholarship-program
  - Legrand Empowering Scholarship Program: https://www.buddy4study.com/page/legrand-empowering-scholarship-program
  - Kotak Kanya Scholarship: https://www.buddy4study.com/page/kotak-kanya-scholarship
  - HDFC Bank Parivartan's ECSS Programme: https://www.buddy4study.com/page/hdfc-bank-parivartans-ecss-programme
  - Keep India Smiling Foundational Scholarship and Mentorship Programme for Sportspersons and Individuals: https://www.buddy4study.com/page/keep-india-smiling-foundational-scholarship-and-mentorship-programme-for-sportsperson-and-individuals
  
  3. Merit-cum-Means Scholarship Programmes
  - Swami Vivekananda Merit-cum-Means Scholarship Scheme for Minorities (West Bengal): https://www.buddy4study.com/scholarship/swami-vivekananda-merit-cum-means-scholarship-scheme-for-minorities-west-bengal
  - NSP National Means-cum-Merit Scholarship Scheme: https://www.buddy4study.com/scholarship/nsp-national-means-cum-merit-scholarship-scheme
  
  4. Sports Scholarship Programmes
  - Jyoti Prakash Scholarship Program: https://www.buddy4study.com/page/jyoti-prakash-scholarship-program
  - Keep India Smiling Foundational Scholarship and Mentorship Programme for Sportspersons and Individuals: https://www.buddy4study.com/page/keep-india-smiling-foundational-scholarship-and-mentorship-programme-for-sportsperson-and-individuals
  - GIIS Global Sports Scholarship: https://www.buddy4study.com/scholarship/giis-global-sports-scholarship
  - Anjum Chopra Scholarship: https://www.buddy4study.com/scholarship/anjum-chopra-scholarship
  - ONGC Sports Scholarship Scheme: https://www.buddy4study.com/scholarship/ongc-sports-scholarship-scheme
  - AAI Sports Scholarship Scheme in India: https://www.buddy4study.com/scholarship/aai-sports-scholarship-scheme-in-india
  
  5. Scholarship Programmes for Women/Female
  - Rolls-Royce Unnati Scholarship for Women Engineering Students: https://www.buddy4study.com/page/rolls-royce-unnati-scholarship-for-women-engineering-students
  - Research Grants for Women Scientists (CSIR-Aspire): https://www.buddy4study.com/scholarship/research-grants-for-women-scientists-csir-aspire
  - SERB Women Excellence Research Grant: https://www.buddy4study.com/scholarship/serb-women-excellence-research-grant
  - State Merit Scholarship for UG Girl Students (Haryana): https://www.buddy4study.com/scholarship/state-merit-scholarship-for-ug-girls-students-Haryana
  - SOF Girl Child Scholarship Scheme (G.C.S.S.): https://www.buddy4study.com/scholarship/sof-girl-child-scholarship-scheme-g-c-s-s
  - Sudakshya for Girls Child Scholarship (Odisha): https://www.buddy4study.com/scholarship/sudakshya-for-girls-child-scholarship-for-st-sc-obc-sebc-general-ebc-communities-odisha
  - CBSE Merit Scholarship Scheme for Single Girl Child: https://www.buddy4study.com/scholarship/cbse-merit-scholarship-scheme-for-single-girl-child
  - AICTE Pragati Scholarship for Girls: https://www.buddy4study.com/page/aicte-pragati-scholarship-for-girls
  - Indira Gandhi Utkrisht Chatravriti Yojana (Himachal Pradesh): https://www.buddy4study.com/page/indira-gandhi-utkrisht-chatravriti-yojana-himachal-pradesh
  - Generation Google Scholarship for Women in Computer Science: https://www.buddy4study.com/scholarship/generation-google-scholarship-for-women-in-computer-science`,
  });
  
const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function getScholarshipRecommendations(userInput) {
  const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          { text: JSON.stringify(userInput) },
        ],
      },
    ],
  });

  const result = await chatSession.sendMessage("Please recommend scholarships based on the provided information.");
  return result.response.text();
}

module.exports = { getScholarshipRecommendations };