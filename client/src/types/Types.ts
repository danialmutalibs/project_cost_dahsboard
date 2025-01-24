export interface ICost {
    id: number;
    project: number;
    category: string;
    amount: number;
    date: string;
}

export interface IProject {
    id: number;
    name: string;
    start_date: string;
    end_date: string;
    costs: ICost[];
}
