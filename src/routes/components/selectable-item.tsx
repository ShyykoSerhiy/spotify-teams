import { IContext, ThemeStyle } from 'msteams-ui-components-react';
import * as React from 'react';

export interface ISelectableItemProps<T> {
    p: T
    onClick: (p: T) => void
    selected: boolean,
    context: IContext
}

export abstract class SelectableItem<T> extends React.Component<ISelectableItemProps<T>>{
    public render() {
        const { selected, context } = this.props;
        const { style, colors } = context;
        const selectedStyle = {} as { backgroundColor?: string };
        if (selected) {
            switch (style) {
                case ThemeStyle.Dark:
                    selectedStyle.backgroundColor = colors.dark.gray08;
                    break;
                case ThemeStyle.HighContrast:
                    selectedStyle.backgroundColor = colors.highContrast.black;
                    break;
                case ThemeStyle.Light:
                default:
                    selectedStyle.backgroundColor = colors.light.gray08;
            }
        }

        return (
            this.renderItem(selectedStyle)
        );
    }

    public abstract renderItem(selectedStyle: { backgroundColor?: string }): JSX.Element;

    protected onClick = () => {
        this.props.onClick(this.props.p);
    }
};