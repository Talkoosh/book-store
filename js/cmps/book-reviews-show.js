export default {
    props: ['reviews'],
    template: `
    <section class="review-show">
        <h1>Book Reviews:</h1>
        <div class="reviews">
            <div class="review" v-for="(review, idx) in reviews">
                <button @click="onDeleteReview(idx)">X</button>
                <h3>Review By: {{review.fullName}}</h3>
                <h4>Score: {{review.score}}</h4>
                <h4>Review:</h4>
                <p>{{review.reviewText}}</p>
            </div>
        </div>
    </section>
    `,
    methods: {
        onDeleteReview(idx){
            this.$emit('delete-review', idx)
        }
    }
}