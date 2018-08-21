import { ConnectedComponent, Dropdown, IInjectedTeamsProps } from 'msteams-ui-components-react';
import * as React from 'react';
import { style } from 'typestyle';
import { selectDevice } from '../../state/actions';
import connect from '../../state/connect';
import { Device } from '../../state/state';
import Main from '../main';

export interface IDevicesProps {
    devices: Device[],
    selectedDevice: Device,

    selectDevice: typeof selectDevice
}

export function appLayout() {
    return {
        container: style({
            display: 'flex',
            alignItems: 'center'
        })
    };
}

const classes = appLayout();

export class Devices extends React.Component<IDevicesProps, {}> {
    constructor(props: any) {
        super(props);
    }

    public render() {
        return <ConnectedComponent render={this.renderMain} />
    }

    private onDeviceClick = (device: Device) => {        
        this.props.selectDevice(device);
    }

    private renderMain = (props: IInjectedTeamsProps) => {
        const items = (this.props.devices || []).map((d) => {
            return {
                text: d.name,
                id: d.id,
                onClick: () => {
                    this.onDeviceClick(d);
                }
            }
        });
        const selectedDeviceName = this.props.selectedDevice ? this.props.selectedDevice.name : 'No devices';
        return (
            <div className={classes.container}>
                <Main />
                <Dropdown disabled={!items.length}
                    mainButtonText={selectedDeviceName}
                    items={items}
                />
            </div>
        );
    }
}

export default connect(({ devices, selectedDevice }) => {
    return { devices, selectedDevice };
}, { selectDevice })(Devices);