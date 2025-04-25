import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import 'pgi/style/p-case-geneview.less';
import { Tabs, Tag, Descriptions, Badge, Icon, Table, notification } from 'antd';
import { text } from 'd3';


const { TabPane } = Tabs;

let res;
class Expbp extends React.Component {

    constructor(props) {
        super(props);
        this.backClick = this.backClick.bind(this)
        console.log("111", this.props.location.state.Gene)

        if (this.props.location.state && this.props.location.state.Gene) {//判断当前有参数
            res = this.props.location.state.Gene;
            sessionStorage.setItem('data', JSON.stringify(res));// 存入到sessionStorage中
        } else {//没有参数
            res = JSON.parse(sessionStorage.getItem('data'));// 当state没有参数时，取sessionStorage中的参数
        }

        this.state = {
            res: res
        };

    }
    backClick() {
        this.props.history.go(-1)
    }
    render() {
        return (
            <div>
                <Tag style={{ cursor: 'pointer' }} color="blue" onClick={this.backClick} > back </Tag>
                {this.props.location.state.Gene}
            </div>

        );
    }
}
export default withRouter(Expbp);