import { Box } from "@mui/material";
import parse from "html-react-parser";

export const RichTextBlock = ({ content }: { content: string | null }) => {
  if (!content) return null;

  try {
    const parsedString = parse(content);

    return (
      <Box
        sx={{
          "& img": {
            maxWidth: "100%",
            height: "auto",
          },
        }}
      >
        {parsedString}
      </Box>
    );
  } catch {
    return content;
  }
};
