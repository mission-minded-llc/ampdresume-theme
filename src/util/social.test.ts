import { generateSocialUrl, getSocialIcon } from "./social";

import { SOCIAL_MEDIA_PLATFORMS } from "@/constants";
import { Social } from "@/types";

describe("social utilities", () => {
  describe("generateSocialUrl", () => {
    it("should return ref directly for website platform", () => {
      const social: Social = {
        id: "1",
        userId: "user1",
        platform: "website",
        ref: "https://example.com",
      };
      expect(generateSocialUrl(social)).toBe("https://example.com");
    });

    it("should generate correct URL for GitHub", () => {
      const social: Social = {
        id: "1",
        userId: "user1",
        platform: "github",
        ref: "testuser",
      };
      expect(generateSocialUrl(social)).toBe("https://github.com/testuser");
    });

    it("should generate correct URL for LinkedIn", () => {
      const social: Social = {
        id: "1",
        userId: "user1",
        platform: "linkedin",
        ref: "test-user",
      };
      expect(generateSocialUrl(social)).toBe("https://www.linkedin.com/in/test-user");
    });

    it("should return ref when platform not found", () => {
      const social: Social = {
        id: "1",
        userId: "user1",
        platform: "nonexistent",
        ref: "testuser",
      };
      expect(generateSocialUrl(social)).toBe("testuser");
    });

    it("should return ref when urlFormat is null", () => {
      const social: Social = {
        id: "1",
        userId: "user1",
        platform: "website",
        ref: "testuser",
      };
      expect(generateSocialUrl(social)).toBe("testuser");
    });
  });

  describe("getSocialIcon", () => {
    it("should return correct icon for GitHub", () => {
      const social: Social = {
        id: "1",
        userId: "user1",
        platform: "github",
        ref: "testuser",
      };
      expect(getSocialIcon(social)).toBe(SOCIAL_MEDIA_PLATFORMS["github.com"].icon);
    });

    it("should return correct icon for LinkedIn", () => {
      const social: Social = {
        id: "1",
        userId: "user1",
        platform: "linkedin",
        ref: "test-user",
      };
      expect(getSocialIcon(social)).toBe(SOCIAL_MEDIA_PLATFORMS["linkedin.com"].icon);
    });

    it("should return website icon for unknown platform", () => {
      const social: Social = {
        id: "1",
        userId: "user1",
        platform: "nonexistent",
        ref: "testuser",
      };
      expect(getSocialIcon(social)).toBe(SOCIAL_MEDIA_PLATFORMS.website.icon);
    });
  });
});
