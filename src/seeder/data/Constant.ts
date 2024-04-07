import {
  StateId,
  StateTitle,
  StatusId,
  StatusTitle,
} from "../../types/CityEvents";

export const STATUS = [
  {
    status_code: StatusId.Refused,
    status: StatusTitle.Refused,
  },
  {
    status_code: StatusId.PendingModeration,
    status: StatusTitle.PendingModeration,
  },
  {
    status_code: StatusId.ReadyToPublish,
    status: StatusTitle.ReadyToPublish,
  },
  {
    status_code: StatusId.Published,
    status: StatusTitle.Published,
  },
];

export const STATES = [
  {
    state_code: StateId.Scheduled,
    state: StateTitle.Scheduled,
  },
  {
    state_code: StateId.Rescheduled,
    state: StateTitle.Rescheduled,
  },
  {
    state_code: StateId.MovedOnline,
    state: StateTitle.MovedOnline,
  },
  {
    state_code: StateId.Postponed,
    state: StateTitle.Postponed,
  },
  {
    state_code: StateId.Complete,
    state: StateTitle.Complete,
  },
  {
    state_code: StateId.Canceled,
    state: StateTitle.Canceled,
  },
];

export const CATEGORIES = [
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
