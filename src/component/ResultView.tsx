import * as React from "react";

import Result from "../model/Result";

export type ResultViewProps = {
    result : Result;
};


export default class ResultView extends React.Component<ResultViewProps, void> {

    renderNumber(n : number) {
        return(
            <li className="result-number">
                {n}
            </li>
        )
    }

    renderStarNumber(n : number) {
        return(
            <li className="result-star-number">
                {n}
            </li>
        )
    }

    render() {
        return (
            <ul>
                {this.renderNumber(this.props.result.num1)}
                {this.renderNumber(this.props.result.num2)}
                {this.renderNumber(this.props.result.num3)}
                {this.renderNumber(this.props.result.num4)}
                {this.renderNumber(this.props.result.num5)}
                {this.renderStarNumber(this.props.result.star1)}
                {this.renderStarNumber(this.props.result.star2)}
            </ul>
        );
    }
}