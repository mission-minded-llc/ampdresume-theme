# Amp'd Resume Theme

[![codecov](https://codecov.io/gh/mission-minded-llc/ampdresume-theme/graph/badge.svg?token=HGZ6NME2HH)](https://codecov.io/gh/mission-minded-llc/ampdresume-theme)

Anyone can contribute their own frontend theme design and implementation for
[Amp'd Resume](https://www.ampdresume.com).

Browse the published themes available here: https://theme.ampdresume.com/

## The Project

While the [Amp'd Resume](https://www.ampdresume.com) backend and infrastructure is closed-source,
the frontend templates for resume UIs and PDF exports are now open-source!

### What does this mean?

This means that anybody can come up with their own template to display custom interactive resumes.
The codebase uses React and TypeScript, and you can incorporate any helpful animation and design
libraries needed.

### How can I contribute?

To contribute, fork this repository, spin up on localhost to develop your theme, then open a pull
request back to this main repository to see your theme available live on www.ampdresume.com once
it's merged.

## Developer Setup

To develop locally, first fork this repository and follow these steps:

1. Run `npm i` to install dependencies.
2. Run `npm run dev` to spin up on `localhost:3000`
3. Navigate to http://localhost:3000/ to view in browser.

> Note: You'll see an `.env.example` file, but at this time there are no needed environment
> variables. The only variable is currently for a Google Tag Manager ID, which is not required.

## Development Process

1. Checkout a new branch based on the `main` branch, e.g.: `feature/my-new-theme`
2. When your work is done on this branch, open a pull request into the original repository's
   `develop` branch.
3. After the theme is merged into the `develop` branch, you should be able to view it live on
   https://themetest.ampdresume.com as well as access the theme for testing on
   https://test.ampdresume.com (only allow-listed members can sign in here, please request access).
4. From there, the theme will be merged to `main` branch, deployed to production and made available
   to all users!

## Building Your Theme

There are some steps and specifications required to build a theme.

### Data Types

First, get familiar with the data types ingested by a resume template. These can be found documented
in
[src/types/index.ts](https://github.com/mission-minded-llc/ampdresume-theme/blob/main/src/types/index.ts)

### Folder Structure

The theme templates can be found in `src/themes/[theme-name]`.

To create a new template, first create a new `[theme-name]` folder, e.g. `slick`.

This folder should contain at last one component, e.g. `ThemeSlick.tsx`. If you create a custom PDF
theme as well, create a `ThemeSlickPDF.tsx` component.

These components should ingest specific data, please see `src/theme/default/ThemeDefault.tsx` and
`src/theme/default/ThemeDefaultPDF.tsx` for reference, e.g.:

#### `ThemeDefault.tsx` Example

```jsx
export const ThemeDefault = ({
  themeAppearance,
  user,
  socials,
  skillsForUser,
  companies,
  education,
}: {
  themeAppearance: ThemeAppearance;
  user: User;
  socials: Social[];
  skillsForUser: SkillForUser[];
  companies: Company[];
  education: EducationType[];
}) => (
    // Your cool resume template here, do with the data what you wish!
);
```

#### `ThemeDefaultPDF.tsx` Example

```jsx
interface PDFViewProps {
  user: User;
  skillsForUser: SkillForUser[];
  companies: Company[];
  education: EducationType[];
  themeOptions?: ThemeDefaultPDFOptions;
}

export const ThemeDefaultPDF = ({
  user,
  skillsForUser,
  companies,
  education,
  themeOptions = defaultThemeOptions,
}: PDFViewProps) => {
    // Your component code here.
}
```

> Note: The PDF templates should use React, but should not contain any dynamic content because
> they're intended for print! The way it initially renders, is how it should end up being exported
> to PDF via the interface.

### Previewing Your Theme

To preview your work as you develop a theme, first you need to ensure the theme can be viewed. Do
this by modifying `src/app/theme/[themeName]/ResumeView.tsx` and
`src/app/theme/[themeName]/PDFView.tsx` to ensure it can be loaded:

#### `ResumeView.tsx` Update

```jsx
switch (themeName) {
    case "slick":
      return (
        <ThemeSlick
          // pass props, etc.
        />
      );
    case "default":
    default:
      return (
        <ThemeDefault
          // pass props, etc.
        />
      );
```

Follow suit in `PDFView.tsx` as well.

Then, you should be able to preview your work at http://localhost:3000/theme/slick

### Sample Data

By default, the sample resume data is loaded from `src/theme/sampleData.json` and transferred
through `src/theme/sampleData.ts` for strong typing.

If you'd like to create your own sample data based on this format to test various UI updates, create
your own `sampleData.json` and `sampleData.ts` files within your `src/theme/[theme-name]/` folder.
Then, ensure they're imported in the `src/app/theme/[themeName]/ResumeView.tsx` and
`src/app/theme/[themeName]/PDFView.tsx` files to be passed into your example page.

If you want to base your sample data off a real resume from ampdresume.com, visit the
[Postman collection](https://www.postman.com/universal-sunset-980198/missionmike/request/8ceygsv/getresume?ctx=documentation)
and fire off the `getResume` request using the slug of your preferred user.

### Adding to the Nav Menu

Add the theme to the nav menu by adding a new entry in the `src/theme/themeNavItems.tsx` location.
After saving, your theme should be visible in the nav.

## Testing Your Theme

Jest unit and snapshot tests are encouraged for each theme. PRs cannot be merged without having
solid tests to accompany any new templates.

Add the test files as neighbors to your new components; they should be side-by-side in the same
location.

To run your tests, you can use `npm run test`, or view coverage with `npm run test:coverage`, then
open the generated local coverage report in-browser.

Checks can be run via:

- `npm run lint` to lint all the code.
- `npm run types:check` to run TypeScript checks.
- `npm run test` to run Jest tests.
- `npm run test:coverage` to run Jest tests with coverage.
- `npm run check` to test all avenues in sequence. This is the command used within the CI process.

If you have any issues during development, please open a new issue in this repository.

Happy coding!
