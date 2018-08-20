import { ConnectedComponent, IInjectedTeamsProps, Surface } from 'msteams-ui-components-react';
import { IPersonaSharedProps, Persona, PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import * as React from 'react';
import { listenForCallback } from '../callback';
import { Api, getApi } from '../spotify/api';
import { User } from '../state/state';

export interface IMainState {
    user: User
}

export class Main extends React.Component<any, IMainState> {
    private api: Api

    constructor(props: any) {
        super(props);
        this.state = {} as any as IMainState
    }

    public render() {
        return <ConnectedComponent render={this.renderMain} />
    }

    public componentDidMount() {
        listenForCallback().then(async (token) => {
            this.api = getApi(token.token, token.refreshToken);
            const user = await this.api.me.get();
            this.setState({ user });
        });
    }

    private renderMain = (props: IInjectedTeamsProps) => {                                
        const { user } = this.state;
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
            <Surface>
                <Persona {...persona} />
            </Surface>
        );
    }
}
