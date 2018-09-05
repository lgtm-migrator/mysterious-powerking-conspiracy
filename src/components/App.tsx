import * as auth from "actions/auth";
import { Login } from "components/Login";
import { Store } from "components/Store";
import { isLoggedIn } from "helpers/auth";
import { IUser } from "models/user";
import * as React from "react";
import { connect } from "react-redux";
import { IRootState } from "reducers/root-reducer";
import { Dispatch } from "redux";
import { ActionType } from "typesafe-actions";

interface IStateFromProps {
    user: IUser;
}

interface IDispatchFromProps {
    logout: () => void;
}

interface IProps extends IStateFromProps, IDispatchFromProps {}

const mapStateToProps = (state: IRootState): IStateFromProps => ({ user: state.auth });

const mapDispatchToProps = (
  dispatch: Dispatch<ActionType<typeof auth>>,
): IDispatchFromProps => ({
  logout: () => dispatch(auth.logout()),
});

class AppComponent extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);

        this.logout = this.logout.bind(this);
    }

    public render() {
        if (isLoggedIn()) {
            return (
                <Store />
            );
        } else {
            return (
                <Login />
            );
        }
    }

    private logout() {
        this.props.logout();
    }
}

export const App = connect<IStateFromProps, IDispatchFromProps, {}, IRootState>(
    mapStateToProps,
    mapDispatchToProps,
)(AppComponent);
