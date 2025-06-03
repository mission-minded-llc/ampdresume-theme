import { themeDefinitions, titleSuffix } from "@/constants";

import { Metadata } from "next";
import { PDFView } from "../PDFView";
import { ThemeName } from "@/types";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ themeName: string }>;
}): Promise<Metadata> {
  const { themeName } = await params;

  const title = `PDF Theme: ${themeName} ${titleSuffix}`;

  const description =
    themeDefinitions[themeName as ThemeName]?.description ||
    `This is the ${themeName} theme for Amp'd Resume.`;

  const authors =
    themeDefinitions[themeName as ThemeName]?.authors || themeDefinitions.default.authors;

  return {
    title,
    description,
    authors: authors.map((author) => ({
      name: author.name,
      url: author.gitHubUrl || author.linkedInUrl || "",
    })),
    openGraph: {
      title,
      description,
      images: [],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ themeName: ThemeName }> }) {
  const { themeName } = await params;

  if (!themeDefinitions[themeName]) {
    return notFound();
  }

  return <PDFView themeName={themeName} />;
}
