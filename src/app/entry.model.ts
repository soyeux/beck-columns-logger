export interface Entry {
    id: number;
    date: Date;
    situation: string;
    emotion: string;
    autoThough: string;
    behavior: string;
    alternativeThough: string;
    consequences: string;
}

export interface SerializedEntry {
    id: number;
    date: string;
    situation: string;
    emotion: string;
    autoThough: string;
    behavior: string;
    alternativeThough: string;
    consequences: string;
}