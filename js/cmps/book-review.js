import { bookService } from "../services/book-service.js"
import { eventBus } from "../services/bus-service.js"

export default {
    props: ['bookId'],
    template: `
        <section class="review-form-container">
            <h1>Write a review!</h1>
            <form>
                <div>
                    <label for="user-name">Full Name: </label>
                    <input type="text" name="user-name" id="user-name" ref="userName" v-model="fullName">
                </div>
                <div>
                    <label for="book-score">Score: </label>
                    <select name="book-score" id="book-score" v-model="score">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                    <label for="review-text">Review: </label>
                    <textarea id="review-text" v-model="reviewText"></textarea>

                <input type="submit" value="Submit" @click.prevent="addReview">
            </form>
        </section>
    `,
    data() {
        return {
            fullName: null,
            score: null,
            reviewText: null
        }
    },
    mounted() {
        this.$refs.userName.focus()
    },
    methods: {
        addReview() {
            bookService.addReview(this.bookId, {
                fullName: this.fullName,
                score: this.score,
                reviewText: this.reviewText
            })
                .then(book => { 
                    this.$emit('book-update', book);
                })
                .then(() => {
                    this.fullName = null;
                    this.score = null;
                    this.reviewText = null;
                    this.$refs.userName.focus()
                })
                .catch(() => {
                    eventBus.emit('show-msg', {txt: 'Adding review failed', success: false})
                })
        }
    }
}