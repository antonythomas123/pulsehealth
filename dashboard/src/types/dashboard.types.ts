export type Record = {
  id: number;
  img: string;
  name: string;
  type: string;
  time: string;
  status: "COMPLETED" | "SCHEDULED" | "IN_PROGRESS";
};

export interface Note {
  time: string;
  title: string;
  primary: boolean;
}

export interface NotesMap {
  [key: string]: Note[];
}
