import { PrimaryButton,  } from 'msteams-ui-components-react';
import * as React from 'react';
import { auth } from '../teams/teams';

export class Configure extends React.Component {
    public render() {
        return (
            <PrimaryButton onClick={this.onLoginClick}> Login </PrimaryButton>
        );
    }

    private onLoginClick() {
        auth();
    }
}