import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get, post } from "@/config/axios.config"






export const getUserList = createAsyncThunk(
    "chat/getUserList",
    async () => {
        try {

            const listUsers = await get('/chat/list-user', {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });

            return listUsers.data.data;


        } catch (exception) {
            throw exception
        }

    }
)
export const getChatDetail = createAsyncThunk(
    "chat/getChatDetail",
    async (data: any) => {

        try {
            const response = await get('/chat/detail/' + data, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")

                }
            })
            return response.data.data

        } catch (exception) {
            throw exception
        }
    }


)

export const sendChatDetail = createAsyncThunk(
    'chat/sendChatDetail',
    async (data: { receiver: string; message: string }) => {
        try {

            const response = await post('/chat/send', data, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })
            return response.data.data

        } catch (exception) {

            throw exception
        }

    }
)

const ChatSlice = createSlice({
    name: 'chat',
    initialState: {
        loggedInUser: null,
        chatUserList: null,
        currentUserMessage: [] as any

    },
    reducers: {
        setLoggedInUser: (state, payload) => {
            //payloadAction: type:(name.functionName), payload
            //type: chat/setHello

            state.loggedInUser = payload.payload;

        },
        // setChat:(state,payload)=>{
        //     //

        // }
    },
    extraReducers: (builder) => {
        builder.addCase(getUserList.fulfilled, (state, payloadAction) => {
            state.chatUserList = payloadAction.payload;
        })
        builder.addCase(getUserList.rejected, (state) => {

            state.chatUserList = null;
        })
        builder.addCase(getChatDetail.fulfilled, (state, payloadAction) => {
            state.currentUserMessage = payloadAction.payload;
        })
        builder.addCase(getChatDetail.rejected, (state) => {

            state.currentUserMessage = null;
        })

        builder.addCase(sendChatDetail.fulfilled, (state, payloadAction) => {
            state.currentUserMessage = [
                ...state.currentUserMessage,
                payloadAction.payload
            ]
        })
        builder.addCase(sendChatDetail.rejected, (state) => {

            state.currentUserMessage = null;
        })

    }


})
export const { setLoggedInUser } = ChatSlice.actions
export default ChatSlice.reducer