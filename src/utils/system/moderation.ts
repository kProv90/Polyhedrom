import axios from "axios";

interface ModerationResponse {
  isProfanity: boolean;
  score: number;
  flaggedFor?: string;
}

interface ModerationResult {
  isProfanity?: boolean;
  error?: {
    code: string;
    message: unknown;
  };
}

export async function isProfane(text: string): Promise<ModerationResult> {
  text = text.replace(/[0-9]/g, "");
  text = text.slice(0, text.length / 2) + " " + text.slice(text.length / 2);
  try {
    const response = await axios.post<ModerationResponse>(
      "https://vector.profanity.dev",
      { message: text },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = response.data;

    if (result && result.isProfanity) {
      return { isProfanity: true };
    } else {
      return { isProfanity: false };
    }
  } catch (err) {
    return { error: { code: "M", message: err } };
  }
}
