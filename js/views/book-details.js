import { bookService } from "../services/book-service.js";
import longText from "../cmps/long-text.js";
import bookReview from "../cmps/book-review.js";
import  bookReviewsShow from "../cmps/book-reviews-show.js";
import { eventBus } from "../services/bus-service.js";
export default {
    template: `
        <section v-if="book" class="book-details">
            <h1 class="book-details-age">{{bookAge}}</h1>
            <h2 v-if="bookLength" class="book-details-length">{{bookLength}}</h2>
            <h1 class="book-details-title">{{book.title}}</h1>
            <h2 class="book-details-subtitle">{{book.subtitle}}</h2>
            <ul class="book-details-categories">
                <li v-for="category in book.categories">
                        {{category}}
                </li>
            </ul>
                <ul class="book-details-authors">
                    <li v-for="author in book.authors">
                        {{author}}
                    </li>
                </ul>
            <p class="book-details-price" :class="bookPriceColor">{{book.listPrice.amount}}{{currencyType}}</p>
            <long-text :text="book.description"/>
            <div class="book-details-sale" v-if="book.listPrice.isOnSale">
                Sale!!
            </div>
            <div>
                <img class="book-details-img" :src="book.thumbnail">
            </div>
            <book-reviews-show @delete-review="deleteReview" :reviews="book.reviews"/>
            <book-review @book-update="updateBook" :bookId="book.id"/>

        </section>
    `,
    data(){
        return {
            book: null
        }
    },
    created(){
        const books = bookService.getBookById(this.$route.params.bookId);
        books.then(book => this.book = book )
    },
    components: {
        longText,
        bookReview,
        bookReviewsShow
    },
    methods: {
        updateBook(book){
            this.book = book;
            eventBus.emit('show-msg', {txt: `Book ${this.book.title} review was added!`, bookId: this.book.id, success: true})

        },
        deleteReview(reviewIdx){
            bookService.deleteReview(this.book.id, reviewIdx)
            .then(newBook => this.updateBook(newBook))
            .then(() => eventBus.emit('show-msg', {txt: 'Review successfully deleted', success: true}))
        }
    },
    computed: {
        currencyType() {
            switch (this.book.listPrice.currencyCode) {
                case 'ILS':
                    return '₪';
                case 'USD':
                    return '$'
                default:
                    return '€'
            }
        },
        bookAge() {
            const currYear = new Date(Date.now()).getFullYear();
            if (currYear - this.book.publishedDate > 10) return 'Veteran Book';
            else return 'New!'
        },
        bookLength() {
            const pageCount = this.book.pageCount
            if (pageCount > 500) return 'Long Read';
            if (pageCount > 200) return 'Decent Read';
            if (pageCount < 100) return 'Light Read'
        },
        bookPriceColor() {
            const price = this.book.listPrice.amount;
            if (price > 150) return 'red';
            if (price < 20) return 'green';
        },
      
    }
}