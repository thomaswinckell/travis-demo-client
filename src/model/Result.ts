import {Serializable, Serialize, UnmarshallError} from "ts-serialize";
import {JsValue, Json} from "ts-json-definition";
import {Either, Right, Left, Optional} from "scalts";


const dateUnmarshaller = (value: JsValue, json: Json, clazz: any, classPropertyName: string, jsonPropertyName: string, target: Function, mbType: Optional<Function>, jsonPath: string[], classPath: string[]) : Either<UnmarshallError[], Date> => {
    if(typeof value === "string") {
        let time = parseInt(value.replace("/Date(", "").replace("+0000)/", ""));
        if(!isNaN(time)) {
            return Right<UnmarshallError[], Date>(new Date(time));
        }
    }
    return Left<UnmarshallError[], Date>([new UnmarshallError(value, mbType, jsonPropertyName, classPropertyName, target, jsonPath, classPath)]);
};

class Result extends Serializable {

    @Serialize("Date", dateUnmarshaller)
    date : Date;

    @Serialize("Num1")
    num1 : number;

    @Serialize("Num2")
    num2 : number;

    @Serialize("Num3")
    num3 : number;

    @Serialize("Num4")
    num4 : number;

    @Serialize("Num5")
    num5 : number;

    @Serialize("Star1")
    star1 : number;

    @Serialize("Star2")
    star2 : number;

    constructor(num1 : number, num2 : number, num3 : number, num4 : number, num5 : number, star1 : number, star2 : number) {
        super();
        this.date = new Date();
        this.num1 = num1;
        this.num2 = num2;
        this.num3 = num3;
        this.num4 = num4;
        this.num5 = num5;
        this.star1 = star1;
        this.star2 = star2;
    }
}

export default Result;


/*

 "Date": "/Date(1103846400000+0000)/",
 "Jackpot": 0,
 "NextJackpot": 0,
 "Num1": 3,
 "Num2": 4,
 "Num3": 27,
 "Num4": 29,
 "Num5": 37,
 "PrizeCombinations": [],
 "RaffleNumber": 46,
 "Star1": 5,
 "Star2": 6
 */