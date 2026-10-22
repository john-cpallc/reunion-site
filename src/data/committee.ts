export type CommitteeMember = {
  name: string;
  role: string;
};

export const committeeIntro =
  "A small volunteer group of Huntsville High alumni is organizing our Class of 2017 ten-year reunion. Roles below will firm up as planning moves ahead — and we may add Finance, Communications, Venue, and Nostalgia leads as the team grows.";

export const committeeMembers: CommitteeMember[] = [
  { name: "John DeLay", role: "Role TBD" },
  { name: "Betsy Spearman", role: "Role TBD" },
  { name: "Lane Neumann", role: "Role TBD" },
  { name: "Gianna Schuetz", role: "Role TBD" },
];

export const openRoles = [
  "Chair",
  "Treasurer",
  "Outreach",
  "Event",
  "At-large",
] as const;
