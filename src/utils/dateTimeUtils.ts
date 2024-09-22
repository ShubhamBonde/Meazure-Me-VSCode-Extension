import assert from "assert";
import { DATE_TIME } from "../consts/utilityConsts";
import * as path from 'path';

const MODULE_PATH = path.basename(__filename);

/**
* Returns the actual day string by day index. 
* @method methodName
* @param {number} index 1 based index for the day. example for 'Monday' index will be 1.
* @returns {string} Returns the actual day.
*/
export function getDayByIndex(index:number): string {
    const dayMappings:string[] = DATE_TIME.MAPPINGS.days;
    
    assert(index <= (dayMappings.length - 1) && index >= 0, `Invalid index passed in getDayByIndex() in ${MODULE_PATH}`); 

    return dayMappings[index];
}