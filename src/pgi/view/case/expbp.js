import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
// import GeneView from 'pgi/component/case/details';

import 'pgi/style/p-case-geneview.less';
import Expbp from '../../component/case/expbp';

@observer
class CaseExpbp extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Expbp />
            </div>
        );
    }
}

export default CaseExpbp;