import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import 'pgi/style/p-case-geneview.less';
import { Tabs, Tag, Descriptions, Badge, Icon, Table } from 'antd';

import { text } from 'd3';


const { TabPane } = Tabs;

let res;
class IEDetails extends React.Component {
  constructor(props) {
    super(props);
    this.backClick = this.backClick.bind(this)
    if (this.props.location.state && this.props.location.state.text) {//判断当前有参数
      res = this.props.location.state.text;
      sessionStorage.setItem('data', JSON.stringify(res));// 存入到sessionStorage中
    } else {//没有参数
      res = JSON.parse(sessionStorage.getItem('data'));// 当state没有参数时，取sessionStorage中的参数
    }
    console.log("111", res.Gene)
    this.state = {
      color: '#1F8050',
      res: res
    };
  }
  callback = (key) => {
    console.log(key);
  }
  backClick() {
    this.props.history.go(-1)
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
  componentWillMount() {
    this.setColor();
  }
  render() {


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

    return (
      <div>
        <div className="geneview-show-content-title">
          <b> Details </b>
          <Tag style={{ cursor: 'pointer' }} color="blue" onClick={this.backClick} > back </Tag>
        </div>
        <p style={{ marginBottom: '20px', marginTop: '12px', fontSize: '18px' }}><b>Therapeutic Details</b></p>
        <Descriptions bordered column={5}>
          <Descriptions.Item label="Gene">{res.Gene}</Descriptions.Item>
          <Descriptions.Item label="Alteration">{res.Alteration}</Descriptions.Item>
          <Descriptions.Item label="Pathway">{res.Pathway}</Descriptions.Item>
          <Descriptions.Item label="PPI Score">{res.PPI_Score}</Descriptions.Item>
          <Descriptions.Item label="Drug">{res.Drugs}</Descriptions.Item>

          <Descriptions.Item label="Response" span={2}>
            {res.Response}
          </Descriptions.Item>
          <Descriptions.Item label="Level" span={3}>
            <Tag style={{ textAlign: 'center', height: 26, width: 60, fontSize: 18 }} color={this.state.color}><b>{res.Level}</b></Tag>
          </Descriptions.Item>



          <Descriptions.Item label="Level Detail" span={5}>
            {!res.Level_Details == false ? (
              <div>
                {Object.keys(res.Level_Details).map(key => {

                  return (


                    < table style={{ borderCollapse: 'collapse', border: '1px solid #ecedf1' }}>
                      <tr>
                        <td style={{ width: '11.5%', padding: '0.5em' }}><Tag><img width={30} height={30} style={{ padding: '4px' }} src={require(`../../../common/image/${key}.png`)} /><b>{key}</b></Tag></td>
                        <td>{

                          res.Level_Details[key].map((item, index) => {
                            // console.log({ key })
                            console.log(this.state.color)
                            if (index == (res.Level_Details[key].length - 1)) {
                              return <a target="_blank" href={item}>{item}</a>
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
          <Descriptions.Item label="Guideline" span={5}>
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
        {/* <p style={{ marginBottom: '20px', marginTop: '12px', fontSize: '18px' }}><b>Biomarker Details</b></p>
        <ul style={{ fontSize: '14px' }}>
          <li>
            <p><b>Small Variant</b></p>
            <Table columns={columnsSmall} dataSource={this.props.location.state.text.Small_Variant} />
          </li>

        </ul> */}
      </div >
    )
  }
}
export default withRouter(IEDetails);