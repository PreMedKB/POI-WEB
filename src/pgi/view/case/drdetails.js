import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
// import GeneView from 'pgi/component/case/details';

import 'pgi/style/p-case-geneview.less';
import DRDetails from '../../component/case/drdetails';

@observer
class DRCaseDetails extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <DRDetails />
            </div>
        );
    }
}

export default DRCaseDetails;