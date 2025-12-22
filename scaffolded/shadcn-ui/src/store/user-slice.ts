import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { RootState } from './index';

type TUser = {
    initials: string;
    firstname: string;
    lastname: string;
    idx: string;
    created_at: string;
    updated_at: string;
}


type UserState = {
    user: TUser | null;
    isInitialized: boolean;
}

const initialState: UserState = {
    user: {
        firstname: '',
        lastname: '',
        initials: '',
        idx: '',
        created_at: '',
        updated_at: '',
    },
    isInitialized: false
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<TUser>) => {
            state.user = {
                ...action.payload,
                initials: `${action.payload.firstname[0].toUpperCase()}${action.payload.lastname[0].toUpperCase()}`,
            };
        },
    },
});

export const useUser = (): TUser => {
    const user = useSelector((state: RootState) => state.user.user);

    if (!user) {
        throw new Error("User is null.");
    }

    return user;
}

export const { setUser } = userSlice.actions;
export default userSlice.reducer;