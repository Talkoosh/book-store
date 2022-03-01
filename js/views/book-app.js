import { bookService } from "../services/book-service.js"
import bookList from '../cmps/book-list.js'
import bookFilter from "../cmps/book-filter.js"

export default {
    template: `
        <section class="book-app">
              <book-filter @filtered="setFilter"></book-filter>
              <book-list :books="booksToShow"></book-list>
        </section>
    `,
    components: {
        bookList,
        bookFilter
    },
    data() {
        return {
            books: null,
            filterBy: null,
        }
    },
    created(){
        bookService.query()
            .then(books => this.books = books)
    },
    methods: {
        setFilter(filter){
            this.filterBy = filter;
        }
    },
    computed: {
        booksToShow() {
            if (!this.filterBy) return this.books;
            const regex = new RegExp(this.filterBy.byName, 'i');
            return this.books.filter(book => (regex.test(book.title) 
            && book.listPrice.amount >= this.filterBy.fromPrice 
            && book.listPrice.amount <= this.filterBy.toPrice));
        }
    }
}