import { Company, Education as EducationType, SkillForUser, User } from "@/types";

import { ThemeDefaultPDF } from "@/theme/default/ThemeDefaultPDF";

interface PDFViewProps {
  user: User;
  skillsForUser: SkillForUser[];
  companies: Company[];
  education: EducationType[];
}

/**
 * TODO: Remove tight coupling between the PDF and the theme.
 * We currently can't change the theme without also changing the PDF.
 */
export const ThemeDavidsPDF = ({ user, skillsForUser, companies, education }: PDFViewProps) => (
  <ThemeDefaultPDF
    user={user}
    skillsForUser={skillsForUser}
    companies={companies}
    education={education}
  />
);
