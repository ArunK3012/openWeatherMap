export interface Weather {
    location: string;
    description: string;
    temperature: number;
    tempFahrenite: number;
    tempMin: number;
    tempMax: number;
    humidity: string;
    wind: string;
    visibility: string;
    country: string;
    cityId: number;
    isFavourite: boolean;
    icon: any;
}
