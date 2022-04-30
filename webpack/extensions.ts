export const IsString = (inputText: any) => {
    if (typeof inputText === 'string' || inputText instanceof String) {
        //it is string
        return true;
    } else {
        //it is not string
        return false;
    }
};
