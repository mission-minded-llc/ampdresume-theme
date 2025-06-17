/**
 * The types defined here are used to provide strong typing and structure for the data
 * used in various Amp'd Resume themes.
 */

/**
 * The appearance of the theme, which can be either "dark" or "light".
 * This value is used to determine the color scheme of the theme, and gets passed
 * in from the parent component. The parent Amp'd Resume site has its own theme toggle,
 * which can be used to switch between the two appearances - this should NOT be
 * overridden by the theme.
 */
export type ThemeAppearance = "dark" | "light";

/**
 * The name of the theme, which is used to determine the theme's appearance and
 * other settings. This value should be in slug format, with lowercase letters and
 * dashes instead of spaces. This value is used to determine which theme gets rendered
 * on the Amp'd Resume site, and should be unique to each theme.
 */
export type ThemeName = "default" | "davids"; // Add more themes here, e.g. "default" | "my-theme" | "another-theme"

/**
 * The ThemeAuthor interface is used to define the author of a theme
 * and their social media links. These values are used to display the author's
 * name and links to their GitHub and LinkedIn profiles, and may appear in the footer
 * of a theme, or in meta tags.
 */
export type ThemeAuthor = {
  name: string;
  gitHubUrl?: string;
  linkedInUrl?: string;
};

/**
 * The ThemeDefinition interface is used to define the definition of a theme.
 * This interface is used to define the theme's name, description, and authors.
 */
export type ThemeDefinition = {
  // The name of the theme, which is used to display the theme in the UI.
  // This is not the same as the slug, which is used to identify the theme in the URL
  // and in the database of the backend. The slug is not a property here, because it comes
  // from the key of the themeDefinitions object in the theme/index.ts file.
  name: string;

  // Whether the theme is published to the Amp'd Resume site on production.
  published: boolean;

  // The description of the theme, which is used to describe the theme in the UI.
  description: string;

  // The iconify icon of the theme, which is used to display the theme in the UI.
  iconifyIcon: string;

  // The authors of the theme, which are used to display the authors of the theme in the UI,
  // and in the SEO meta tags.
  authors: ThemeAuthor[];

  // TODO: Replace data types with ResumeData after the backend is updated to
  // include the new fields for Certifications and FeaturedProjects.
  webComponent: React.ComponentType<{
    themeAppearance: ThemeAppearance;
    user: User;
    socials: Social[];
    skillsForUser: SkillForUser[];
    companies: Company[];
    education: Education[];
  }>;
  pdfComponent: React.ComponentType<{
    themeAppearance: ThemeAppearance;
    user: User;
    socials: Social[];
    skillsForUser: SkillForUser[];
    companies: Company[];
    education: Education[];
  }> | null;
};

/**
 * The ResumeData object is the main data object that contains all the user's information,
 * including their personal details, social media links, skills, work experience, education,
 * and other details. This object is used to render the user's resume in the UI.
 */
export interface ResumeData {
  user: User;
  socials: Social[];
  skillsForUser: SkillForUser[];
  companies: Company[];
  // TODO: Ensure FeaturedProject and Certification are required after the backend is updated.
  featuredProjects?: FeaturedProject[];
  certifications?: Certification[];
  education: Education[];
}

/**
 * The ResponseData object is the main response data object that contains the resume data.
 * This is the primary data {object} that is fetched from the backend API.
 */
export interface ResponseData {
  resume: ResumeData;
}

/**
 * The Response object is the main response object that is fetched from the backend API.
 */
export interface Response {
  data: ResponseData;
}

/**
 * A User is the main user item associated with the resume, which contains the user's personal
 * information, such as their name, email, location, title, and other details.
 */
export interface User {
  id: string;

  // The user's name, e.g. "John Doe".
  name: string | null;

  // The user's display email, e.g. "johndoe@otheremail.com"
  // This is the email that gets displayed in the UI.
  displayEmail: string | null;

  // The user's location, e.g. "San Francisco, CA". It is not strict, so a location is never verified.
  location: string | null;

  // The user's title, e.g. "Software Engineer".
  title: string | null;

  // The user's summary or bio text that appears on their resume.
  summary?: string;
}

/**
 * A Social is a single social media item associated with a user, which contains the user's
 * social media platform and reference, e.g. "GitHub" and "johndoe".
 */
export interface Social {
  // The unique ID defined by Prisma in the backend.
  // From here forward, any "id" property is a unique ID defined by Prisma.
  id: string;

  // The unique ID of the user associated with this social.
  // From here forward, any "userId" property is a unique ID defined by Prisma.
  // The same goes for any "[entity]Id" property.
  userId: string;

  // The social media platform name, represented as a web address, e.g.
  // "x.com", "linkedin.com"
  // See the SOCIAL_MEDIA_PLATFORMS constant for a list of platforms.
  // TODO: Make this strict!
  platform: string;

  // The reference for the social media platform, e.g. "johndoe".
  // This is the username or handle for the social media platform.
  ref: string;
}

/**
 * A Skill is a single global skill item defined by Amp'd Resume's database. One or more of these
 * can be associated with a SkillForUser or SkillForProject, which are used to define a user's
 * skills and a project's skills, respectively.
 */
export interface Skill {
  id: string;

  // The name of the skill, e.g. "JavaScript", "React", "Node.js", etc.
  name: string;

