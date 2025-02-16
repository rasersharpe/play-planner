// TODO: create an interface that will be used to display the game

// console.log(`environment variable:`, import.meta.env);
// const apiKey = import.meta.env.VITE_API_KEY;
// console.log('API_KEY:', apiKey);

export interface GameInterface {
    id: number;
    name: string;
    background_image: string;
    description_raw: string;
}