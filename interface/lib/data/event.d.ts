export interface Event {
    uuid: string;
    name: string;
    description?: string;
    priority: 0 | 1 | 2;
    status: 0 | 1;
    timestamp: number;
}
export type EventArray = Event[];
