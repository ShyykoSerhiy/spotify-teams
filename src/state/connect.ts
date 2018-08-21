import { connect as reduxConnect, Options } from 'react-redux';
import { Action, bindActionCreators } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { ActionCreators } from './actions';
import { IStoreState } from './state';

export type Dispatch<E, A extends Action> = ThunkDispatch<IStoreState, E, A>;

type ActionCreatorsMap = Map<{}, () => any>
const boundCreators: WeakMap<Dispatch<any, any>, ActionCreatorsMap> = new WeakMap()

export default function connect<IProps>(
    stateToProps?: (state: IStoreState, props: any) => Partial<IProps>,
    actionCreators?: Partial<ActionCreators>,
    options?: Options) {
    return (target: any) => reduxConnect(stateToProps!, (dispatch: Dispatch<any, any>) => {
        const res = {} as any
        if (actionCreators) {
            for (const key in actionCreators) {
                if (actionCreators.hasOwnProperty(key)) {
                    let dispatchMap = boundCreators.get(dispatch)
                    if (!dispatchMap) {
                        dispatchMap = new Map()
                        boundCreators.set(dispatch, dispatchMap)
                    }
                    const saved = dispatchMap.get(actionCreators[key]) as any
                    if (saved) {
                        res[key] = saved
                    } else {
                        res[key] = bindActionCreators(actionCreators[key], dispatch)
                        dispatchMap.set(actionCreators[key], res[key])
                    }
                }
            }
        }
        return res
    },
        null as any,
        options!
    )(target)
}
