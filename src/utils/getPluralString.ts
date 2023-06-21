const pluralRules = new Intl.PluralRules();
export default function getPluralString(number: number, singular: string, plural: string): string {
  return pluralRules.select(number) === "one" ? singular : plural;
}