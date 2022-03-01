import { bookService } from '../services/book-service.js'

export default {
    template: `
    <input type="text" list="book-search-list" v-model="searchTitle" @change="searchBook">
    <!-- <datalist id="book-search-list">
        <option v-for="result in searchResults" :value="result.volumeInfo.title">
    </datalist> -->
    <ul>
        <li v-for="result in searchResults">{{result.volumeInfo.title}} <button @click="saveBook(result)">+</button></li>
    </ul>
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