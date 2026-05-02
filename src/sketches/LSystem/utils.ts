export const parseRules = (rules: string) =>
	Object.fromEntries(
		rules
			.split(",")
			.map((rule) => rule.split(":"))
			.filter((keyValue: string[]) => keyValue.length === 2),
	);
