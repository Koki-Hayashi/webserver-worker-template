// @flow

export type _MOODS = $Keys<typeof MOODS>;

export const MOODS = {
  GOOD: 0,
  PROCESSING: 1,
  BAD: 2,
  NEUTRAL: 3
};

export type _APP_STATE = $Keys<typeof APP_STATE>;

// Series of completions
export const SAVED = {mood: MOODS.GOOD, text: "Saved"};
export const SENT = {mood: MOODS.GOOD, text: "Sent"};
export const DONE = {mood: MOODS.GOOD, text: "Done"};
export const COPIED = {mood: MOODS.GOOD, text: "Copied"};
export const UPDATE = {mood: MOODS.GOOD, text: "Updated"};
export const DELETED = {mood: MOODS.GOOD, text: "Deleted"};
export const FETCHED = {mood: MOODS.GOOD, text: "Fetched"};

// Series of middle of process
export const SAVING = {mood: MOODS.PROCESSING, text: "Saving"};
export const SENDING = {mood: MOODS.PROCESSING, text: "Sending"};
export const PROCESSING = {mood: MOODS.PROCESSING, text: "Processing"};
export const COPYING = {mood: MOODS.PROCESSING, text: "Copying"};
export const UPDATING = {mood: MOODS.GOOD, text: "Updating"};
export const DELETING = {mood: MOODS.PROCESSING, text: "Deleting"};
export const FETCHING = {mood: MOODS.GOOD, text: "Fetching"};

// Series of fails
export const FAILED_TO_SAVE = {mood: MOODS.BAD, text: "Failed to save"};
export const FAILED_TO_SEND = {mood: MOODS.BAD, text: "Failed to send"};
export const FAILED = {mood: MOODS.BAD, text: "Failed"};
export const FAILED_TO_COPY = {mood: MOODS.BAD, text: "Failed to copy"};
export const FAILED_TO_UPDATE = {mood: MOODS.BAD, text: "Failed to update"};
export const FAILED_TO_DELETE = {mood: MOODS.BAD, text: "Failed to delete"};
export const FAILED_TO_FETCH = {mood: MOODS.GOOD, text: "Failed to fetch"};

// Neutral
export const NEUTRAL = {mood: MOODS.NEUTRAL, text: ""};

const APP_STATE = {
  SAVED: SAVED,
  SENT: SENT,
  DONE: DONE,
  COPIED: COPIED,
  UPDATE: UPDATE,
  DELETED: DELETED,
  FETCHED: FETCHED,

  SAVING: SAVING,
  SENDING: SENDING,
  PROCESSING: PROCESSING,
  COPYING: COPYING,
  UPDATING: UPDATING,
  DELETING: DELETING,
  FETCHING: FETCHING,

  FAILED_TO_SAVE: FAILED_TO_SAVE,
  FAILED_TO_SEND: FAILED_TO_SEND,
  FAILED: FAILED,
  FAILED_TO_COPY: FAILED_TO_COPY,
  FAILED_TO_UPDATE: FAILED_TO_UPDATE,
  FAILED_TO_DELETE: FAILED_TO_DELETE,
  FAILED_TO_FETCH: FAILED_TO_FETCH,

  NEUTRAL: NEUTRAL,
};

export default APP_STATE;