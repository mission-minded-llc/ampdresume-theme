import FeedIcon from "@mui/icons-material/Feed";

interface NavItem {
  text: string;
  icon: React.ReactNode;
  href: string;
}

export const themeNavItems: NavItem[] = [
  {
    text: "Default",
    icon: <FeedIcon />,
    href: "/theme/default",
  },
  {
    text: "David's Theme",
    icon: <FeedIcon />,
    href: "/theme/davids",
  },
];
