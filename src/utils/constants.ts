export type Variant = {
    id: string,
    name: string,
    count: number,
    selected: boolean,
}

export type Voting = {
    id: string,
    owner: string,
    name: string,
    description: string,
    variants: Variant[],
    photo: string
}