import { Td, Tr } from 'msteams-ui-components-react';
import * as React from 'react';
import { Track } from '../../state/state';
import { SelectableItem } from './selectable-item';

export class TrackItem extends SelectableItem<Track>{
    public renderItem(selectedStyle: { backgroundColor?: string }) {
        const { p, context, index } = this.props;
        const { rem } = context;
        const { track } = p;
        const artistName = track.artists[0] ? track.artists[0].name : ''
        const style = { maxWidth: rem(25), padding: rem(1), textAlign: 'left', textOverflow: 'ellipsis', overflow: 'hidden', ...selectedStyle } as any;

        return (
            <Tr key={index + track.id} onClick={this.onClick} style={{ whiteSpace: 'nowrap' }}>
                <Td style={style}>{track.name}</Td>
                <Td style={style}>{artistName}</Td>
                <Td style={style}>{track.album.name}</Td>
            </Tr>
        )
    }
};