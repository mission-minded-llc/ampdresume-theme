import { Typography } from "@mui/material";
import { User } from "@/types";
import { fontSize } from "./styled";

export const Header = ({ user }: { user: User }) => (
  <>
    <Typography sx={{ mt: 0, fontSize: fontSize.title, fontWeight: "bold" }}>
      {user.name}
    </Typography>
    <Typography sx={{ pb: 1, fontSize: fontSize.body, borderBottom: `1px solid #ccc` }}>
      {user?.location ? `${user.location} | ` : null}
      {user?.displayEmail ? <a href={`mailto:${user.displayEmail}`}>{user.displayEmail}</a> : null}
    </Typography>
    <Typography
      sx={{
        mb: 2,
        mt: 1,
        fontSize: fontSize.body,
        fontWeight: "bold",
        letterSpacing: 0,
      }}
    >
      {user.title}
    </Typography>
  </>
);
