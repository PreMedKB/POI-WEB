import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { reaction } from 'mobx';
import { observer, inject } from 'mobx-react';
import { ROUTER_PATHS } from 'common/constant';
import Login from './login';
import Layout from './layout';
import Cookie from 'js-cookie'
// //取cookies     
// function getCookie(name) {
//     let arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
//     if (arr != null) return unescape(arr[2]);
//     return null;
// }
// //删除cookie
// function delCookie(name) {
//     var exp = new Date();
//     exp.setTime(exp.getTime() - 1);
//     var cval = getCookie(name);
//     if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
// }
const PrivateRoute = ({ component: Component, authed, ...rest }) => {
    const render = function (props) {
        return (
            authed === true ?
                <Component {...props} /> :
                <Redirect to={{ pathname: ROUTER_PATHS.LOGIN, state: { from: props.location } }} />
        );
    };
    return (
        <Route {...rest} render={render} />
    );
}

//@inject('glbl')
@observer
class Index extends React.Component {

    componentDidMount() {

        // const {glbl: {user}, history} = this.props;
        // console.log(user.id)
        // reaction(
        //     () => user.id,
        //     (id) => {
        //         if(!id) {
        //             history.push(ROUTER_PATHS.LOGIN);
        //         }
        //     }
        // );
        const cookie = Cookie.get("_bl_uid")
        console.log(document.cookie)
        // delCookie("_bl_uid")
        // console.log("删除后", document.cookie)
    }

    render() {
        // const {glbl: {user}} = this.props;
        const authed = true;
        // const authed = !user.id;
        return (
            <div style={{ width: '100%', height: '100%' }}>
                <Switch>
                    {/* <Route path={ROUTER_PATHS.LOGIN} component={Login}/> */}
                    <PrivateRoute authed={authed} path="/" component={Layout} />
                </Switch>
            </div>
        );
    }
}

export default Index;
