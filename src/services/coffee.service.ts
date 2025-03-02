export const getCoffeeService = async () => {
    const data = await fetch("https://api.sampleapis.com/coffee/hot");
    return await data.json();
}