  // The icon of the skill, which can be an iconify icon string, e.g. "logos:react", or null.
  icon: string | null | undefined;
}

/**
 * The type of skill, which can be either "project" or "user". This value is used to determine
 * how to render a specific skill.
 */
export type SkillType = "project" | "user";

/**
 * A SkillForUser is a single Skill item associated with a user, which can include additional
 * information such as a customized icon, description, and years of experience.
 */
export interface SkillForUser {
  id: string;
  userId: string;

  // The global skill item associated with this skill for the user.
  skill: Skill;

  // The icon of the skill for the user, which can be an iconify icon string, e.g. "logos:react", or null.
  icon: string | null | undefined;

  // A description of the skill for the user, e.g. "Proficient in React and Redux".
  // Appears when the user clicks on the skill in the UI, and can contain HTML, images, etc.
  // The same goes for any "description" property moving forward.
  description?: string | null;

  // The years of experience the user has with this skill is auto-calculated based on the
  // "yearStarted" value, if provided.
  yearStarted?: number | null;

  // The total years of experience the user has with this skill. If this value is NOT null,
  // it will be used instead of the auto-calculated value.
  totalYears?: number | null;
}

/**
 * A SkillForProject is a single Skill item associated with a project, which can include additional
 * customized description to describe the skill's use in the project.
 */
export interface SkillForProject {
  id: string;
  description: string | null;

  // The unique ID of the SkillForUser associated with this project.
  skillForUser: SkillForUser;
}

/**
 * A Company is a single company item associated with a user's work experience. Think of a "company"
 * as being a section within a resume, which can contain one or more positions.
 */
export interface Company {
  id: string;
  name: string;

  // The location of the company, e.g. "San Francisco, CA". This value is not strict,
  // so a location is never verified as being accurate.
  location: string;

  // The start date of the user's employment at this company, e.g. "1642753877364".
  // This value is a UTC timestamp in milliseconds, but gets displayed as a month/year format.
  // The specific day is not necessary, as it is not displayed in the UI, however it's recommended
  // to use the second day of the month for consistency, and to avoid timezone issues.
  startDate: string;

  // If an end date is provided, it means the user no longer works at this company.
  // If this value is null, it means the user currently works at this company.
  endDate: string | null;

  // The positions associated with this company, which can contain one or more positions.
  // This can help show the user's progression within the company, or if they held multiple roles.
  positions?: Position[];

  // The total number of positions associated with this company.
  positionCount?: number;
}

/**
 * A Position is a single position item associated with a company. Think of a "position" as
 * being a section within a company, which can contain one or more projects.
 */
export interface Position {
  id: string;

  // The title of the user's position at this company, e.g. "Software Engineer".
  title: string;

  // The start and end date format follows the same rules as the company's start and end date.
  startDate: string;
  endDate: string | null;

  // The projects associated with this position, which can contain one or more projects.
  projects?: Project[];

  // The total number of projects associated with this position.
  projectCount?: number;
}

/**
 * A Project is a single project item associated with a position. Think of a "project" as
 * being a bullet point line-item within a resume.
 */
export interface Project {
  id: string;

  // The name of the project is the text within the bullet point. It can be a sentence-like
  // description of the project, e.g. "Developed a new React component for the company's website".
  name: string;
  description: string | null;

  // The skills associated with this project, which can contain one or more skills specific to this project.
  skillsForProject: SkillForProject[];

  // The sort index of the project, which determines the order in which the projects are displayed.
  // The lower the number, the higher the project appears in the list.
  sortIndex: number;
}

/**
 * A SkillForFeaturedProject is a single SkillForUser item associated with a featured project,
 * which can include additional customized information such as a description.
 */
export interface SkillForFeaturedProject {
  id: string;
  description: string | null;

  skillForUser: SkillForUser;
}

/**
 * The FeaturedProject interface is used to define a project that is featured on the user's resume.
 * This interface is used to render the project in the UI, and is used to define the project's
 * name, description, links, and skills.
 */
export interface FeaturedProject {
  id: string;

  // The name of the featured project, e.g. "My Awesome Project"
  name: string;

  // The description of the featured project, e.g. "A description of my awesome project"
  description: string | null;

  // The links associated with the featured project, e.g. { label: "GitHub", url: "https://github.com/johndoe/my-awesome-project" }
  links: { label: string; url: string }[];

  // The skills associated with the featured project, which can contain one or more skills specific to this project.
  skillsForFeaturedProject: SkillForFeaturedProject[];
}

/**
 * An Education is a single education item associated with a user's education history.
 */
export interface Education {
  id: string;

  // The name of the school the user attended, e.g. "University of California, Berkeley".
  // If the user attended multiple schools, each school should be a separate Education item.
  // If repeating the same school, they will be grouped in the frontend.
  school: string;

  // The degree the user earned at this school, e.g. "Bachelor of Science in Computer Science".
  degree: string;

  // The date awarded in timestamp format. It is displayed as a month/year format.
  dateAwarded: string;
}

// Certification type for the Certifications section
export interface Certification {
  // Certification name
  name: string;

  // Issuing Organization
  issuer: string;

  // Date Earned or Expected
  dateAwarded: string;

  // Credential URL
  credentialUrl?: string | null;

  // Credential ID
  credentialId?: string | null;
}
