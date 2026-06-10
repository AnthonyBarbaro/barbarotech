import type { ClientAccessStatus, RequestStatus, ScopeType } from "./types";

export const clientAccessStatuses: ClientAccessStatus[] = ["invited", "active", "disabled"];

export const requestStatuses: RequestStatus[] = [
  "New",
  "Reviewing",
  "Approved",
  "In Progress",
  "Waiting",
  "Done",
];

export const requestPriorities = ["Low", "Normal", "High", "Urgent"] as const;

export const scopeTypes: ScopeType[] = [
  "Included in retainer",
  "Needs approval",
  "Out of scope",
  "Quoted separately",
];

export const allowedAttachmentMimeTypes = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "application/pdf",
  "text/plain",
  "application/zip",
] as const;

export const maxAttachmentSizeBytes = 10 * 1024 * 1024;
