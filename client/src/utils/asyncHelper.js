export const tryCatchWrapper = async (fn, ...args) => {
    try {
        const result = await fn(...args);
        return { result, error: null };
    } catch (error) {
        console.error(`Error in function ${fn.name}:`, error);
        return { result: null, error };
    }
};
