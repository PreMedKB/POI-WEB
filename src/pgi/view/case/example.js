import React, { createRef, LegacyRef } from 'react';
import { Modal, Table, Button } from 'antd';
import JsPDF from 'jspdf';
import html2Canvas from 'html2canvas';
//moment依赖
import moment from 'moment';

export default class DeliverGoodsModal extends React.Component<any, any> {
    constructor(props, ctx) {
        super(props);
        this.state = {
            loading: false,
            loadingDown: false,
            deliverVisible: false
        };
    }
    _columns = [
        {
            title: 'SKU编码',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <span>{text}</span>
        },
        {
            title: '商品名称',
            dataIndex: 'sss',
            key: 'sss',
            width: 280,
            render: (text) => <span>{text}</span>
        },
        {
            title: '规格',
            dataIndex: 'address',
            key: 'address'
        },
        {
            title: '采购数量',
            dataIndex: 'ages',
            key: 'ages'
        },
        {
            title: '已发数量',
            dataIndex: 'age',
            key: 'age'
        },
        {
            title: '本地发货数',
            dataIndex: 'agesss',
            key: 'agesss'
        },
        {
            title: '单价',
            dataIndex: 'agess',
            key: 'agess'
        },
        {
            title: '金额小计',
            dataIndex: 'agessx',
            key: 'agesssx'
        }
    ];

    render() {
        const pdfs = createRef();

        const handlePrint = (isPrint: boolean) => {
            let targetDom: any = pdfs.current;
            // 获取节点高度，后面为克隆节点设置高度。
            let height = targetDom.height;
            // 克隆节点，默认为false，不复制方法属性，为true是全部复制。
            let cloneDom = targetDom.cloneNode(true);
            // 设置克隆节点的css属性，因为之前的层级为0，我们只需要比被克隆的节点层级低即可。
            //cloneDom.style.backgroundColor = 'red';
            cloneDom.style.position = 'absolute';
            cloneDom.style.top = '0';
            cloneDom.style.index = '-1';
            cloneDom.style.height = height;
            // 将克隆节点动态追加到body后面。
            document.getElementById('pdf-con')?.appendChild(cloneDom);
            // 插件生成base64img图片。
            html2Canvas(cloneDom, {
                useCORS: true,
                // 画布开始渲染的y坐标位置
                y: 0
            }).then((canvas) => {
                // console.log('canvas', canvas);
                let contentWidth = canvas.width;
                let contentHeight = canvas.height;
                // 一页pdf显示html页面生成的canvas高度;
                let pageHeight = (contentWidth / 592.28) * 841.89;
                // 未生成pdf的html页面高度
                let leftHeight = contentHeight;
                // 页面偏移
                let position = 0;
                // a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
                let imgWidth = 595.28;
                let imgHeight = (595.28 / contentWidth) * contentHeight;
                let pageData = canvas.toDataURL('image/jpeg', 1.0);
                let pdf = new JsPDF(null, 'pt', 'a4');
                // 有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
                // 当内容未超过pdf一页显示的范围，无需分页
                if (leftHeight < pageHeight) {
                    pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
                } else {
                    while (leftHeight > 0) {
                        pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight);
                        leftHeight -= pageHeight;
                        // 避免添加空白页
                        position -= 841.89;
                        if (leftHeight > 0) {
                            pdf.addPage();
                        }
                    }
                }
                let nowDate = moment(new Date()).format('YYYY-MM-DD');
                if (isPrint) {
                    //打印
                    pdf.autoPrint();
                    pdf.output('dataurlnewwindow');
                    this.setState({ loading: false });
                } else {
                    //下载
                    pdf.save('发货单-' + nowDate + '.pdf');
                    this.setState({ loadingDown: false });
                }
            });
        };
        const dataSource = [
            {
                key: '1',
                name: '胡彦斌',
                age: 1,
                ages: 2,
                agess: 3,
                agesss: 4,
                agesssx: 5,
                address: '个',
                sss: '是商品'
            },
            {
                key: '2',
                name: '胡彦祖',
                age: 7,
                ages: 8,
                agess: 9,
                agesss: 10,
                agesssx: 12,
                address: '组',
                sss: '不是商品'
            },
            {
                key: '2',
                name: '胡彦祖',
                age: 7,
                ages: 8,
                agess: 9,
                agesss: 10,
                agesssx: 12,
                address: '组',
                sss: '什么商品'
            }
        ];

        return (
            <Modal
                maskClosable={false}
                closable={false}
                title={null}
                width={1000}
                visible={this.state.deliverVisible}
                footer={null}
            >
                <div className="deliverGoods" ref={pdfs as LegacyRef<HTMLDivElement>}>
                    <div className="deliverGoods_No">NO:1234567890</div>
                    <div className="deliverGoods_title">
                        <h3>发货单</h3>
                    </div>
                    <div className="deliverGoods_count">
                        <div>
                            <span>关联订单号：</span>
                            <span>123456789</span>
                        </div>
                        <div>
                            <span>下单时间：</span>
                            <span>2022-03-31 09:44:47</span>
                        </div>
                    </div>
                    <div className="deliverGoods_count">
                        <div>
                            <span>收货信息：</span>
                            <span>奥利给，浙江杭州市上城区高德置地广场</span>
                        </div>
                        <div>
                            <span>发货时间：</span>
                            <span>2022-03-31 09:44:47</span>
                        </div>
                    </div>
                    <div className="deliverGoods_count">
                        <div>
                            <span>下单客户：</span>
                            <span>测试客户</span>
                        </div>
                        <div>
                            <span>送货供应商：</span>
                            <span>XXX有限公司</span>
                        </div>
                    </div>
                    <div className="deliverGoods_table">
                        <Table
                            rowKey={(_record, index) => index.toString()}
                            columns={this._columns}
                            dataSource={dataSource}
                            pagination={false}
                            bordered
                        />
                    </div>
                    <div className="deliverGoods_No">商品金额：￥945.00</div>
                    <div className="deliverGoods_foot">
                        <div>
                            <span>买家备注：</span>
                            <span>无</span>
                        </div>
                        <div>
                            <span>追加备注：</span>
                            <span>要红色的</span>
                        </div>
                        <div>
                            <span>客户签字：</span>
                            <span>奥利给</span>
                        </div>
                        <div>
                            <span>签收时间：</span>
                            <span>2022-03-31 09:44:47</span>
                        </div>
                    </div>
                </div>
                <div
                    id="pdf-con"
                    style={{
                        backgroundColor: '#cccccc',
                        opacity: 0
                    }}
                ></div>
                <div className="foot">
                    {/* 取消按钮关闭moadl */}
                    <Button>取消</Button>
                    <Button
                        type="primary"
                        loading={this.state.loadingDown}
                        onClick={() => {
                            this.setState({ loadingDown: true });
                            handlePrint(false);
                        }}
                    >
                        下载
          </Button>
                    <Button
                        type="primary"
                        loading={this.state.loading}
                        onClick={() => {
                            this.setState({ loading: true });
                            handlePrint(true);
                        }}
                    >
                        打印
          </Button>
                </div>
            </Modal>
        );
    }
}

