import { Agent } from "./agent";

export interface Agents {
  items: Agent[];
  metadata: {
    "@id": string;
    "@type": string;
    totalItems: number;
  }
}
