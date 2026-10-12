// A chapter's film is a playlist: video clips with designed slides between them.
export type FilmClip = { type: "clip"; src: string; bg: string; fit?: "cover" }; // bg: the colour of the bars on both sides of the clip
// A stat slide between two scenes, in the style of the Sred.io beats: a small kicker, a big number (counting up) or line, and a short tag.
export type FilmSlide = { type: "slide"; bg: string; image?: string; dark: boolean; dur: number; kicker?: string; logo?: { src: string; name: string }; giant?: number; suffix?: string; line?: string; tag?: string };
// A scene drawn in code from the Figma file, instead of a video.
export type FilmScene = { type: "scene"; id: "welcome" | "process-challenges" | "approach" | "design-system" | "product-features" | "projects-delivered" | "zerogaspi" | "keysborough" | "spoonful" | "wonderpies" | "telcoict"; dur: number };
export type FilmItem = FilmClip | FilmSlide | FilmScene;
