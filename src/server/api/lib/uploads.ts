import { randomUUID } from "crypto";
import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";

export const allowedUploadMimeTypes = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "application/pdf",
  "text/plain",
  "application/zip",
] as const;

const maxUploadSizeBytes = 10 * 1024 * 1024;

let s3: S3Client | undefined;

function getS3() {
  if (!s3) {
    s3 = new S3Client({});
  }
  return s3;
}

export function safeFilename(filename: string) {
  const cleaned = filename
    .trim()
    .replace(/[^a-zA-Z0-9._-]/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 120);

  return cleaned || "attachment";
}

export function assertAllowedUpload(mimeType: string, sizeBytes: number) {
  if (!allowedUploadMimeTypes.includes(mimeType as (typeof allowedUploadMimeTypes)[number])) {
    throw new Error("Unsupported file type.");
  }

  if (!Number.isFinite(sizeBytes) || sizeBytes <= 0 || sizeBytes > maxUploadSizeBytes) {
    throw new Error("File size must be between 1 byte and 10 MB.");
  }
}

export async function createRequestAttachmentPost({
  bucket,
  clientId,
  requestId,
  filename,
  mimeType,
  sizeBytes,
}: {
  bucket: string;
  clientId: string;
  requestId: string;
  filename: string;
  mimeType: string;
  sizeBytes: number;
}) {
  assertAllowedUpload(mimeType, sizeBytes);

  const attachmentId = randomUUID();
  const key = `clients/${clientId}/requests/${requestId}/${attachmentId}-${safeFilename(filename)}`;

  const post = await createPresignedPost(getS3(), {
    Bucket: bucket,
    Key: key,
    Conditions: [
      ["content-length-range", 1, maxUploadSizeBytes],
      ["eq", "$Content-Type", mimeType],
    ],
    Fields: {
      "Content-Type": mimeType,
    },
    Expires: 300,
  });

  return {
    attachmentId,
    key,
    post,
  };
}
