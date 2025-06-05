import { SkillForUser } from "@/types";
import { themeDefaultSampleData as sampleData } from "@/theme/sampleData";

// Get sample skills from the sample data
export const sampleSkills = sampleData.data.resume.skillsForUser;

// Helper function to get specific skills by name
export const getSkillByName = (name: string): SkillForUser | undefined => {
  return sampleSkills.find((skill) => skill.skill.name === name);
};

// Common skills used across tests
export const reactSkill = getSkillByName("React") as SkillForUser;
export const javascriptSkill = getSkillByName("JavaScript") as SkillForUser;
export const typescriptSkill = getSkillByName("TypeScript") as SkillForUser;

// Helper to create a skill with missing/invalid data for edge cases
export const createInvalidSkill = (overrides: Partial<SkillForUser> = {}): SkillForUser => ({
  id: "invalid-skill",
  userId: "user1",
  skill: {
    id: "invalid-skill-id",
    name: "",
    icon: "",
  },
  icon: null,
  description: null,
  yearStarted: null,
  totalYears: null,
  ...overrides,
});
