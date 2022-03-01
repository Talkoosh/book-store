import bookPreview from '../cmps/book-preview.js'

export default {
    props: ['books'],
    template: `
        <section class="book-list">
            <div class="book-card" v-for="book in books" :key="book.id" @click="bookSelected(book.id)">
                <book-preview :book="book" />
            </div>
        </section>
    `,
    components:{
        bookPreview
    },
    methods: {
        bookSelected(id){
            this.$router.push(`/book/${id}`)
        }
    }
}