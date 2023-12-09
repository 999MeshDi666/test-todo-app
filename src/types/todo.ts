
export type TodoStatus = "waiting"|"progress"|"finished";

export type TTodoItem = {
    id: string|number,
    title: string,
    description: string,
    status: TodoStatus
}