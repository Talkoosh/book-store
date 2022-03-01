import { eventBus } from "../services/bus-service.js"

export default {
    template: `
        <div v-if="message" class="user-msg" :class="msgType">
            <p>{{msgTxt}}</p>
            <router-link v-if="message.bookId" :to="bookId">Book Details</router-link>
        </div>
    `,
    data(){
        return{
            message: null
        }
    },
    created(){
        this.unsubscribe = eventBus.on('show-msg', this.setMessage)
    },
    methods: {
        setMessage(message){
            this.message = message; 
            setTimeout(() => this.message = null, 3000)
        }
    },
    computed:{
        msgType(){
            if(!this.message) return
            if(this.message.success) return 'green-border'
            else return 'red-border'
        },
        msgTxt(){
            if(this.message) return this.message.txt
        },
        bookId(){
            if(this.message.bookId) return this.message.bookId
        }
    },
    unmounted(){
        this.unsubscribe();
    }
}