import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import 'pgi/style/p-case-geneview.less';
import { Tabs, Tag, Descriptions, Badge, Icon, Table } from 'antd';
import { text } from 'd3';


const { TabPane } = Tabs;

let res;
class DRDetails extends React.Component {
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


    const columnsMulti = [
      {
        title: 'Gene',
        dataIndex: 'Gene',
        key: 'Gene',
      },
      {
        title: 'Diplotype',
        dataIndex: 'Diplotype',
        key: 'Diplotype',
      },
      {
        title: 'Position',
        dataIndex: 'Position',
        key: 'Position',
      },
      {
        title: 'Variant',
        dataIndex: 'Variant',
        key: 'Variant',
      },
      {
        title: 'Effect on Protein',
        dataIndex: 'Effect on Protein',
        key: 'Effect on Protein',
      },
      {
        title: 'Definition of Alleles',
        dataIndex: 'Definition of Alleles',
        key: 'Definition of Alleles',
      },
      {
        title: 'Variant Call',
        dataIndex: 'Variant Call',
        key: 'Variant Call',
      }
    ]
    const columnsSingle = [
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
        title: 'Variant Call',
        dataIndex: 'Variant Call',
        key: 'Variant Call',
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
          <Descriptions.Item label="Diplotype">{res.Diplotype}</Descriptions.Item>

          <Descriptions.Item label="Source">{res.Source}</Descriptions.Item>
          <Descriptions.Item label="Drug">{res.Drugs}</Descriptions.Item>
          <Descriptions.Item label="Category">
            {res.Category}
          </Descriptions.Item>

          <Descriptions.Item label="Response">
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
        {/* <p style={{ marginBottom: '20px', marginTop: '12px', fontSize: '18px' }}><b>Biomarker Details</b></p>
        <ul style={{ fontSize: '14px' }}>
          <li>
            <p><b>Multi-Variant Allele</b></p>
            <Table columns={columnsMulti} dataSource={this.props.location.state.text.Multi_Variant} />
          </li>
          <li>
            <p><b>Single-Variant Allele</b></p>
            <Table columns={columnsSingle} dataSource={this.props.location.state.text.Single_Variant} />
          </li>

        </ul> */}
      </div >
    )
  }
}
export default withRouter(DRDetails);