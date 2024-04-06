const STATUS = [
  { status_code: -1, status: "refused" },
  { status_code: 0, status: "pending moderation" },
  { status_code: 1, status: "ready to publish" },
  { status_code: 2, status: "published" },
];

const STATES = [
  { state_code: 1, state: "scheduled" },
  { state_code: 2, state: "rescheduled" },
  { state_code: 3, state: "moved online" },
  { state_code: 4, state: "postponed" },
  { state_code: 5, state: "complete" },
  { state_code: 6, state: "canceled" },
];

const CATEGORIES = [
  {
    title: "atelier",
    open_agenda_id: 3,
  },
  {
    title: "braderie-brocante",
    open_agenda_id: 4,
  },
  {
    title: "ceremonie",
    open_agenda_id: 5,
  },
  {
    title: "cinema",
    open_agenda_id: 6,
  },
  {
    title: "conference-rencontre",
    open_agenda_id: 7,
  },
  {
    title: "conseil-municipal",
    open_agenda_id: 8,
  },
  {
    title: "danse",
    open_agenda_id: 9,
  },
  {
    title: "developpement-durable",
    open_agenda_id: 10,
  },
  {
    title: "emploi",
    open_agenda_id: 11,
  },
  {
    title: "exposition",
    open_agenda_id: 12,
  },
  {
    title: "fete-festival",
    open_agenda_id: 13,
  },
  {
    title: "formation",
    open_agenda_id: 14,
  },
  {
    title: "lecture",
    open_agenda_id: 15,
  },
  {
    title: "mode",
    open_agenda_id: 16,
  },
  {
    title: "musique",
    open_agenda_id: 17,
  },
  {
    title: "reunion-publique",
    open_agenda_id: 18,
  },
  {
    title: "sante",
    open_agenda_id: 19,
  },
  {
    title: "spectacle",
    open_agenda_id: 20,
  },
  {
    title: "sport",
    open_agenda_id: 21,
  },
  {
    title: "theatre",
    open_agenda_id: 22,
  },
  {
    title: "visite-balade",
    open_agenda_id: 23,
  },
];

module.exports = {
  STATUS,
  STATES,
  CATEGORIES,
};
