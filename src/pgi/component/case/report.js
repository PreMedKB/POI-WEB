import React, { Component } from 'react';
import { notification, Tabs, Table, Tag, message, Input, Button, Icon, Tooltip, Spin, Typography } from 'antd';
import reqwest from 'reqwest';
import Highlighter from 'react-highlight-words';
import { withRouter } from 'react-router-dom';
import CGI from '../../../common/image/CGI.png'
import CIViC from '../../../common/image/CIViC.png'
import CPIC from '../../../common/image/CPIC.png'
import CPNDS from '../../../common/image/CPNDS.png'
import DPWG from '../../../common/image/DPWG.png'
import FDA from '../../../common/image/FDA.png'
import MyCancerGenome from '../../../common/image/MCG.png'
import NCCN from '../../../common/image/NCCN.png'
import OncoKB from '../../../common/image/OncoKB.png'
import PharmGKB from '../../../common/image/PharmGKB.png'
import PRO from '../../../common/image/PRO.png'
import header from '../../../common/image/header.jpg'
import Cookie from 'js-cookie';

import _ from 'lodash'
import 'pgi/style/p-case-report.less';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import ExportJsonExcel from 'js-export-excel';
import Item from 'antd/lib/list/Item';

const { TabPane } = Tabs;
const { Paragraph } = Typography


