import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import 'pgi/style/p-case-geneview.less';
import { Tabs, Tag, Descriptions, Badge, Icon, Table, notification, Popover, Button, Row } from 'antd';
import { index, text } from 'd3';
import Bp from './echarts-bp';
import reqwest from 'reqwest';


const { TabPane } = Tabs;

let res;
let tis;

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.backClick = this.backClick.bind(this)
    // console.log("111", this.props.location.state.text.CNV)

    if (this.props.location.state && this.props.location.state.text && this.props.location.state.tissue) {//判断当前有参数
      res = this.props.location.state.text;
      tis = this.props.location.state.tissue;
      sessionStorage.setItem('data_res', JSON.stringify(res));// 存入到sessionStorage中
      sessionStorage.setItem('data_tis', JSON.stringify(tis));
    } else {//没有参数
      res = JSON.parse(sessionStorage.getItem('data_res'));// 当state没有参数时，取sessionStorage中的参数
      tis = JSON.parse(sessionStorage.getItem('data_tis'))
    }
    //console.log("111", tis)
    this.state = {
      Tumor_CPM: 0,
      color: '#1F8050',
      res: res,
      NormTissue_s: [],
      exp_res: [],
      visible: false,
      show: -1,
      tis: tis,
      curkey: -2,
    };
  }
  callback = (key) => {
    console.log(key);
  }
  backClick() {
    this.props.history.go(-1)
  }
  showBox(Gene) {

    // console.log('传参：', Gene)
    // this.props.history.push({
    //   pathname: '/case/expbp',
    //   state: { Gene: Gene }

    // });
  }
  setColor() {
    if (res.Level == 'C') {
      this.setState({
        color: '#ECAC18',
      })
    } else if (res.Level == 'A') {
      this.setState({
        color: '#1F8050',
      })
    } else if (res.Level == 'B') {
      this.setState({
        color: '#1F8050',
      })
    } else if (res.Level == 'D') {
      this.setState({
        color: '#8E0019',
      })
    } else if (res.Level == 'E') {
      this.setState({
        color: '#595958',
      })
    }
  }

  handleVisibleChange = (visible, key) => {
    // visible = true / false;
    if (visible) {
      this.setState({ visible, show: key }); // 如果是显示的话, 将显示popover, 因此需要修改visible和show
    } else {
      this.setState({ visible, show: -1 }); // 隐藏
    }
  };
  popoveClick = (e) => {
    this.setState({
      visible: false,
      show: -1,
    });
  }

  componentWillMount() {
    this.setColor();
    let gene = res.Gene
    const formData = new FormData();
    formData.set("gene", gene);
    reqwest({
      //url: 'https://premedkb.cn/api/getExpression',
      url: 'https://47.101.51.25/api/getExpression',
      method: 'post',
      headers: {
        "Content-Security-Policy": "upgrade-insecure-requests"
      },
      processData: false,
      data: formData,
      success: (res) => {
        this.setState({
          NormTissue_s: res['NormTissue_s'],
          exp_res: res['exp_res'],

        })
      },
      error: () => {
        message.error('Error');
      },
    });
  }

  render() {
    const content = (
      <div style={{ width: '1200px', height: '660px' }}>
        {/* <a onClick={this.hide} style={{ marginRight: 0 }}>Close</a> */}
        <Bp data1={this.state.NormTissue_s} data2={this.state.exp_res} data3={this.state.Tumor_CPM} data4={this.state.tis} />

      </div>
    );
    // const content1 = (
    //   <button onClick={this.popoveClick}>Close</button>
    // );

    const columnsSmall = [
      {
        title: 'Gene',
        dataIndex: 'Gene',
        key: 'Gene',
      },
      {
        title: 'Origin',
        dataIndex: 'Origin',
        key: 'Origin',
      },
      {
        title: 'Location',
        dataIndex: 'Location',
        key: 'Location',
      },
      {
        title: 'Ref>Alt',
        dataIndex: 'Ref>Alt',
        key: 'Ref>Alt',
      },
      {
        title: 'Transcript',
        dataIndex: 'Transcript',
        key: 'Transcript',
      },
      {
        title: 'Exon',
        dataIndex: 'Exon',
        key: 'Exon',
      },
      {
        title: 'Protein Change',
        dataIndex: 'Protein_Change',
        key: 'Protein_Change',
      },
      {
        title: 'Function',
        dataIndex: 'Function',
        key: 'Function',
      },
      {
        title: 'Clinical Significance',
        dataIndex: 'Clinical_Significance',
        key: 'Clinical_Significance',
      },
      {
        title: 'Pathogenic Prediction',
        dataIndex: 'Pathogenic_Prediction',
        key: 'Pathogenic_Prediction',
      },
      {
        title: 'Population AF',
        dataIndex: 'Population_AF',
        key: 'Population_AF',
      }

    ]
    const columnsGermline = [
      {
        title: 'Gene',
        dataIndex: 'Gene',
        key: 'Gene',
      },
      {
        title: 'Variant',
        dataIndex: 'Variant',
        key: 'Variant',
      },
      {
        title: 'Diplotype',
        dataIndex: 'Diplotype',
        key: 'Diplotype',
      },
      {
        title: 'Category',
        dataIndex: 'Category',
        key: 'Category',
      },
      {
        title: 'Phenotype',
        dataIndex: 'Phenotype',
        key: 'Phenotype',
      },
      {
        title: 'Annotation',
        dataIndex: 'Annotation',
        key: 'Annotation',
      }
    ]
    const columnsCopy = [
      {
        title: 'Gene',
        dataIndex: 'Gene',
        key: 'Gene',
      },
      {
        title: 'Copy Change',
        dataIndex: 'Copy_Change',
        key: 'Copy_Change',
      },
      {
        title: 'CNV State',
        dataIndex: 'CNV_State',
        key: 'CNV_State',
      },
      {
        title: 'LOH State',
        dataIndex: 'LOH_State',
        key: 'LOH_State',
      },
      {
        title: 'Cytoband',
        dataIndex: 'Cytoband',
        key: 'Cytoband',
      },
      {
        title: 'Location',
        dataIndex: 'Location',
        key: 'Location',
      }
    ]
    const columnsFusion = [
      {
        title: 'Gene Pairs',
        dataIndex: 'Gene_Pairs',
        key: 'Gene_Pairs',
      },
      {
        title: 'Breakpoint',
        dataIndex: 'Breakpoint',
        key: 'Breakpoint',
      },
      {
        title: 'Event Type',
        dataIndex: 'Event_Type',
        key: 'Event_Type',
      }, {
        title: 'Sample',
        dataIndex: 'Sample',
        key: 'Sample',
      },
      {
        title: 'Cytogenic Description',
        dataIndex: 'Cytogenic_Description',
        key: 'Cytogenic_Description',
      }
    ]
    const columnsImmune = [
      {
        title: 'Gene',
        dataIndex: 'Gene',
        key: 'Gene',
      },
      {
        title: 'MSI Score',
        dataIndex: 'MSI_Score',
        key: 'MSI_Score',
      },
      {
        title: 'MSI State',
        dataIndex: 'MSI_State',
        key: 'MSI_State',
      },
      {
        title: 'TMB',
        dataIndex: 'TMB',
        key: 'TMB',
      },
      {
        title: 'TMB State',
        dataIndex: 'TMB_State',
        key: 'TMB_State',
      }
    ]
    const columnsExpression = [
      {
        title: 'Gene',
        dataIndex: 'Gene',
        key: 'Gene',
      },
      {
        title: 'Alteration',
        dataIndex: 'Alteration',
        key: 'Alteration',
      },
      {
        title: 'Tumor CPM',
        dataIndex: 'Tumor_CPM',
        key: 'Tumor_CPM',
      },
      {
        title: 'Normal CPM',
        dataIndex: 'Normal_CPM',
        key: 'Normal_CPM',
      },
      {
        title: 'log2FC',
        dataIndex: 'log2FC',
        key: 'log2FC',
        render: (item) => (

          item.toFixed(2)
        )

      }, {
        title: 'Rank',
        dataIndex: 'Rank',
        key: 'Rank',
      },
      {
        title: 'Percentile',
        dataIndex: 'Percentile',
        key: 'Percentile',
      }
      , {
        title: 'Exp Distribution',
        dataIndex: 'Tumor_CPM',
        key: 'Exp Distribution',
        render: Tumor_CPM => (
          <div>
            {/* <Popover content={content1} title="Gene Expression Distribution" trigger="click" placement="topRight" arrowPointAtCenter visible={this.state.show === rowKey && this.state.visible}
              onVisibleChange={(e) => this.handleVisibleChange(e, rowKey)}> */}
            {/* 怎么在这里获得当前行的key值？ */}
            {/* <Icon type="box-plot" theme="twoTone" onClick={() => this.setState({
                Tumor_CPM: Tumor_CPM,
                // visible: true
              })} /> */}
            {/* <Button>Click me</Button> */}
            {/* </Popover> */}
            <Popover content={content} title="Gene Expression Distribution" trigger="click" placement="topRight" arrowPointAtCenter >
              <Icon type="box-plot" theme="twoTone" onClick={() => this.setState({
                Tumor_CPM: Tumor_CPM,
                // visible: true
              })} />
              {/* <Button>Click me</Button> */}
            </Popover>
          </div >
        )
      }


    ]
    return (
      <div>
        <div className="geneview-show-content-title">
          <b> Details </b>
          <Tag style={{ cursor: 'pointer' }} color="blue" onClick={this.backClick} > back </Tag>
        </div>
        <p style={{ marginBottom: '20px', marginTop: '12px', fontSize: '18px' }}><b>Therapeutic Details</b></p>
        <Descriptions bordered column={4}>
          <Descriptions.Item label="Gene">{res.Gene}</Descriptions.Item>
          <Descriptions.Item label="Alteration">{res.Alteration}</Descriptions.Item>
          <Descriptions.Item label="Source">{res.Source}</Descriptions.Item>
          <Descriptions.Item label="Drug">{res.Drugs}</Descriptions.Item>


          <Descriptions.Item label="Response" span={2}>
            {res.Response}
          </Descriptions.Item>
          <Descriptions.Item label="Level" span={2}>
            <Tag style={{ textAlign: 'center', height: 26, width: 30, fontSize: 18 }} color={this.state.color}><b>{res.Level}</b></Tag>
          </Descriptions.Item>

          <Descriptions.Item label="Level Detail" span={4}>
            {!res.Level_Details == false ? (
              <div>
                {Object.keys(res.Level_Details).map(key => {

                  return (


                    < table style={{ borderCollapse: 'collapse', border: '1px solid #ecedf1' }}>
                      <tr>
                        <td style={{ width: '11%', padding: '0.5em' }}><Tag><img width={30} height={30} style={{ padding: '4px' }} src={require(`../../../common/image/${key}.png`)} /><b>{key}</b></Tag></td>
                        <td>{

                          res.Level_Details[key].map((item, index) => {
                            // console.log({ key })
                            console.log(this.state.color)
                            if (index == (res.Level_Details[key].length - 1)) {
                              return <a style={{ wordWrap: 'break-word' }} target="_blank" href={item}>{item}</a>
                            } else {

                              return <div>{item}</div>
                            }

                          })
                        }</td>
                      </tr>

                    </table>
                  );
                })}
              </div>
            ) : <div></div>

            }


          </Descriptions.Item>
          <Descriptions.Item label="Guideline" span={4}>
            {!res.Guidelines == false ? (
              <div>
                {Object.keys(res.Guidelines).map(key => {
                  console.log(Object.prototype.toString.apply(res.Guidelines[key]))
                  console.log(Object.prototype.toString.apply(res.Guidelines[key]) == "[object String]")
                  if (Object.prototype.toString.apply(res.Guidelines[key]) == "[object String]") {
                    return (
                      <table style={{ borderCollapse: 'collapse', border: '1px solid #ecedf1' }}>
                        <tr>
                          <td style={{ width: '10%', padding: '0.5em' }}><Tag><img width={30} height={30} style={{ padding: '3px' }} src={require(`../../../common/image/${key}.png`)} /><b>{key}</b></Tag></td>
                          <td><div>{res.Guidelines[key]}</div></td>
                        </tr>
                      </table>
                    )
                  } else {
                    return (
                      <table style={{ borderCollapse: 'collapse', border: '1px solid #ecedf1' }}>
                        <tr>
                          <td style={{ width: '10%', padding: '0.5em' }}><Tag><img width={30} height={30} style={{ padding: '3px' }} src={require(`../../../common/image/${key}.png`)} /><b>{key}</b></Tag></td>
                          <td>
                            {


                              res.Guidelines[key].map((item, index) => {


                                return (
                                  <div>{item}</div>

                                )
                              }

                              )
                            }
                          </td>
                        </tr>
                      </table>

                    );
                  }
                }

                )
                }
              </div>

            ) : <div></div>}
          </Descriptions.Item>
        </Descriptions>
        <p style={{ marginBottom: '20px', marginTop: '12px', fontSize: '18px' }}><b>Biomarker Details</b></p>
        <ul style={{ fontSize: '14px' }}>
          <li style={{ marginTop: '12px' }}>
            <p><b>Small Variant</b></p>
            <Table columns={columnsSmall} dataSource={res.Small_Variant} />
          </li>

          <li style={{ marginTop: '12px' }}>
            <p><b>Copy Number Variation</b></p>
            <Table columns={columnsCopy} dataSource={res.CNV} />
          </li>

          <li style={{ marginTop: '12px' }}>
            <p><b>Gene Fusion</b></p>
            <Table columns={columnsFusion} dataSource={res.Fusion} />
          </li>

          <li style={{ marginTop: '12px' }}>
            <p><b>Gene Expression</b></p>
            <Table rowKey={(record, index) => index} columns={columnsExpression} dataSource={res.Expression}
            />
            {/* onRow={(record, index) => {
              return {
                onClick: event => {
                  this.setState({
                    curkey: index,
                  })
                  console.log("当前curkey", this.state.curkey)
                }, // 点击行
              };

            }} */}
            {/* 给函数附上当前行的index当key； */}
          </li>
        </ul>
      </div >
    )
  }
}
export default withRouter(Details);