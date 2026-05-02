export const parseRules = (rulesString: string) =>
	Object.fromEntries(rulesString.split(",").map((rule) => rule.split(":")));
