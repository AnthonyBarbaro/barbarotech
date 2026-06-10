import { describe, expect, it } from "vitest";
import { assertAllowedUpload, safeFilename } from "../lib/uploads";

describe("upload helpers", () => {
  it("sanitizes filenames for S3 object keys", () => {
    expect(safeFilename("summer promo final!.png")).toBe("summer-promo-final-.png");
  });

  it("allows approved MIME types under 10 MB", () => {
    expect(() => assertAllowedUpload("image/png", 1024)).not.toThrow();
    expect(() => assertAllowedUpload("application/pdf", 10 * 1024 * 1024)).not.toThrow();
  });

  it("rejects unsupported MIME types", () => {
    expect(() => assertAllowedUpload("text/html", 1024)).toThrow("Unsupported file type.");
  });

  it("rejects files larger than 10 MB", () => {
    expect(() => assertAllowedUpload("image/png", 10 * 1024 * 1024 + 1)).toThrow(
      "File size must be between 1 byte and 10 MB."
    );
  });
});
