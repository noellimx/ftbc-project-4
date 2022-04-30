

export interface Link {
  id: number;
  url: string;
  isRead?: boolean;
}

export type Links = Link[];

export type LinkBooleanFieldModifierHandler = (id: number) => void;

export type LinkStringFieldModifierHandler = (val: string) => void;

export type TrulyImpure = () => void;


