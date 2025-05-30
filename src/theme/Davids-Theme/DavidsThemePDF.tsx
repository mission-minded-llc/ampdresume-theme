import { Company, Education as EducationType, SkillForUser, User } from "@/types";
import { ThemeDefaultPDF } from "@/theme/default/ThemeDefaultPDF";

interface PDFViewProps {
  user: User;
  skillsForUser: SkillForUser[];
  companies: Company[];
  education: EducationType[];
}

export const ThemeDavidsThemePDF = ({
  user,
  skillsForUser,
  companies,
  education,
}: PDFViewProps) => {
  return (
    <ThemeDefaultPDF
      user={user}
      skillsForUser={skillsForUser}
      companies={companies}
      education={education}
    />
  );
};