class Report extends Component {
    constructor(props) {
        super(props);
        this.pdfRef = React.createRef();
        this.state = {
            caseid: this.props.caseid,
            status: 0, // 0:waiting, 1:invalid, 2:Running, 3:Done, 4:Failed
            statusText: 'waiting',
            tumor_text: '',
            popu: '',
            time: '',
            Alterations: '',
            Therapies: '',
            Input: '',
            LA: '',
            LB: '',
            LC: '',
            LD: '',
            LE: '',
            LA2: '',
            LB2: '',
            LC2: '',
            LD2: '',
            LE2: '',
            Avoid: [],
            Caution: [],
            Routine: [],
            dataBS: [],
            dataRec: [],
            dataRes: [],
            dataRep: [],
            searchText: '',
            searchedColumn: '',
            drug: '',
            tissue: '',

        };
    }
    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
            console.log(setSelectedKeys);
            console.log(selectedKeys);
            console.log(confirm);
            console.log(clearFilters);
            return <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Search
                </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    Reset
                </Button>
            </div>
        },
        filterIcon: filtered => (
            <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: text =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text.toString()}
                />
            ) : (
                    <Tooltip overlayStyle={{ maxWidth: 350 }} title="Click the row to enter the details page." placement="topLeft" > { text}</Tooltip>

                ),
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };
    clearAllCookie() {
        var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
        if (keys) {
            for (var i = keys.length; i--;)
                console.log(keys[i])
            Cookie.remove(keys[i])
            // document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
        }
    };
    componentWillMount() {
        let caseid = this.state.caseid
        const formData = new FormData();
        formData.set("caseid", caseid);
        // Cookie.remove('_bl_uid')
        this.clearAllCookie()
        // return
        reqwest({
            //url: 'https://premedkb.cn/api/getReport',
            url: 'https://47.101.51.25/api/getReport',
            headers: {
                "Content-Security-Policy": "upgrade-insecure-requests"
            },
            method: 'post',
            processData: false,
            data: formData,
            success: (res) => {
                console.log('结果：', res)
                if (res.code == '404') {
                    message.error('Invalid Report ID');
                    this.setState({
                        status: 4,
                        statusText: 'Invalid Report ID'
                    })
                } else if (res.code == '202') {
                    this.setState({
                        status: 1,
                        statusText: 'Running'
                    })
                } else if (res.code == '201') {
                    this.setState({
                        status: 0,
                        statusText: 'Waiting'
                    })
                } else if (res.code == '200') {
                    let L_a = res.data.Summary.Target.Level_A.sensitivity
                    let L_b = res.data.Summary.Target.Level_B.sensitivity
                    let L_c = res.data.Summary.Target.Level_C.sensitivity
                    let L_d = res.data.Summary.Target.Level_D.sensitivity
                    let L_e = res.data.Summary.Target.Level_E.sensitivity
                    let L_A = !L_a ? '' : L_a
                    let L_B = !L_b ? '' : L_b
                    let L_C = !L_c ? '' : L_c
                    let L_D = !L_d ? '' : L_d
                    let L_E = !L_e ? '' : L_e
                    let L_a2 = res.data.Summary.Target.Level_A.resistance
                    let L_b2 = res.data.Summary.Target.Level_B.resistance
                    let L_c2 = res.data.Summary.Target.Level_C.resistance
                    let L_d2 = res.data.Summary.Target.Level_D.resistance
                    let L_e2 = res.data.Summary.Target.Level_E.resistance
                    let L_A2 = !L_a2 ? '' : L_a2
                    let L_B2 = !L_b2 ? '' : L_b2
                    let L_C2 = !L_c2 ? '' : L_c2
                    let L_D2 = !L_d2 ? '' : L_d2
                    let L_E2 = !L_e2 ? '' : L_e2
                    this.setState({
                        dataRec: res.data.Detail.Direct_Evidence,
                        dataRes: res.data.Detail.Drug_Response,
                        dataRep: res.data.Detail.Indirect_Evidence,
                        dataBS: res.data.Detail.Biomarker,
                        status: 2,
                        statusText: 'Done',
                        tumor_text: res.tumor,
                        popu: res.popu,
                        Therapies: res.data.Therapies,
                        Alterations: res.data.Alterations,
                        Input: res.data.Input,
                        time: res.time,
                        Avoid: res.data.Summary.Chemo.Avoid,
                        Caution: res.data.Summary.Chemo.Caution,
                        Routine: res.data.Summary.Chemo.Routine,
                        LA: L_A,
                        LB: L_B,
                        LC: L_C,
                        LD: L_D,
                        LE: L_E,
                        LA2: L_A2,
                        LB2: L_B2,
                        LC2: L_C2,
                        LD2: L_D2,
                        LE2: L_E2,
                        tissue: res.data.Tissue,

                    })

                } else {
                    this.setState({
                        status: 3,
                        statusText: 'Failed'
                    })
                }
            },
            error: () => {
                message.error('Error.');
                this.setState({
                    status: 3,
                    statusText: 'Failed'
                })
            },
        });
    }
    download = () => {
        let url = "https://premedkb.cn/case/" + this.state.caseid + "/premedkb-poi-report.zip"
        window.location.href = url
    }
    pdfdownload = (caseid) => {
        return (e) => {
            let title = 'PreMedKB-POI' + '_' + caseid + '_' + 'Therapy'
            html2canvas(document.querySelector('#pdfDom'), {
                allowTaint: true
            }).then(function (canvas) {
                let contentWidth = canvas.width
                let contentHeight = canvas.height
                let pageHeight = contentWidth / 592.28 * 841.89
                let leftHeight = contentHeight
                let position = 0
                //a4纸的尺寸[595.28,841.89]
                let imgWidth = 585.28
                let imgHeight = 592.28 / contentWidth * contentHeight
                let pageData = canvas.toDataURL('image/jpeg', 1.0)
                let PDF = new jsPDF('', 'pt', 'a4')
                if (leftHeight < pageHeight) {
                    PDF.addImage(pageData, 'JPEG', 5, 15, imgWidth, imgHeight)
                } else {
                    while (leftHeight > 0) {
                        PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
                        leftHeight -= pageHeight
                        position -= 841.89
                        if (leftHeight > 0) {
                            PDF.addPage()
                        }
                    }
                }
                PDF.save(title + '.pdf');
                console.log(PDF)
            })
        }
        // console.log("111")

    }
    downloadExcel = (caseid) => {
        return (e) => {
            console.log(this.state.dataRec)
            const datas1 = this.state.dataRec ? this.state.dataRec : '';//Direct Evidence
            const datas2 = this.state.dataRep ? this.state.dataRep : '';//Indirect Evidence
            const datas3 = this.state.dataRes ? this.state.dataRes : '';//Drug Response
            var option = {};
            let dataTable1 = [];
            if (datas1) {
                datas1.map((item) => {
                    let obj = {
                        // title: item.title,
                        // region: item.region,
                        // publishTime: item.publishTime,
                        Drugs: item.Drugs,
                        Gene: item.Gene,
                        Source: item.Source,
                        Response: item.Response,
                        Level: item.Level,
                        Level_Details: JSON.stringify(item.Level_Details),
                        Guidelines: JSON.stringify(item.Guidelines),
                    }
                    dataTable1.push(obj);
                    return dataTable1
                })

            }
            let dataTable2 = [];
            if (datas2) {
                datas2.map((item) => {
                    let obj = {
                        // title: item.title,
                        // region: item.region,
                        // publishTime: item.publishTime,
                        Drugs: item.Drugs,
                        Gene: item.Gene,
                        Associated_Gene: item.Associated_Gene,
                        Pathway: item.Pathway,
                        PPI_Score: item.PPI_Score,
                        Response: item.Response,
                        Level: item.Level,
                        Level_Details: JSON.stringify(item.Level_Details),
                        Guidelines: JSON.stringify(item.Guidelines),
                    }
                    dataTable2.push(obj);
                    return dataTable2
                })

            }
            let dataTable3 = [];
            if (datas3) {
                datas3.map((item) => {
                    let obj = {
                        // title: item.title,
                        // region: item.region,
                        // publishTime: item.publishTime,
                        Drugs: item.Drugs,
                        Gene: item.Gene,
                        Diplotype: item.Diplotype,
                        Source: item.Source,
                        Category: item.Category,
                        Response: item.Response,
                        Level: item.Level,
                        Level_Details: JSON.stringify(item.Level_Details),
                        Guidelines: JSON.stringify(item.Guidelines),
                    }
                    dataTable3.push(obj);
                    return dataTable3
                })

            }
            option.fileName = 'PreMedKB-POI' + '_' + caseid + '_' + 'Therapeutic Overview'
            option.datas = [
                {
                    sheetData: dataTable1,
                    sheetName: 'Direct Evidence',
                    sheetFilter: ['Drugs', 'Gene', 'Source', 'Response', 'Level', 'Level_Details', 'Guidelines'],
                    sheetHeader: ['Drug', 'Gene', 'Source', 'Response', 'Level', 'Level Detail', 'Guideline'],
                },
                {
                    sheetData: dataTable2,
                    sheetName: 'Indirect Evidence',
                    sheetFilter: ['Drugs', 'Gene', 'Associated_Gene', 'Pathway', 'PPI_Score', 'Response', 'Level', 'Level_Details', 'Guidelines'],
                    sheetHeader: ['Drug', 'Gene', 'Associated Gene', 'Pathway', 'PPI Score', 'Response', 'Level', 'Level Detail', 'Guideline'],
                },
                {
                    sheetData: dataTable3,
                    sheetName: 'Drug Response',
                    sheetFilter: ['Drugs', 'Gene', 'Diplotype', 'Source', 'Category', 'Response', 'Level', 'Level_Details', 'Guidelines'],
                    sheetHeader: ['Drug', 'Gene', 'Diplotype', 'Source', 'Category', 'Response', 'Level', 'Level Detail', 'Guideline'],
                },
            ];
            var toExcel = new ExportJsonExcel(option);
            toExcel.saveExcel();


        }

    }

    goToHelp = () => {
        this.props.history.push('/faq');
    }
    deDetail = (record, tissue) => {
        console.log('tissue：', tissue)
        this.props.history.push({
            pathname: '/case/details',
            state: {
                text: record,
                tissue: tissue
            }

        });


    }
    ieDetail = (record) => {
        console.log('传参：', record)
        this.props.history.push({
            pathname: '/case/iedetails',
            state: { text: record }

        });


    }
    drDetail = (record) => {
        console.log('传参：', record)
        this.props.history.push({
            pathname: '/case/drdetails',
            state: { text: record }

        });


    }
    // handleMouse =()=>{
    //     console.log('传参：')
    //     render: (text, record, index) => {
    //         return <Tooltip title="prompt text"><span>Tooltip will show on mouse enter.</span></Tooltip>;
    //     }  
    // }

    render() {
        const columns3 = [{
            title: 'Drug',
            dataIndex: 'Drugs',
            key: 'Drugs',
            sorter: (a, b) => a.Drugs.localeCompare(b.Drugs),
            ...this.getColumnSearchProps('Drugs'),
        }, {
            title: 'Gene',
            dataIndex: 'Gene',
            key: 'Gene',
            sorter: (a, b) => a.Gene.localeCompare(b.Gene),
            ...this.getColumnSearchProps('Gene'),
            // render: (text, record) => <a onClick={()=>{this.goToGeneView(text)}}>{text}</a>
        }, {
            title: 'Diplotype',
            dataIndex: 'Diplotype',
            key: 'Diplotype',
            sorter: (a, b) => a.Gene.localeCompare(b.Diplotype),
            ...this.getColumnSearchProps('Diplotype'),
            // render: (text, record) => <a onClick={()=>{this.goToGeneView(text)}}>{text}</a>
        }
            // , {
            //     title: 'Variant',
            //     dataIndex: 'Variant',
            //     key: 'Variant',
            //     sorter: (a, b) => a.Variant.localeCompare(b.Variant),
            //     ...this.getColumnSearchProps('Variant'),
            // }, {
            //     title: 'Allele',
            //     dataIndex: 'Allele',
            //     key: 'Allele',
            //     sorter: (a, b) => a.Allele.localeCompare(b.Allele),
            //     ...this.getColumnSearchProps('Allele'),
            // }
            , {
            title: 'Source',
            dataIndex: 'Source',
            key: 'Source',
            sorter: (a, b) => a.Source.localeCompare(b.Source),
            ...this.getColumnSearchProps('Source'),
        }, {
            title: 'Category',
            dataIndex: 'Category',
            key: 'Category',
            sorter: (a, b) => a.Category.localeCompare(b.Category),
            ...this.getColumnSearchProps('Category'),
        }, {
            title: 'Response',
            dataIndex: 'Response',
            key: 'Response',
            sorter: (a, b) => a.Responses.localeCompare(b.Responses),
            ...this.getColumnSearchProps('Response'),
        }, {
            title: 'Level',
            dataIndex: 'Level',
            key: 'Level',
            sorter: (a, b) => a.Level.localeCompare(b.Level),
            ...this.getColumnSearchProps('Level'),
        }
            , {
            title: 'Level Detail',
            dataIndex: 'Level_Details',
            key: 'Level_Details',
            render: Level_Details => (
                <div className="showIcons">
                    {Object.keys(Level_Details).map(i => {
                        return (
                            <img className="showIcon" src={require(`../../../common/image/${i}.png`)} />
                        );
                    })}
                </div>
            )
        }, {
            title: 'Guideline',
            dataIndex: 'Guidelines',
            key: 'Guidelines',
            render: Guidelines => (
                <div className="showIcons">
                    {Object.keys(Guidelines).map(i => {
                        return (
                            <img className="showIcon" src={require(`../../../common/image/${i}.png`)} />
                        );
                    })}
                </div>
            )
        }]
        const columns2 = [{
            title: 'Drug',
            dataIndex: 'Drugs',
            key: 'Drugs',
            ...this.getColumnSearchProps('Drugs'),
            //render: (text, record) => <a href={'user/' + record.name}>{text}</a>
        }, {
            title: 'Gene',
            dataIndex: 'Gene',
            key: 'Gene',
            width: '10%',
            sorter: (a, b) => a.Gene.localeCompare(b.Gene),
            ...this.getColumnSearchProps('Gene'),
            // render: (text, record) => <a onClick={()=>{this.goToGeneView(text)}}>{text}</a>
        }, {
            title: 'Associated Gene',
            dataIndex: 'Associated_Gene',
            key: 'Associated_Gene',
            width: '15%',
            ...this.getColumnSearchProps('Associated_Gene'),
        }, {
            title: 'Pathway',
            dataIndex: 'Pathway',
            key: 'Pathway',
            width: '15%',
            ...this.getColumnSearchProps('Pathway'),
        }, {
            title: 'PPI Score',
            dataIndex: 'PPI_Score',
            key: 'PPI_Score',
            width: '10%',
            sorter: (a, b) => a.PPI_Score - b.PPI_Score,
            ...this.getColumnSearchProps('PPI_Score'),
        }, {
            title: 'Response',
            dataIndex: 'Response',
            key: 'Response',
            ...this.getColumnSearchProps('Response'),
        }, {
            title: 'Level',
            dataIndex: 'Level',
            key: 'Level',
            sorter: (a, b) => a.Level.localeCompare(b.Level),
            ...this.getColumnSearchProps('Level'),
        }
            , {
            title: 'Level Detail',
            dataIndex: 'Level_Details',
            key: 'Level_Details',

            render: Level_Details => (
                <div className="showIcons">
                    {Object.keys(Level_Details).map(i => {
                        return (
                            <img className="showIcon" src={require(`../../../common/image/${i}.png`)} />
                        );
                    })}
                </div>
            )
        }, {
            title: 'Guideline',
            dataIndex: 'Guidelines',
            key: 'Guidelines',
            render: Guidelines => (
                <div className="showIcons">
                    {Object.keys(Guidelines).map(i => {
                        return (
                            <img className="showIcon" src={require(`../../../common/image/${i}.png`)} />
                        );
                    })}
                </div>
            )
        }]
        const columns1 = [{
            title: 'Drug',
            dataIndex: 'Drugs',
            key: 'Drugs',
            sorter: (a, b) => a.Drugs.localeCompare(b.Drugs),
            width: '20%',
            ...this.getColumnSearchProps('Drugs'),
        }, {
            title: 'Gene',
            dataIndex: 'Gene',
            key: 'Gene',
            sorter: (a, b) => a.Gene.localeCompare(b.Gene),
            width: '10%',
            ...this.getColumnSearchProps('Gene'),
            // className: 'tableHiddle',
            // render: (text, record) => <a onClick={()=>{this.goToGeneView(text)}}>{text}</a>
        }, {
            title: 'Source',
            dataIndex: 'Source',
            key: 'Source',
            sorter: (a, b) => a.Source.localeCompare(b.Source),
            ...this.getColumnSearchProps('Source'),
        }, {
            title: 'Response',
            dataIndex: 'Response',
            key: 'Response',
            width: '15%',
            ...this.getColumnSearchProps('Response'),
        }, {
            title: 'Level',
            dataIndex: 'Level',
            key: 'Level',
            sorter: (a, b) => a.Level.localeCompare(b.Level),
            ...this.getColumnSearchProps('Level'),
        }
            , {
            title: 'Level Detail',
            dataIndex: 'Level_Details',
            key: 'Level_Details',
            render: Level_Details => (
                <div className="showIcons">
                    {Object.keys(Level_Details).map(i => {
                        return (
                            <img className="showIcon" src={require(`../../../common/image/${i}.png`)} />
                        );
                    })}
                </div>
            )
        }
            , {
            title: 'Guideline',
            dataIndex: 'Guidelines',
            key: 'Guidelines',
            render: Guidelines => (
                <div className="showIcons">
                    {Object.keys(Guidelines).map(i => {
                        return (
                            <img className="showIcon" src={require(`../../../common/image/${i}.png`)} />
                        );
                    })}
                </div>
            )
        }]
        // const { Therapies, Alterations, Input, Level_A, Level_C, Level_B, Level_D, Level_E } = this.state.summary
        const { LA, LB, LC, LD, LE, LA2, LB2, LC2, LD2, LE2, Avoid, Caution, Routine } = this.state
        return (

            <div className="report-container">
                <div className="report-content">
                    <div className="report-content-head">
                        <p><b>Report</b> <b style={{ fontSize: '16px' }}>{this.state.caseid}</b></p>
                        <p><b>Status</b>: {this.state.statusText}</p>
                        <p style={{ display: this.state.tumor_text == '' ? 'none' : 'block' }}><b>Tumor Type</b>: {this.state.tumor_text}</p>
                        <p style={{ display: this.state.popu == '' ? 'none' : 'block' }}><b>Reference Population</b>: {this.state.popu}</p>
                        <p style={{ display: this.state.time == '' ? 'none' : 'block' }}><b>Date</b>: {this.state.time}</p>
                    </div>
                    <div className="report-content-img">
                        <img Height={120} src={require('../../../common/image/header.jpg')} />
                    </div>
                </div>

                <div className="report-show">
                    {
                        this.state.status == 2 ? (
                            <div>
                                <div className="report-show-content-title">

                                    <b>Summary</b>
                                    <div className="report-show-content-icon">
                                        <img width={16} onClick={this.goToHelp} src={require('../../../common/image/wenhao.png')} />
                                    </div>
                                    {/* <Tag style={{ cursor: 'pointer' }} onClick={this.pdfdownload} color="blue">Download Result (.zip)</Tag> */}
                                    {/* <Button onClick={this.pdfdownload}>Download Therapy(.pdf)</Button> */}
                                    {/* <Button onClick={this.downloadExcel}>Download Therapeutic Overview(.xlsx)</Button> */}
                                </div>
                                <div className="report-show-content" id="pdfDom">

                                    {/* <div className="report-container" id="pdfDom">
                                        
                                    </div> */}
                                    <div style={{ marginBottom: '10px' }}>
                                        <span style={{ marginBottom: '5px', marginTop: '12px', fontSize: '18px', marginRight: '10px' }}><b>Therapy</b></span>
                                        <Button onClick={this.pdfdownload(this.state.caseid)} ><Icon type="download" />Download Therapy(.pdf)</Button>
                                    </div>

                                    <p style={{ marginBottom: '5px', marginTop: '12px', fontSize: '15px' }}><b>Target therapy / Immunotherapy</b></p>
                                    <div className="report-show-content-text">
                                        <p>There are <span>{this.state.Therapies}</span> therapies were selected based on <span>{this.state.Alterations}</span> alterations in the <span>{this.state.Input}</span>.</p>

                                    </div>
                                    <div className="report-show-content-levels">
                                        <table>
                                            <tr>
                                                <th style={{ width: '10%' }}></th>
                                                <th style={{ width: '45%' }}><div style={{ fontSize: '18px', width: '100%', textAlign: 'center', display: 'inline-block' }}>Sensitivity</div></th>
                                                <th style={{ width: '45%', borderRight: 'none' }}><div style={{ fontSize: '18px', width: '100%', textAlign: 'center', display: 'inline-block' }}>Resistance</div></th>
                                            </tr>
                                            <tr style={{ background: "#F8FCFA" }}>
                                                <td style={{ textAlign: 'center' }}><Tag style={{ fontSize: 16 }} color="#1F8050"><b>Level A</b></Tag></td>
                                                <td >{!LA === false ? (
                                                    <div className="report-show-content-level">
                                                        <span style={{ width: '100%', display: 'inlineBlock' }}>
                                                            {LA.map((drug, index) => {
                                                                if (LA[LA.length - 1] == '') {
                                                                    LA.length = LA.length - 1;
                                                                }
                                                                if (LA.length == index + 1) {

                                                                    return (
                                                                        <span>{drug}</span>
                                                                    )

                                                                } else {

                                                                    return (
                                                                        <span>{drug}<b style={{ color: '#000', marginRight: '6px' }}>,</b></span>
                                                                    )

                                                                }
                                                            })}
                                                        </span>

                                                    </div>
                                                ) : <div></div>}</td>
                                                <td style={{ width: '45%', borderRight: 'none' }}>{!LA2 === false ? (
                                                    <div className="report-show-content-level">
                                                        <span style={{ width: '100%', display: 'inlineBlock', wordBreak: 'break-all' }}>
                                                            {LA2.map((drug, index) => {
                                                                if (LA2[LA2.length - 1] == '') {
                                                                    LA2.length = LA2.length - 1;
                                                                }
                                                                if (LA2.length == index + 1) {

                                                                    return (
                                                                        <span>{drug}</span>
                                                                    )

                                                                } else {

                                                                    return (
                                                                        <span>{drug}<b style={{ color: '#000', marginRight: '6px' }}>,</b></span>
                                                                    )

                                                                }
                                                            })}
                                                        </span>

                                                    </div>
                                                ) : <div></div>
                                                }</td>
                                            </tr>
                                            <tr style={{ background: "#F3FCFF" }}>
                                                <td style={{ textAlign: 'center' }}><Tag style={{ fontSize: 16 }} color="#003254"><b>Level B</b></Tag></td>
                                                <td>{!LB === false ? (
                                                    <div className="report-show-content-level">

                                                        <span style={{ width: "100%", display: "inlineBlock" }}>
                                                            {LB.map((drug, index) => {
                                                                if (LB[LB.length - 1] == '') {
                                                                    LB.length = LB.length - 1;
                                                                }
                                                                if (LB.length == index + 1) {

                                                                    return (
                                                                        <span>{drug}</span>
                                                                    )

                                                                } else {

                                                                    return (
                                                                        <span>{drug}<b style={{ color: '#000', marginRight: '6px' }}>, </b></span>
                                                                    )

                                                                }
                                                            })}
                                                        </span>
                                                    </div>
                                                ) : <div></div>
                                                }</td>
                                                <td style={{ width: '45%', borderRight: 'none' }}>{!LB2 === false ? (
                                                    <div className="report-show-content-level">

                                                        <span style={{ width: "100%", display: "inlineBlock" }}>
                                                            {LB2.map((drug, index) => {
                                                                if (LB2[LB2.length - 1] == '') {
                                                                    LB2.length = LB2.length - 1;
                                                                }
                                                                if (LB2.length == index + 1) {

                                                                    return (
                                                                        <span>{drug}</span>
                                                                    )

                                                                } else {

                                                                    return (
                                                                        <span>{drug}<b style={{ color: '#000', marginRight: '6px' }}>, </b></span>
                                                                    )

                                                                }
                                                            })}
                                                        </span>
                                                    </div>
                                                ) : <div></div>
                                                }</td>
                                            </tr>
                                            <tr style={{ background: "#FFFEF9" }}>
                                                <td style={{ textAlign: 'center' }}><Tag style={{ textAlign: 'center', fontSize: 16 }} color="#ECAC18"><b style={{ width: "100%", textAlign: 'center' }}>Level C</b></Tag></td>
                                                <td>{!LC === false ? (
                                                    <div className="report-show-content-level">

                                                        <span style={{ width: "100%", display: "inlineBlock" }}>
                                                            {LC.map((drug, index) => {
                                                                //console.log(LC.length)//2
                                                                if (LC[LC.length - 1] == '') {
                                                                    LC.length = LC.length - 1;
                                                                }
                                                                if (LC.length == index + 1) {

                                                                    return (
                                                                        <span>{drug}</span>
                                                                    )

                                                                } else {


                                                                    return (
                                                                        <span>{drug}<b style={{ color: '#000', marginRight: '6px' }}>, </b></span>
                                                                    )

                                                                }
                                                            })}
                                                        </span>
                                                    </div>
                                                ) : <div></div>
                                                }</td>
                                                <td style={{ width: '45%', borderRight: 'none' }}>{!LC2 === false ? (
                                                    <div className="report-show-content-level">

                                                        <span style={{ width: "100%", display: "inlineBlock" }}>
                                                            {LC2.map((drug, index) => {
                                                                //console.log(LC.length)//2
                                                                if (LC2[LC2.length - 1] == '') {
                                                                    LC2.length = LC2.length - 1;
                                                                }
                                                                if (LC2.length == index + 1) {

                                                                    return (
                                                                        <span>{drug}</span>
                                                                    )

                                                                } else {


                                                                    return (
                                                                        <span>{drug}<b style={{ color: '#000', marginRight: '6px' }}>, </b></span>
                                                                    )

                                                                }
                                                            })}
                                                        </span>
                                                    </div>
                                                ) : <div></div>
                                                }</td>
                                            </tr>
                                            <tr style={{ background: "#FCF9F9" }}>
                                                <td style={{ textAlign: 'center' }}> <Tag style={{ fontSize: 16 }} color="#8E0019"><b>Level D</b></Tag></td>
                                                <td>{!LD === false ? (
                                                    <div className="report-show-content-level" style={{ display: !LD ? 'none' : 'block' }}>

                                                        <span style={{ width: "100%", display: "inlineBlock" }}>
                                                            {LD.map((drug, index) => {
                                                                if (LD[LD.length - 1] == '') {
                                                                    LD.length = LD.length - 1;
                                                                }
                                                                if (LD.length == index + 1) {

                                                                    return (
                                                                        <span>{drug}</span>
                                                                    )

                                                                } else {

                                                                    return (
                                                                        <span>{drug}<b style={{ color: '#000', marginRight: '6px' }}>, </b></span>
                                                                    )

                                                                }
                                                            })}
                                                        </span>
                                                    </div>
                                                ) : <div></div>
                                                }</td>
                                                <td style={{ width: '45%', borderRight: 'none' }}>{!LD2 === false ? (
                                                    <div className="report-show-content-level" style={{ display: !LD2 ? 'none' : 'block' }}>

                                                        <span style={{ width: "100%", display: "inlineBlock" }}>
                                                            {LD2.map((drug, index) => {
                                                                if (LD2[LD2.length - 1] == '') {
                                                                    LD2.length = LD2.length - 1;
                                                                }
                                                                if (LD2.length == index + 1) {

                                                                    return (
                                                                        <span>{drug}</span>
                                                                    )

                                                                } else {

                                                                    return (
                                                                        <span>{drug}<b style={{ color: '#000', marginRight: '6px' }}>, </b></span>
                                                                    )

                                                                }
                                                            })}
                                                        </span>
                                                    </div>
                                                ) : <div></div>
                                                }</td>
                                            </tr>
                                            <tr style={{ background: "#F9F9F9" }}>
                                                <td style={{ textAlign: 'center', borderBottom: 'none' }}><Tag style={{ fontSize: 16 }} color="#595958"><b>Level E</b></Tag></td>
                                                <td style={{ borderBottom: 'none' }}>{!LE === false ? (
                                                    <div className="report-show-content-level">

                                                        <span style={{ width: "100%", display: "inlineBlock" }}>
                                                            {LE.map((drug, index) => {
                                                                if (LE[LE.length - 1] == '') {
                                                                    LE.length = LE.length - 1;
                                                                }
                                                                if (LE.length == index + 1) {

                                                                    return (
                                                                        <span>{drug}</span>
                                                                    )

                                                                } else {

                                                                    return (
                                                                        <span>{drug}<b style={{ color: '#000', marginRight: '6px' }}>, </b></span>
                                                                    )

                                                                }
                                                            })}
                                                        </span>
                                                    </div>
                                                ) : <div></div>
                                                }</td>
                                                <td style={{ width: '45%', borderRight: 'none', borderBottom: 'none' }}>{!LE2 === false ? (
                                                    <div className="report-show-content-level">

                                                        <span style={{ width: "100%", display: "inlineBlock" }}>
                                                            {LE2.map((drug, index) => {
                                                                if (LE2[LE2.length - 1] == '') {
                                                                    LE2.length = LE2.length - 1;
                                                                }
                                                                if (LE2.length == index + 1) {

                                                                    return (
                                                                        <span>{drug}</span>
                                                                    )

                                                                } else {

                                                                    return (
                                                                        <span>{drug}<b style={{ color: '#000', marginRight: '6px' }}>, </b></span>
                                                                    )

                                                                }
                                                            })}
                                                        </span>
                                                    </div>
                                                ) : <div></div>
                                                }</td>
                                            </tr>

                                        </table>
                                    </div>


                                    <p style={{ marginBottom: '0px', marginTop: '0px', fontSize: '15px' }}><b>Chemotherapy
                                    </b></p>

                                    <div className="report-show-content-levels">
                                        <table>
                                            <tr style={{ background: "#FCF9F9" }}>
                                                {/* <td style={{ width: '7.3%', textAlign: 'center' }}><Tag style={{ width: 123, height: 26, textAlign: 'center', fontSize: 16 }} color='#C00000'><b>Avoid Use</b></Tag></td> */}
                                                <td style={{ width: '9%', textAlign: 'center', borderRight: '2px solid #ecedf1' }}><b style={{ color: '#C00000', textAlign: 'center', fontSize: 18 }}>Avoid</b></td>
                                                <td style={{ width: '90%', borderRight: 'none' }}>{!Avoid === false ? (
                                                    <div className="report-show-content-level">
                                                        <span style={{ width: '100%', display: 'inlineBlock' }}>
                                                            {Avoid.map((drug, index) => {

                                                                if (Avoid[Avoid.length - 1] == '') {
                                                                    Avoid.length = Avoid.length - 1;
                                                                }
                                                                if (Caution.length == index + 1) {

                                                                    return (
                                                                        <span>{drug}</span>
                                                                    )

                                                                } else {

                                                                    return (
                                                                        <span>{drug}<b style={{ color: '#000', marginRight: '6px' }}>,</b></span>
                                                                    )

                                                                }
                                                            })}
                                                        </span>

                                                    </div>
                                                ) : <div></div>}</td>

                                            </tr>
                                            <tr style={{ background: "#FFFEF9" }}>
                                                {/* <td style={{ width: '6.5%', textAlign: 'center' }}><Tag style={{ width: 123, height: 26, textAlign: 'center', fontSize: 16 }} color='#FFC000'><b>Use in Caution</b></Tag></td> */}
                                                <td style={{ width: '7.5%', textAlign: 'center', borderRight: '2px solid #ecedf1' }}><b style={{ textAlign: 'center', fontSize: 18, color: '#FFC000' }}>Caution</b></td>
                                                <td style={{ width: '90%', borderRight: 'none' }}>{!Caution === false ? (
                                                    <div className="report-show-content-level">
                                                        <span style={{ width: '100%', display: 'inlineBlock' }}>
                                                            {Caution.map((drug, index) => {

                                                                if (Caution[Caution.length - 1] == '') {
                                                                    Caution.length = Caution.length - 1;
                                                                }
                                                                if (Caution.length == index + 1) {

                                                                    return (
                                                                        <span>{drug}</span>
                                                                    )

                                                                } else {

                                                                    return (
                                                                        <span>{drug}<b style={{ color: '#000', marginRight: '6px' }}>,</b></span>
                                                                    )

                                                                }
                                                            })}
                                                        </span>

                                                    </div>
                                                ) : <div></div>}</td>


                                            </tr>
                                            <tr style={{ background: "#F8FCFA" }}>
                                                {/* <td style={{ width: '6.5%', textAlign: 'center' }}><Tag style={{ width: 123, height: 26, textAlign: 'center', fontSize: 16 }} color="#1F8050"><b>Routine Use</b></Tag></td> */}
                                                <td style={{ width: '7.5%', textAlign: 'center', borderRight: '2px solid #ecedf1', borderBottom: 'none' }}><b style={{ textAlign: 'center', fontSize: 18, color: "#1F8050" }}>Routine</b></td>
                                                <td style={{ width: '90%', borderBottom: 'none', borderRight: 'none' }}>{!Routine === false ? (
                                                    <div className="report-show-content-level">
                                                        <span style={{ width: '100%', display: 'inlineBlock' }}>
                                                            {Routine.map((drug, index) => {

                                                                if (Routine[Routine.length - 1] == '') {
                                                                    Routine.length = Routine.length - 1;
                                                                }
                                                                if (Routine.length == index + 1) {

                                                                    return (
                                                                        <span>{drug}</span>
                                                                    )

                                                                } else {

                                                                    return (
                                                                        <span>{drug}<b style={{ color: '#000', marginRight: '6px' }}>,</b></span>
                                                                    )

                                                                }
                                                            })}
                                                        </span>

                                                    </div>
                                                ) : <div></div>}</td>

                                            </tr>


                                        </table>
                                    </div>
                                </div>
                                <div style={{ marginBottom: '15px' }}>
                                    <span style={{ marginBottom: '20px', marginTop: '12px', fontSize: '18px', marginRight: '10px' }}><b>Therapeutic Overview</b></span>
                                    <Button onClick={this.downloadExcel(this.state.caseid)}><Icon type="download" />Download Therapeutic Overview(.xlsx)</Button>
                                </div>

                                {/* <Tooltip title="Click the row to enter the details page." placement="topLeft"> */}
                                <div>
                                    <Tabs defaultActiveKey="1" type="card" size='large'>

                                        <TabPane tab="Direct Evidence" key="1">

                                            <Table rowKey={(record, index) => index} style={{ cursor: 'pointer' }} columns={columns1} dataSource={this.state.dataRec}
                                                onRow={record => {
                                                    return {
                                                        onClick: event => { this.deDetail(record, this.state.tissue) }, // 点击行
                                                        //   onMouseEnter:event => {this.handleMouse()},
                                                    };
                                                }} />


                                        </TabPane>
                                        <TabPane tab="Indirect Evidence" key="2">
                                            <Table rowKey={(record, index) => index} style={{ cursor: 'pointer' }} columns={columns2} dataSource={this.state.dataRep} onRow={record => {
                                                return {
                                                    onClick: event => { this.ieDetail(record) }, // 点击行
                                                };
                                            }}

                                            />
                                        </TabPane>
                                        <TabPane tab="Drug Response" key="3">
                                            <Table rowKey={(record, index) => index} style={{ cursor: 'pointer' }} columns={columns3} dataSource={this.state.dataRes} onRow={record => {
                                                return {
                                                    onClick: event => { this.drDetail(record) }, // 点击行

                                                };
                                            }} />
                                        </TabPane>
                                    </Tabs>
                                </div>
                                {/* </Tooltip> */}


                            </div>
                        ) : (
                                <div>
                                    <div style={{ display: this.state.status == 4 ? 'none' : 'block' }}>Waiting for a moment and reload this url to get the report...</div>
                                    <div style={{ display: this.state.status != 4 ? 'none' : 'block' }}>Invalid Report ID, Please check your URL...</div>
                                </div>
                            )
                    }
                </div>
            </div >

        )
    }
}

export default withRouter(Report);