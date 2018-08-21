import { ConnectedComponent, IInjectedTeamsProps, Surface } from 'msteams-ui-components-react';
import * as React from 'react';
import connect from '../../state/connect';
import { User } from '../../state/state';
import Main from '../main';

export interface IMainProps {
    user: User
}

export class Devices extends React.Component<IMainProps, {}> {

    constructor(props: any) {
        super(props);
    }

    public render() {
        return <ConnectedComponent render={this.renderMain} />
    }

    private renderMain = (props: IInjectedTeamsProps) => {
        return (
            <Surface>
                <Main />
            </Surface>
        );
    }
}

export default connect(({ user }) => {
    return { user };
}, void 0)(Devices);