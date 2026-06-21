import {
  fetchCachedWorldCupEventsFromWorldCup26,
  getFallbackWorldCupEvents,
} from "../../src/lib/worldCupEvents";

export async function handler() {
  try {
    const payload = await fetchCachedWorldCupEventsFromWorldCup26();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=0, s-maxage=60",
      },
      body: JSON.stringify(payload),
    };
  } catch (error) {
    const message =
      error instanceof Error
        ? `${error.message}. Falling back to the built-in schedule.`
        : "Unable to reach worldcup26.ir. Falling back to the built-in schedule.";

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
      body: JSON.stringify(getFallbackWorldCupEvents(message)),
    };
  }
}
