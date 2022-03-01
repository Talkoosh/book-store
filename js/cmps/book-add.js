import { bookService } from '../services/book-service.js'

export default {
    template: `
    <section class="add-book-container">
        <input type="text" list="book-search-list" v-model="searchTitle" @change="searchBook">
        <ul>
            <li v-for="result in searchResults">{{result.volumeInfo.title}} <button @click="saveBook(result)">+</button></li>
        </ul>
    </section>
    `,
    data() {
        return {
            searchTitle: null,
            searchResults: null
        }
    },
    methods: {
        searchBook() {
            if (!this.searchTitle) {
                this.searchResults = null;
                return;
            }
            bookService.getBookSearches(this.searchTitle)
                .then(searchResults => {
                    this.searchResults = searchResults.items
                })
        },
        saveBook(result) {
            const newBookPrm = bookService.addBook(result);
            newBookPrm.then(book => {
                this.searchTitle = null;
                this.searchResults = null; 
                this.$emit('book-added', book)
            })
        }
    }
}