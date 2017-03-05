import * as React from 'react'
import Result from "../model/Result";
import ResultGenerator from "./ResultGenerator";
import ResultView from "../component/ResultView";
import {JsArray} from "ts-json-definition";

require("./App.scss");


const pastResults = Result.fromJsArray<Result>(require<JsArray>("../data/pastResults.json")).getOrElse(() => []);

export type AppProps = {};

export type AppState = {
    generatedResult : Result
};

export default class App extends React.Component<AppProps,AppState> {

    constructor(props : AppProps) {
        super(props);
        this.state = {
            generatedResult : this.generateResult()
        }
    }

    generateResult() {
        return ResultGenerator.generate(pastResults);
    }

    render() {
        return (
            <div className="app-container">
                <ResultView result={this.state.generatedResult}/>
            </div>
        );
    }
}
