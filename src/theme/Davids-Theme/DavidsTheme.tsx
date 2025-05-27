import {
    ThemeProvider,
    createTheme,
    Fade,
    Box,
    Tabs,
    Tab,
    IconButton,
  } from "@mui/material";
  import { TextField, InputAdornment, Menu, MenuItem } from "@mui/material";
  import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
  import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
  import NavigateNextIcon from "@mui/icons-material/NavigateNext";
  import { useState, useMemo } from "react";
  import { Icon } from "@iconify/react";
  import { MuiLink } from "@/components/MuiLink";
  import { generateSocialUrl, getSocialIcon } from "@/util/social";
  
  import {
    Company,
    Education as EducationType,
    SkillForUser,
    Social,
    User,
    Certification,
    SkillForProject,
    FeaturedProject,
  } from "@/types";

  import { Skills } from "@/theme/default/components/Skills/Skills";
  import { WorkExperience } from "@/theme/default/components/WorkExperience/WorkExperience";
  import { Education } from "@/theme/default/components/Education";
  
  /* ----------  LOCAL TYPES ---------- */
  // Remove the ProjectSection interface definition - it's now in types/index.ts as FeaturedProject

  export const ThemeDavidsTheme = ({
    user = {
      id: "1",
      name: "Test User",
      displayEmail: "testuser@gmail.com",
      location: "San Francisco, CA",
      title: "Senior Staff Software Engineer",
    },
    socials = [
      { id: "1", userId: "1", platform: "linkedin.com", ref: "testuser" },
      { id: "2", userId: "1", platform: "github.com", ref: "testuser" },
      { id: "3", userId: "1", platform: "twitter.com", ref: "testuser" },
    ],
    skillsForUser = [
      {
        id: "1",
        userId: "1",
        skill: { id: "1", name: "TypeScript", icon: null },
        icon: null,
        description: "Expert in TypeScript for large-scale applications.",
        yearStarted: 2014,
        totalYears: 10,
      },
      {
        id: "2",
        userId: "1",
        skill: { id: "2", name: "React", icon: null },
        icon: null,
        description: "Built and led React projects at scale.",
        yearStarted: 2015,
        totalYears: 9,
      },
      {
        id: "3",
        userId: "1",
        skill: { id: "3", name: "Node.js", icon: null },
        icon: null,
        description: "Architected Node.js microservices.",
        yearStarted: 2013,
        totalYears: 11,
      },
      {
        id: "4",
        userId: "1",
        skill: { id: "4", name: "AWS", icon: null },
        icon: null,
        description: "Designed cloud infrastructure on AWS.",
        yearStarted: 2016,
        totalYears: 8,
      },
      {
        id: "5",
        userId: "1",
        skill: { id: "5", name: "Kubernetes", icon: null },
        icon: null,
        description: "Deployed and managed Kubernetes clusters.",
        yearStarted: 2017,
        totalYears: 7,
      },
    ],
    companies = [
      {
        id: "1",
        name: "Tech Innovators Inc.",
        location: "San Francisco, CA",
        startDate: "1451606400000", // Jan 2016
        endDate: null,
        positions: [
          {
            id: "1",
            title: "Senior Staff Software Engineer",
            startDate: "1451606400000",
            endDate: null,
            projects: [
              {
                id: "1",
                name: "NextGen Platform Migration",
                description: "Led migration of legacy systems to a scalable cloud-native platform using Kubernetes and AWS.",
                skillsForProject: [],
                sortIndex: 0,
              },
              {
                id: "2",
                name: "Realtime Analytics Engine",
                description: "Architected and implemented a real-time analytics engine processing millions of events per day.",
                skillsForProject: [],
                sortIndex: 1,
              },
            ],
            projectCount: 2,
          },
        ],
        positionCount: 1,
      },
      {
        id: "2",
        name: "Cloud Solutions LLC",
        location: "Remote",
        startDate: "1388534400000", // Jan 2014
        endDate: "1451520000000", // Dec 2015
        positions: [
          {
            id: "2",
            title: "Lead Software Engineer",
            startDate: "1388534400000",
            endDate: "1451520000000",
            projects: [
              {
                id: "3",
                name: "API Gateway Development",
                description: "Designed and built a secure, high-throughput API gateway in Node.js.",
                skillsForProject: [],
                sortIndex: 0,
              },
            ],
            projectCount: 1,
          },
        ],
        positionCount: 1,
      },
    ],
    education = [
      {
        id: "1",
        school: "Stanford University",
        degree: "B.S. Computer Science",
        dateAwarded: "1370044800000", // June 2013
      },
    ],
    projects = [
      {
        name: "Cloud Cost Optimizer",
        techStack: "TypeScript, AWS Lambda, DynamoDB",
        description: [
          "Developed a tool to analyze and reduce cloud spend, saving 30% on infrastructure costs.",
          "Integrated with AWS APIs for real-time monitoring.",
        ],
        metrics: "Saved $500K annually in cloud costs.",
        links: [
          { label: "GitHub", url: "https://github.com/testuser/cloud-cost-optimizer" },
        ],
      },
      {
        name: "DevOps Dashboard",
        techStack: "React, Node.js, Kubernetes",
        description: [
          "Built a dashboard for monitoring CI/CD pipelines and deployments.",
          "Enabled real-time alerts and visualizations for engineering teams.",
        ],
        metrics: "Adopted by 10+ teams across the org.",
        links: [],
      },
    ],
    certifications = [
      {
        name: "AWS Certified Solutions Architect – Professional",
        issuer: "Amazon Web Services",
        date: "2022",
        credentialUrl: "https://aws.amazon.com/certification/certified-solutions-architect-professional/",
      },
      {
        name: "Certified Kubernetes Administrator (CKA)",
        issuer: "Cloud Native Computing Foundation",
        date: "2021",
        credentialUrl: "https://www.cncf.io/certification/cka/",
      },
    ],
  }: {
    user?: User;
    socials?: Social[];
    skillsForUser?: SkillForUser[];
    companies?: Company[];
    education?: EducationType[];
    projects?: FeaturedProject[];
    certifications?: Certification[];
  }) => {
    /* ----------  FALLBACK SAMPLE DATA ---------- */
    const defaultProjects: FeaturedProject[] = [
      {
        name: "QuickCurrency",
        techStack: "Flutter, Firebase, FreeCurrencyAPI",
        description: [
          "Built a real-time currency conversion app with 6 supported currencies, history tracking, and a graphing feature.",
          "Integrated Firebase for user authentication and Firestore to store exchange rate history.",
          "Achieved 300+ app loads with daily exchange rate updates and persistent user data.",
        ],
        skillsForProject: [],
      },
    ];

    const defaultCertifications: Certification[] = [
      {
        name: "AWS Certified Cloud Practitioner",
        issuer: "Amazon Web Services",
        date: "Expected June 2025",
      },
    ];

    // Use provided data if available, otherwise fall back to default examples
    const projectData = (typeof projects !== 'undefined' && projects.length > 0)
      ? projects
      : (typeof (window as any) === 'undefined' ? defaultProjects : []);
    const certificationData = (typeof certifications !== 'undefined' && certifications.length > 0)
      ? certifications
      : (typeof (window as any) === 'undefined' ? defaultCertifications : []);

    /* ----------  SECTION DATA ---------- */
    // Add state for skill filter and filter type
    const [skillFilter, setSkillFilter] = useState("");
    const [filterType, setFilterType] = useState<"skill" | "years">("skill");
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [active, setActive] = useState<number>(0);

    const handleDropdownClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleDropdownClose = (type?: "skill" | "years") => {
      if (type) setFilterType(type);
      setAnchorEl(null);
    };

    // Filter skills based on skillFilter input and filterType
    const filteredSkillsForUser = useMemo(() => {
      if (!skillFilter.trim()) return skillsForUser;
      const filter = skillFilter.trim().toLowerCase();
      return skillsForUser.filter((s) => {
        if (filterType === "skill") {
          return s.skill.name.toLowerCase().includes(filter);
        } else {
          let years = s.totalYears;
          if (years == null && s.yearStarted != null) {
            years = new Date().getFullYear() - s.yearStarted;
          }
          const filterNum = Number(filter);
          return !isNaN(filterNum) && years != null && years >= filterNum;
        }
      });
    }, [skillFilter, skillsForUser, filterType]);
    

    const sections: { label: string; render: JSX.Element | null }[] = [
      {
        label: "Skills",
        render:
          skillsForUser?.length ? (
            <Box>
              <Box sx={{ mb: 2, display: "flex", alignItems: "center" }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder={filterType === "skill" ? "Enter Skill" : "Enter Years of Experience"}
                  value={skillFilter}
                  onChange={e => setSkillFilter(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleDropdownClick} edge="end">
                          <ArrowDropDownIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ background: "#fff" }}
                />
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={() => handleDropdownClose()}
                >
                  <MenuItem onClick={() => handleDropdownClose("skill")}>Skill</MenuItem>
                  <MenuItem onClick={() => handleDropdownClose("years")}>Years of Experience</MenuItem>
                </Menu>
              </Box>
              <Skills skillType="user" skillsForUser={filteredSkillsForUser} />
            </Box>
          ) : null,
      },
      {
        label: "Work Experience",
        render:
          companies?.length ? (
            <Box component="section">
              <Box component="h2" sx={{ fontWeight: "bold", fontSize: "1.5rem", mt: 4, mb: 2 }}>Work Experience</Box>
              {companies.map((company) => (
                <Box key={`company-${company.id}`} sx={{ mt: 0 }}>
                  <Box component="h3" sx={{ textAlign: "center", fontWeight: "bold", fontSize: "1.2rem", pt: 2 }}>{company.name}
                    <Box component="div" sx={{ fontWeight: "normal", fontSize: "1rem", mt: 1 }}>
                      {company?.location ? `${company.location}, ` : ""}
                      {company?.startDate ? new Date(Number(company.startDate)).toLocaleDateString(undefined, { year: 'numeric', month: 'short' }) : ""}
                      {" to "}
                      {company?.endDate ? new Date(Number(company.endDate)).toLocaleDateString(undefined, { year: 'numeric', month: 'short' }) : "Present"}
                    </Box>
                  </Box>
                  {company.positions?.map((position) => (
                    <Box key={`position-${position.id}`} sx={{ mt: 2, mb: 2, textAlign: "center" }}>
                      <Box component="h4" sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>{position.title}</Box>
                      <Box sx={{ fontSize: "0.95rem", color: "#333", mb: 1 }}>
                        {position?.startDate ? new Date(Number(position.startDate)).toLocaleDateString(undefined, { year: 'numeric', month: 'short' }) : ""}
                        {" to "}
                        {position?.endDate ? new Date(Number(position.endDate)).toLocaleDateString(undefined, { year: 'numeric', month: 'short' }) : "Present"}
                      </Box>
                      {position.projects?.map((project) => (
                        <Box key={`project-${project.id}`} sx={{ mb: 2, textAlign: "left", borderBottom: "1px solid #e0e0e0", pb: 1 }}>
                          <Box sx={{ fontWeight: "bold" }}>{project.name}</Box>
                          {project.description && <Box sx={{ fontStyle: "italic", mb: 0.5 }}>{project.description}</Box>}
                          {/* Show project skills if present */}
                          {Array.isArray(project.skillsForProject) && project.skillsForProject.length > 0 && (
                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
                              {project.skillsForProject.map((skillForProject) => (
                                <Box key={skillForProject.id} sx={{ display: "inline-block", background: "#bbdefb", color: "#0d47a1", borderRadius: 2, px: 1, py: 0.5, fontSize: "0.9rem", mr: 1, mb: 1 }}>
                                  {skillForProject.skillForUser?.skill?.name}
                                </Box>
                              ))}
                            </Box>
                          )}
                        </Box>
                      ))}
                    </Box>
                  ))}
                </Box>
              ))}
            </Box>
          ) : null,
      },
      {
        label: "Education",
        render: education?.length ? <Education education={education} /> : null,
      },
      {
        label: "Projects",
        render: projectData.length ? (
          <Box>
            {projectData.map((proj, idx) => {
              // Ensure every project has skillsForProject (default to empty array)
              const skillsForProject = Array.isArray(proj.skillsForProject) ? proj.skillsForProject : [];
              const safeProj = { ...proj, skillsForProject };
              return (
                <Box key={safeProj.name} sx={{ mb: 3 }}>
                  <Box component="h3" sx={{ fontWeight: "bold", mb: 0.5 }}>{safeProj.name}</Box>
                  <Box sx={{ fontStyle: "italic", mb: 0.5 }}>{safeProj.techStack}</Box>
                  <ul style={{ marginTop: 0, marginBottom: 0 }}>
                    {safeProj.description.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                  {safeProj.metrics && <Box sx={{ mt: 0.5 }}>{safeProj.metrics}</Box>}
                  {safeProj.links && safeProj.links.length > 0 && (
                    <Box sx={{ mt: 0.5 }}>
                      {safeProj.links.map((link, idx) => (
                        <a
                          key={idx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ marginRight: 8 }}
                        >
                          {link.label}
                        </a>
                      ))}
                    </Box>
                  )}
                  {safeProj.skillsForProject.length > 0 && (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
                      {safeProj.skillsForProject.map((skillForProject) => (
                        <Box key={skillForProject.id} sx={{ display: "inline-block", background: "#bbdefb", color: "#0d47a1", borderRadius: 2, px: 1, py: 0.5, fontSize: "0.9rem", mr: 1, mb: 1 }}>
                          {skillForProject.skillForUser?.skill?.name}
                        </Box>
                      ))}
                    </Box>
                  )}
                </Box>
              );
            })}
          </Box>
        ) : null,
      },
      {
        label: "Certifications",
        render: certificationData.length ? renderCertifications() : null,
      },
    ];
  
    const cycle = (delta: number) => {
      setActive((prev) => (prev + delta + sections.length) % sections.length);
    };

    /* ----------  HELPER RENDER FUNCTIONS ---------- */
    function renderCertifications() {
      return (
        <Box>
          {certificationData.map((cert) => (
            <Box key={cert.name} sx={{ mb: 3 }}>
              <Box component="h3" sx={{ fontWeight: "bold", mb: 0.5 }}>
                {cert.name}
              </Box>
              <Box sx={{ mb: 0.5 }}>
                {cert.issuer}
                {cert.date && ` – ${cert.date}`}
              </Box>
              {cert.credentialUrl && (
                <Box>
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Credential
                  </a>
                </Box>
              )}
            </Box>
          ))}
        </Box>
      );
    }
  
    /* ----------  DARK-NAVY THEME ---------- */
    const navyTheme = createTheme({
      palette: {
        mode: "light",
        background: {
          default: "#0d47a1", // light blue page background
          paper: "#bbdefb",   // card/paper background
        },
        primary: {
          main: "#0d47a1",   // navy blue accents
          dark: "#08306b",
          light: "#bbdefb",  // used for skill pill background
          contrastText: "#000000", // text inside primary buttons
        },
        secondary: { main: "#1565c0" },
        text: {
          primary: "#000000",
          secondary: "#1a237e",
        },
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              textTransform: "none",
            },
            outlinedPrimary: {
              color: "#000000",
              backgroundColor: "#bbdefb",
              borderColor: "#0d47a1",
              '&:hover': {
                backgroundColor: "#90caf9",
              },
            },
          },
        },
      },
    });
  
    return (
      <ThemeProvider theme={navyTheme}>
        <Box
          component="main"
          sx={{
            position: "relative",
            display: "block",
            maxWidth: "1024px",
            margin: "0 auto",
            paddingBottom: "100px",
          }}
        >
          {/* Resume Heading with social icons */}
          <Box sx={{ textAlign: "center", mt: 8, mb: 0 }}>
            <Box component="h1" sx={{ fontSize: "2.5rem", fontWeight: "bold" }}>{user?.name}</Box>
            <Box component="span" sx={{ display: "block", fontSize: "1.5rem", mt: 1, pt: 1 }}>{user?.title}</Box>
            <Box component="span" sx={{ fontSize: "1rem" }}>
              {user?.displayEmail}
              {user?.displayEmail && user?.location ? (
                <Box component="span" sx={{ margin: "0 1rem", fontSize: "2rem", fontWeight: "lighter", opacity: 0.5, display: "inline" }}>|</Box>
              ) : null}
              {user?.location}
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mt: 2, gap: 2 }}>
              {socials?.map((social) => (
                <MuiLink href={generateSocialUrl(social)} key={social.id} target="_blank">
                  <Icon icon={getSocialIcon(social)} width="30" height="30" />
                </MuiLink>
              ))}
            </Box>
          </Box>
  
          {/* ----------  TABS & NAV BUTTONS ---------- */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mt: 4,
            }}
          >
            <IconButton onClick={() => cycle(-1)} aria-label="Previous section">
              <NavigateBeforeIcon />
            </IconButton>
            <Tabs
              value={active}
              onChange={(_, v) => setActive(v)}
              variant="scrollable"
              scrollButtons="auto"
              sx={{ mx: 2 }}
            >
              {sections.map((s, idx) => (
                <Tab key={s.label} label={s.label} value={idx} />
              ))}
            </Tabs>
            <IconButton onClick={() => cycle(1)} aria-label="Next section">
              <NavigateNextIcon />
            </IconButton>
          </Box>
  
          {/* ----------  CROSS-FADE CONTENT ---------- */}
          <Fade in key={active} timeout={500} unmountOnExit mountOnEnter>
            <Box sx={{ mt: 4 }}>{sections[active].render}</Box>
          </Fade>
        </Box>
      </ThemeProvider>
    );
  };
  
  // keep named export only; barrel file re-exports this component