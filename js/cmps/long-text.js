export default {
    props: ['text'],
    template: `
        <div class="book-details-desc">
            {{bookDesc}}
        </div>
        <button @click="toggleLongText" class="book-desc-btn">{{expandBtnText}}</button>
    `,
    data() {
        return {
            isLongText: false
        }
    },
    methods: {
        toggleLongText(){
            this.isLongText = !this.isLongText
        }
    },
    computed: {
        expandBtnText(){
            if(this.isLongText) return 'Show Less'
            else return 'Show More'
        },
        bookDesc(){
            if(this.isLongText) return this.text; 
            else return this.text.substring(0, 100) + '...'
        }
    }
}