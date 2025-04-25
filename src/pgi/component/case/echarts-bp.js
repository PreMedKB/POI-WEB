import React, { Component } from 'react';
import { Table } from 'antd';
import ReactECharts from 'echarts-for-react';
import 'pgi/style/p-statistics.less';

export default class BP extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    getOption = (data1, data2, data3, data4) => {
        // var start = 0
        // var end = data1.length - 7
        let option = {

            dataZoom: [
                // {
                //     type: 'slider', // 类型, slider表示滑动条进行缩放
                //     id: 'sliderX',
                //     height: 10,
                //     // bottom: 25,
                //     xAxisIndex: [0],
                //     show: true, //是否显示组件, 若设置为false，不显示组件，但数据过滤功能还存在
                //     moveHandleSize: 7,//移动手柄的尺寸高度
                //     // maxValueSpan: 10

                // },
                // {
                //     id: 'sliderY',
                //     type: 'slider',
                //     // startValue: start,  // 重点在这   -- 开始的值
                //     // endValue: end,   // 重点在这   -- 结束的值
                //     right: 50,
                //     width: 10,
                //     yAxisIndex: [0],
                //     filterMode: 'empty',
                //     // minSpan: 100,//用于限制窗口大小的最小值（百分比值），取值范围是0 ~ 100。
                //     // maxSpan: 100,
                //     //如在时间轴上可以设置为：3600 * 24 * 1000 * 5 表示 5 天。在类目轴上可以设置为5表示5个类目。
                //     // minValueSpan: 10,//用于限制窗口大小的最小值（实际数值）。
                //     // maxValueSpan: 10
                // }
            ],
            // title: [
            //     {
            //         text: 'upper: Q3 + 1.5 * IQR \nlower: Q1 - 1.5 * IQR',
            //         // borderColor: '#999',
            //         // borderWidth: 1,
            //         textStyle: {
            //             fontSize: 10
            //         },
            //         left: '10%',
            //         top: '95%'
            //     }
            // ],
            dataset: [
                {
                    source: data2
                },
                {
                    transform: {
                        type: 'boxplot',
                        config: {
                            itemNameFormatter: function (data1) {
                                return data1.value;
                            }
                        }
                    }
                },
                {
                    fromDatasetIndex: 1,
                    fromTransformResult: 1
                }
            ],
            // tooltip: {
            //     trigger: 'axis',
            //     axisPointer: {
            //         type: 'shadow',
            //         axis: 'y',
            //     }
            // },
            tooltip: {
                trigger: 'item',
                axisPointer: {
                    type: 'shadow'//鼠标悬停在箱上会显示阴影
                }
            },
            grid: {
                x: 200,
                y: 30,
                x2: 50,
                y2: 50,
                height: 550,
            },
            yAxis: [{
                type: 'category',
                name: 'Tissue',
                data: data1,
                nameTextStyle: {
                    color: '#000000',     // 坐标轴名称的颜色
                    fontStyle: 'normal',    // 文字字体的风格（'normal'，无样式；'italic'，斜体；'oblique'，倾斜字体） 
                    fontWeight: 'bold',    // 文字字体的粗细（'normal'，无样式；'bold'，加粗；'bolder'，加粗的基础上再加粗；'lighter'，变细；数字定义粗细也可以，取值范围100至700）
                    fontSize: '15',    // 文字字体大小
                    align: 'right',     // 文字水平对齐方式，默认自动（'left'，'center'，'right'）
                    // verticalAlign: 'left',    // 文字垂直对齐方式，默认自动（'top'，'middle'，'bottom'
                    // lineHeight: '50',    // 行高 ）
                    // backgroundColor: 'red',    // 文字块背景色，例：'#123234', 'red', 'rgba(0,23,11,0.3)'
                },
                boundaryGap: true,
                nameGap: 10,
                splitArea: {
                    show: false
                },
                splitLine: {
                    show: false
                }
                // ,
                // axisLabel: {
                //     formatter: function (value) {
                //         var texts = []
                //         const current = data1.find((item, index) => {
                //             return index == value
                //         })
                //         texts.push(current ? current : '')
                //         return texts
                //     },
                //     interval: '0',    // 坐标轴刻度标签的显示间隔，在类目轴中有效.0显示所有
                // },

            }, {
                type: 'value',
                show: false,
                min: Math.min.apply(null, data1),
                max: Math.max.apply(null, data1)
            }],
            xAxis: {
                type: 'value',
                name: 'CPMTumor',
                nameTextStyle: {
                    color: '#000000',     // 坐标轴名称的颜色
                    fontStyle: 'normal',    // 文字字体的风格（'normal'，无样式；'italic'，斜体；'oblique'，倾斜字体） 
                    fontWeight: 'bold',    // 文字字体的粗细（'normal'，无样式；'bold'，加粗；'bolder'，加粗的基础上再加粗；'lighter'，变细；数字定义粗细也可以，取值范围100至700）
                    fontSize: '15',    // 文字字体大小
                    align: 'center',     // 文字水平对齐方式，默认自动（'left'，'center'，'right'）
                    // verticalAlign: 'left',    // 文字垂直对齐方式，默认自动（'top'，'middle'，'bottom'
                    // lineHeight: '50',    // 行高 ）
                    // backgroundColor: 'red',    // 文字块背景色，例：'#123234', 'red', 'rgba(0,23,11,0.3)'
                },
                show: true,
                nameLocation: 'middle',
                nameGap: 45,
                splitArea: {
                    show: true
                }
            },
            series: [
                {
                    name: 'Gene Expression',
                    type: 'boxplot',
                    datasetIndex: 1,
                    markLine: {
                        data: [
                            {
                                name: '标记线',
                                xAxis: parseFloat(data3).toFixed(2),
                                itemStyle: {
                                    color: 'red'
                                },
                                label: {
                                    color: 'red',
                                    fontWeight: 'bolder',
                                    position: 'start'

                                },
                                lineStyle: {
                                    width: 1,
                                },
                            },
                            {
                                name: '标记线',
                                yAxis: data4,//赋值
                                lineStyle: {
                                    width: 15,
                                    type: "solid",

                                },
                                itemStyle: {
                                    color: 'rgba(247, 144, 61, 0.4)',
                                },

                                label: {
                                    show: false
                                }


                            }
                        ],
                        silent: true,
                        symbol: ['none', 'none'],

                    },
                    tooltip: {//以下是设置tooltip的显示数据和显示格式
                        formatter: function (param) {
                            return [
                                '<b>' + param.name + '</b>',
                                'Upper Limit: ' + '&nbsp;' + param.data[5],
                                'Upper Quartile: ' + '&nbsp;' + param.data[4],
                                'Median: ' + '&nbsp;' + param.data[3],
                                'Lower Quartile: ' + '&nbsp;' + param.data[2],
                                'Lower Limit: ' + '&nbsp;' + param.data[1]
                            ].join('<br/>');
                        }
                    }
                    // markArea: {
                    //     itemStyle: {
                    //         color: 'rgba(255, 173, 177, 0.4)'
                    //     },
                    //     data: [
                    //         [
                    //             {
                    //                 name: '',
                    //                 yAxis: 'Myeloid'
                    //             },
                    //             {
                    //                 yAxis: 'Myeloid'
                    //             }
                    //         ]
                    //     ]
                    // }
                },
                // {
                //     name: 'outlier',
                //     type: 'scatter',
                //     symbolSize: 3,
                //     encode: { x: 1, y: 0 },
                //     datasetIndex: 2
                // }
            ]
        };
        return option;
    }
    render() {
        let data1 = this.props['data1'];
        let data2 = this.props['data2'];
        let data3 = this.props['data3'];
        let data4 = this.props['data4'];
        return (
            <div style={{ width: '1000px', height: '650px' }}>
                {/* <p>患者的肿瘤组织对应的基因表达量分布为红色高亮区域，绿色虚线标记患者该基因的Tumor CPM。</p> */}
                <p style={{ fontSize: '8px' }}>The gene expression distribution corresponding to the patient's tumor tissue is highlighted in the <b style={{ color: 'rgba(247, 144, 61)' }}>orange</b> area, and the <b style={{ color: 'red' }}>red</b> dashed line marks the patient's Tumor CPM.</p>
                <ReactECharts style={{ width: '1200px', height: '660px' }}
                    option={this.getOption(data1, data2, data3, data4)}
                />

            </div >

        );
    }
}