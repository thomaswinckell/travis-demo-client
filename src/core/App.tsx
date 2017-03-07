import * as React from 'react'
import Result from "../model/Result";
import ResultGenerator from "./ResultGenerator";
import ResultView from "../component/ResultView";
import {JsArray} from "ts-json-definition";
import {autobind} from "core-decorators";

require('bootstrap/dist/css/bootstrap.css');
require("./App.scss");


const pastResults = Result.fromJsArray<Result>(require<JsArray>("../data/pastResults.json")).getOrElse(() => []);

export type AppProps = {};

export type AppState = {
    result : Result
};

export default class App extends React.Component<AppProps,AppState> {

    constructor(props : AppProps) {
        super(props);
        this.state = {
            result : ResultGenerator.generate(pastResults)
        };
    }

    @autobind
    generateResult() {
        const result = ResultGenerator.generate(pastResults);
        this.setState({ result });
    }

    render() {
        return (
            <div className="app-container">
                <ResultView result={this.state.result}/>
                <button type="button" className="btn btn-success btn-lg" onClick={this.generateResult}>
                    Generate numbers !
                </button>
            </div>
        );
    }
}
