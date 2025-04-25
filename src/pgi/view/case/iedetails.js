import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
// import GeneView from 'pgi/component/case/details';

import 'pgi/style/p-case-geneview.less';
import IEDetails from '../../component/case/iedetails';

@observer
class IECaseDetails extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <IEDetails />
            </div>
        );
    }
}

export default IECaseDetails;