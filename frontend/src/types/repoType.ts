export interface repoType {
    id: string;
    name: string;
    url: string;
    date: {
        created_at: Date;
        last_push: Date;
    };
    language: string;
    description: string;
    stargazers_count: number;
    fork: boolean;
}
