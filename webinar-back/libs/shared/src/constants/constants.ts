

export function slugify(text: string){
    return text
    .toString() // Ensure the input is a string
    .normalize('NFD') // Normalize accented characters
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics (e.g., accents)
    .replace(/[^a-zA-Z0-9\s-]/g, '') // Remove special characters
    .trim() // Remove leading and trailing whitespace
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .toLowerCase(); // Convert to lowercase
}

export function containsInappropriateWords(comment: string): boolean {
    const inappropriateWords = [
        "fuck", "binamous", "kachal"
    ]; 
    const lowerCasedComment = comment.toLowerCase();
    return inappropriateWords.some(word => lowerCasedComment.includes(word));
}