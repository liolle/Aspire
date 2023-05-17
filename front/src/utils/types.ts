export interface ModelInfo {
    hairColor:string,
    height: number,
    hobbies : {
        name:string,
        description:string
    }[],
    id:number,
    languages : {
        name:string,
        level:string
    }[],
    model_email: string,
    skinColor: string,
    weight: number
}