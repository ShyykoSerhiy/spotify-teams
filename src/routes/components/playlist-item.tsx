import { Td, Tr } from 'msteams-ui-components-react';
import * as React from 'react';
import { Playlist } from '../../state/state';
import { SelectableItem } from './selectable-item';

export class PlaylistItem extends SelectableItem<Playlist>{
    public renderItem(selectedStyle: { backgroundColor?: string }) {
        const { p } = this.props;
        const { context } = this.props;
        const { rem } = context;
        
        return (
            <Tr key={p.id} onClick={this.onClick} style={{ whiteSpace: 'nowrap' }}>
                <Td style={{ maxWidth: rem(25), padding:rem(1), textAlign:'left', textOverflow: 'ellipsis', overflow: 'hidden', ...selectedStyle }}>{p.name}</Td>
            </Tr>
        )
    }
};