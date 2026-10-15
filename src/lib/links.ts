// A link to another site (http or https) opens in a new tab; links inside the site and mailto links stay as they are.
export const extProps = (href: string) => (/^https?:\/\//i.test(href) ? ({ target: "_blank", rel: "noopener noreferrer" } as const) : {});
