import { forEach } from "../data/setData";
import { find } from "../data/themeData";

let sets = [];

function initialize() {
    return new Promise((resolve, reject) => {
        try {
            forEach(set => {
                const theme = find(theme => theme.id === set.theme_id);
                const setWithTheme = {
                    ...set,
                    theme: theme ? theme.name : "Unknown"
                };
                sets.push(setWithTheme);
            });
            resolve();
        } catch (error) {
            reject(error);
        }
    });
}

function getAllSets() {
    return new Promise((resolve, reject) => {
        try {
            resolve(sets);
        } catch (error) {
            reject(error);
        }
    });
}

function getSetByNum(setNum) {
    return new Promise((resolve, reject) => {
        try {
            const set = sets.find(set => set.set_num === setNum);
            if (set) {
                resolve(set);
            } else {
                reject(`Unable to find set with set_num: ${setNum}`);
            }
        } catch (error) {
            reject(error); 
        }
    });
}

function getSetsByTheme(theme) {
    return new Promise((resolve, reject) => {
        try {
            const filteredSets = sets.filter(set => set.theme.toLowerCase().includes(theme.toLowerCase()));
            if (filteredSets.length > 0) {
                resolve(filteredSets); 
            } else {
                reject(`Unable to find sets with theme containing: ${theme}`);
            }
        } catch (error) {
            reject(error); 
        }
    });
}

export default { initialize, getAllSets, getSetByNum, getSetsByTheme };
