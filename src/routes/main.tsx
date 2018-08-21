import { ConnectedComponent, IInjectedTeamsProps } from 'msteams-ui-components-react';
import { IPersonaSharedProps, Persona, PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import * as React from 'react';
import connect from '../state/connect';
import { User } from '../state/state';

export interface IMainProps {
    user: User
}

export class Main extends React.Component<IMainProps, {}> {

    constructor(props: any) {
        super(props);
    }

    public render() {
        return <ConnectedComponent render={this.renderMain} />
    }

    private renderMain = (props: IInjectedTeamsProps) => {
        const { user } = this.props;
        if (!user) {
            return <div>
                Spotify
                </div>
        }

        const persona: IPersonaSharedProps = {
            imageInitials: user.display_name.substr(0, 2).toUpperCase(),
            imageUrl: user.images[0] ? user.images[0].url : void 0,
            secondaryText: user.id,
            size: PersonaSize.extraLarge,
            text: user.display_name
        };

        return (
            <Persona {...persona} />
        );
    }
}

export default connect(({ user }) => {
    return { user };
}, void 0)(Main);