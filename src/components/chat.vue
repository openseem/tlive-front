<template>
    <div>
        <beautiful-chat :participants="participants" :onMessageWasSent="onMessageWasSent" :messageList="messageList"
            :newMessagesCount="newMessagesCount" :isOpen="isChatOpen" :close="closeChat" :open="openChat"
            :showEmoji="false" :showFile="false" :showEdition="false" :showDeletion="true" :deletionConfirmation="true"
            :showTypingIndicator="showTypingIndicator" :showLauncher="true" :showCloseButton="false" :colors="colors"
            :alwaysScrollToBottom="alwaysScrollToBottom" :disableUserListToggle="false" :messageStyling="messageStyling"
            @onType="handleOnType" />
    </div>
</template>

<script>
import { useStore } from 'vuex'


export default {
    name: 'chat',
    components: {

    },
    data() {
        return {
            participants: [

            ], // the list of all the participant of the conversation. `name` is the user name, `id` is used to establish the author of a message, `imageUrl` is supposed to be the user avatar.
            messageList: [], // the list of the messages to show, can be paginated and adjusted dynamically
            newMessagesCount: 0,
            isChatOpen: true, // to determine whether the chat window should be open or closed
            showTypingIndicator: '', // when set to a value matching the participant.id it shows the typing indicator for the specific user
            colors: {
                header: {
                    bg: '#4e8cff',
                    text: '#ffffff'
                },
                launcher: {
                    bg: '#4e8cff'
                },
                messageList: {
                    bg: '#ffffff'
                },
                sentMessage: {
                    bg: '#4e8cff',
                    text: '#ffffff'
                },
                receivedMessage: {
                    bg: '#eaeaea',
                    text: '#222222'
                },
                userInput: {
                    bg: '#f4f7f9',
                    text: '#565867'
                }
            }, // specifies the color scheme for the component
            alwaysScrollToBottom: false, // when set to true always scrolls the chat to the bottom when new events are in (new message, user starts typing...)
            messageStyling: true // enables *bold* /emph/ _underline_ and such (more info at github.com/mattezza/msgdown)
        }
    },
    mounted() {
        this.timer = setInterval(this.getMessageList, 1000);
    },
    setup: function () {
        const store = new useStore();
        return {
            store
        }
    },
    computed: {
        userId() {
            return this.store.state.user.userId
        }
    },
    props: {
        courseId: Number
    },
    methods: {
        onMessageWasSent(text) {
            console.log({
                course: this.courseId,
                user: this.userId,
                message: text.data.text
            })
            this.axios.post("http://localhost:8765/v1/message/send", {
                course: this.courseId,
                user: this.userId,
                message: text.data.text
            }, {
                headers: {
                    "Content-Type": "application/json",
                }
            }).then(Response => {
                console.log("ok")
            })
        },
        openChat() {
            // called when the user clicks on the fab button to open the chat
            this.isChatOpen = true
            this.newMessagesCount = 0
            this.getMessageList()
        },
        closeChat() {
            // called when the user clicks on the botton to close the chat
            this.isChatOpen = false
        },
        handleScrollToTop() {
            // called when the user scrolls message list to top
            // leverage pagination for loading another page of messages
        },
        handleOnType() {
            console.log('Emit typing event')
        },
        getMessageList() {
            this.axios.get("http://localhost:8765/v1/message/getList?course=" + this.courseId)
                .then(
                    Response => {
                        let messages = Response.data;
                        let messageLists = [];
                        let pp = [];
                        messages.map((message) => {
                            let tmp = {
                                author: message.user == this.userId ? "me" : message.user,
                                type: 'text',
                                data: { text: message.message }
                            }
                            messageLists = [...messageLists, tmp]
                            if (!pp.includes({
                                id: message.user,
                                name: message.userName,
                            })) {
                                pp = [...pp, {
                                    id: message.user,
                                    name: message.userName,
                                }]
                            }
                        })
                        this.messageList = messageLists
                        this.participants = pp
                    }
                )
        }
    }
}
</script>

<style scoped>
.messageLeft {
    right: 80%;
}

.messageRight {
    right: 20%;
}
</style>
