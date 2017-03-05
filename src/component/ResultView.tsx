import * as React from "react";

import Result from "../model/Result";

require("./ResultView.scss");


export type ResultViewProps = {
    result : Result;
};


export default class ResultView extends React.Component<ResultViewProps, void> {

    renderNumber(n : number) {
        return(
            <li className="lottery-ball">
                <div className="lottery-ball-number">
                    {n}
                </div>
            </li>
        )
    }

    renderStarNumber(n : number) {
        return(
            <li className="lottery-ball lottery-star-ball">
                <div className="lottery-ball-number">
                    {n}
                </div>
            </li>
        )
    }

    render() {
        return (
            <ul className="result-view">
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