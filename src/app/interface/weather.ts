export interface Weather {
    location: string;
    description: string;
    temperature: number;
    tempMin: number;
    tempMax: number;
    humidity: string;
    wind: string;
    visibility: string;
    country: string;
    cityId: string;
    isFavourite: boolean;
}
