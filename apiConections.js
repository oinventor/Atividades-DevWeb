export async function SimpleGet(url) {
    const response = await fetch(url);
    if (response.ok) {
        return await response.json();
    }
    else{
        throw new Error(`Response status ${response.status}`);
    }
}