import { PrimaryButton, } from 'msteams-ui-components-react';
import * as React from 'react';
import connect from '../state/connect';
import { User } from '../state/state';
import { auth } from '../teams/teams';
import Main from './main';

export class Configure extends React.Component<{ user: User }> {
    public render() {
        const { user } = this.props;
        return (
            !user ? <PrimaryButton onClick={this.onLoginClick}> Login </PrimaryButton> :
                <Main />
        );
    }

    private onLoginClick() {
        auth();
    }
}

export default connect(({ user }) => {
    return { user };
})(Configure);