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
        toggleLongText() {
            this.isLongText = !this.isLongText
        }
    },
    computed: {
        expandBtnText() {
            if (this.isLongText) return 'Show Less'
            else return 'Show More'
        },
        bookDesc() {
            if (!this.text) {
                const dummyText = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci non consectetur rem eos aperiam facilis et perspiciatis porro, eligendi, voluptas quia architecto consequatur officia quas ut. Nulla tempore rem quo.';
                if (this.isLongText) return dummyText;
                else return dummyText.substring(0, 100) + '...'

            }
            else if (this.isLongText) return this.text;
            else return this.text.substring(0, 100) + '...'
        }
    }
}