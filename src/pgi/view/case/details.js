import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
// import GeneView from 'pgi/component/case/details';

import 'pgi/style/p-case-geneview.less';
import Details from '../../component/case/details';

@observer
class CaseDetails extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Details />
            </div>
        );
    }
}

export default CaseDetails;