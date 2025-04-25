import React, { Component } from 'react';
import { Table } from 'antd';
import 'pgi/style/p-statistics.less';
import tri from '../../../common/image/tri.jpg'
import ReactECharts from 'echarts-for-react';

export default class BarD extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    getOption = () => {
        let option = {
            tooltip: {},
            animationDurationUpdate: 1500,
            animationEasingUpdate: 'quinticInOut',
            series: [
                {
                    type: 'graph',
                    layout: 'none',
                    symbolSize: 48,
                    roam: true,
                    label: {
                        show: true,
                        position: 'right',
                        fontSize: 16,
                        fontWeight: "bold",
                        color: function (x) {
                            return x.data.color;
                        }
                    },


                    edgeSymbol: ['circle', 'arrow'],
                    edgeSymbolSize: [4, 10],
                    edgeLabel: {
                        fontSize: 16,
                        // show:true,
                        //通过回调函数设置连线上的标签
                        formatter: function (x) {
                            return x.data.name;
                        }


                    },
                    data: [
                        {
                            name: 'Variant',
                            x: 300,
                            y: 480,
                            label: {
                                color: '#4E9DDC',
                                position: 'top'
                            },

                            symbol: 'image://https://premedkb.cn/case/variant-1.png',
                        },
                        {
                            name: 'Gene',
                            x: 800,
                            y: 480,
                            label: {
                                color: '#7DAA55',
                                position: 'top'
                            },

                            symbol: 'image://https://premedkb.cn/case/gene-1.png',
                        },
                        {
                            name: 'Drug',
                            x: 550,
                            y: 100,
                            label: {
                                color: '#E08244',
                            },

                            symbol: 'image://https://premedkb.cn/case/drug-1.png',
                        },
                        {
                            name: 'Disease',
                            x: 550,
                            y: 350,
                            label: {
                                color: '#F7C143',
                                position: 'bottom'
                            },
                            symbol: 'image://https://premedkb.cn/case/disease-1.png',
                        }
                    ],
                    itemStyle: {//设置节点样式
                        normal: {
                            //函数接收params参数，params就是当前data数组的每一项，把颜色return出来就可以啦~
                            color: function (params) {
                                return params.data.color;
                            },
                            textcolor: function (params) {
                                return params.data.color;
                            }
                        }
                    },
                    // links: [],
                    links: [
                        {
                            source: 'Variant',
                            target: 'Gene',

                        },
                        {
                            source: 'Gene',
                            target: 'Variant',
                            name: '6,741',
                            label: {
                                show: true

                            }

                        },
                        {
                            source: 'Variant',
                            target: 'Drug'
                        }, {
                            source: 'Drug',
                            target: 'Variant',
                            name: '39,165',
                            label: {
                                show: true

                            }
                        },
                        {
                            source: 'Gene',
                            target: 'Drug'
                        },
                        {
                            source: 'Drug',
                            target: 'Gene',
                            name: '4,305',
                            label: {
                                show: true

                            }
                        },
                        {
                            source: 'Gene',
                            target: 'Disease',
                            name: '2,928',
                            label: {
                                show: true

                            }
                        }, {
                            source: 'Disease',
                            target: 'Gene'
                        },
                        {
                            source: 'Variant',
                            target: 'Disease',
                            name: '49,639',
                            label: {
                                show: true

                            }
                        }, {
                            source: 'Disease',
                            target: 'Variant'
                        },
                        {
                            source: 'Disease',
                            target: 'Drug',
                            name: '5,435',
                            label: {
                                show: true

                            }
                        },
                        {
                            source: 'Drug',
                            target: 'Disease',

                        }
                    ],
                    lineStyle: {
                        opacity: 0.9,
                        width: 1.5,
                        curveness: 0,
                    }
                }
            ]
        };
        return option;
    }
    getColumnA = () => {
        let column = [{
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '40%'
        }, {
            title: 'Number',
            dataIndex: 'Number',
            key: 'Number',
            width: '30%',
            render: Number => (
                <span>{Number.toLocaleString('zh')}</span>
            )
        }, {
            title: 'Percent',
            dataIndex: 'Percent',
            key: 'Percent',
            render: Percent => (
                <span>{(Percent * 100).toString().match(/^\d+(?:\.\d{0,2})?/)}%</span>
            )
        }];
        return column;
    }
    getDataA = (data1, data2) => {
        if (data1 == undefined) {
            data1 = [100, 200, 100, 400, 150, 50]
        }
        if (data2 == undefined) {
            data2 = [0.1, 0.2, 0.1, 0.4, 0.15, 0.05]
        }
        const data = [{
            key: '1',
            name: 'Gene-Variant',
            Number: data1[0],
            Percent: data2[0],
        }, {
            key: '2',
            name: 'Disease-Variant',
            Number: data1[1],
            Percent: data2[1],
        }, {
            key: '3',
            name: 'Disease-Gene',
            Number: data1[2],
            Percent: data2[2],
        }, {
            key: '4',
            name: 'Drug-Gene',
            Number: data1[3],
            Percent: data2[3],
        }, {
            key: '5',
            name: 'Drug-Variant',
            Number: data1[4],
            Percent: data2[4],
        }, {
            key: '6',
            name: 'Disease-Drug',
            Number: data1[5],
            Percent: data2[5],
        }];
        return data;
    }
    render() {
        let data = this.props['data'];
        return (
            <div style={{ display: 'flex', width: '100%' }}>
                <div style={{ width: '60%' }}>
                    <Table pagination={false} columns={this.getColumnA()} dataSource={this.getDataA(data['Number'], data['Percent'])} />
                    <br></br>
                </div>
                <div style={{ width: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {/* <div>
                        <img width={300} src={require('../../../common/image/tri.jpg')} />
                    </div> */}
                    <ReactECharts
                        option={this.getOption()}
                        style={{ width: '100%', height: '100%', marginLeft: '20px' }}
                    />
                </div>
            </div>
        );
    }
};