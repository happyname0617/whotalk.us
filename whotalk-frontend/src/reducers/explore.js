import EXPLORE from 'actions/ActionTypes/explore';
import * as rs from 'helpers/requestStatus';

const initialState = {
    activityData: [],
    requests: {
        getInitialActivity: {
            ...rs.requests
        }
    }
}



function explore(state = initialState, action) {
    const payload = action.payload;

    switch(action.type) {
        case EXPLORE.INITIALIZE:
            return {
                ...initialState
            }


        case EXPLORE.GET_INITIAL_ACTIVITY + '_PENDING':
            return {
                ...state,
                requests: {
                    ...state.requests,
                    getInitialActivity: {
                        ...rs.pending
                    }
                }
            }
        
        case EXPLORE.GET_INITIAL_ACTIVITY + '_FULFILLED':
            return {
                ...state,
                activityData: [...payload.data.activities],
                requests: {
                    ...state.requests,
                    getInitialActivity: {
                        ...rs.fulfilled
                    }
                }
            }

        case EXPLORE.GET_INITIAL_ACTIVITY + '_REJECTED':
            return {
                ...state,
                requests: {
                    ...state.requests,
                    getInitialActivity: {
                        ...rs.rejected,
                        error: payload
                    }
                }
            }

        default:
            return state;
    }
}



export default explore;