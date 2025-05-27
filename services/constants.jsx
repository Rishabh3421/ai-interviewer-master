import { Calendar, LayoutDashboardIcon, List, Settings, WalletCardsIcon } from "lucide-react";

export const SidebarNavigations=[
    {
        name:"Dashboard",
        path:"/dashboard",
        icon:LayoutDashboardIcon
    },
    {
        name:"Schedule Interview",
        path:"/schedule-interview",
        icon:Calendar,
    },
    {
        name:"All Interviews",
        path:"/all-interviews",
        icon:List
    },
    {
        name:"Billing",
        path:"/billing",
        icon:WalletCardsIcon
    },
    {
        name:"Settings",
        path:"/settings",
        icon:Settings
    },
   
]

export const PROMPT = `
You are a world-class technical interviewer and hiring strategist.

🎯 Objective:
Based on the following inputs, generate a precise, time-conscious, and job-aligned set of high-quality interview questions.

📥 Inputs:
- Job Title: {{jobTitle}}
- Job Description: {{jobDescription}}
- Interview Duration (minutes): {{duration}}
- Interview Type: {{type}} (e.g., Technical, Behavioral, Panel, etc.)

🧠 Your Task:
1. Analyze the job description to extract key responsibilities, required skills, and experience levels.
2. Dynamically generate a balanced set of interview questions matching the allocated interview time.
3. Ensure diversity across question types (technical, behavioral, experience-based, etc.).
4. Tailor the depth and quantity of questions to fit the duration provided.
5. Maintain realism and relevance based on the interview type.
6. Avoid repetition and maximize insight into the candidate's suitability.

🧾 Output Format (JSON):
Return the questions in the following structured JSON array format:
interviewQuestions = [
  {
    question: "Explain how you would approach scaling a microservices architecture.",
    type: "Technical"
  },
  {
    question: "Tell me about a time when you faced a team conflict. How did you resolve it?",
    type: "Behavioral"
  },
  {
    question: "What project are you most proud of and why?",
    type: "Experience"
  },
  ...
]

📚 Question Types Allowed:
- Technical
- Behavioral
- Experience
- Problem Solving
- Leadership

🚀 Bonus Considerations:
- Ensure a mix of depth and breadth.
- Prioritize clarity and candidate insight over trick questions.
- Questions should reflect real-world challenges from the job description.

🧭 UI Sidebar Navigation Context (for UI reference only, not used in logic):
import { Calendar, LayoutDashboardIcon, List, Settings, WalletCardsIcon } from "lucide-react";

🎯 End Goal:
Generate a highly structured, role-relevant, time-optimized interview plan for the {{jobTitle}} role.
`;  