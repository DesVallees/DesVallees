<script lang="ts">
    export let date: string;
    export let reviewText: string;
    export let reviewerName: string;
    export let reviewerImageSrc: string = '/images/lawyers/Sofia_Lindström.jpg';
    export let rating: number;
    
    // Function to create an array for the star rating, filled with boolean values
    // true for a full star, false for an empty star
    const createRatingStars = (rating: number): boolean[] => {
      const fullStars = Math.floor(rating);
      const halfStar = rating % 1 >= 0.5 ? 1 : 0;
      const emptyStars = 5 - fullStars - halfStar;
      
      return [
        ...Array(fullStars).fill(true),
        ...(halfStar ? [true] : []),
        ...Array(emptyStars).fill(false)
      ];
    };
  
    // Calculate the star rating based on the provided rating
    $: stars = createRatingStars(rating);
  </script>
  
  <div class="review-card">
    <div class="review-header">
      <img class="reviewer-image" src="{reviewerImageSrc}" alt="{reviewerName}" />
      <div class="reviewer-info">
        <p class="reviewer-name">{reviewerName}</p>
        <p class="review-date">{date}</p>
      </div>
    </div>
    <div class="review-rating">
      {#each stars as star}
        <span class="star">{star ? '★' : '☆'}</span>
      {/each}
    </div>
    <div class="review-text">
      {reviewText}
    </div>
  </div>

  
  <style>
    .review-card {
      background-color: #00000010;
      border-radius: 8px;
      padding: 16px;
      box-shadow: 0 4px 8px var(--content-2);
      font-size: clamp(1rem, 3vw, 1.1rem);
    }
  
    .review-header {
      display: flex;
      align-items: center;
      margin-bottom: 12px;
    }
  
    .reviewer-image {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 10px;
      object-fit: cover;
    }
  
    .reviewer-info {
      display: flex;
      flex-direction: column;
    }
  
    .reviewer-name {
      font-size: 1em;
      font-weight: bold;
      margin: 0;
    }
  
    .review-date {
      font-size: .9em;
      color: var(--content-8);
      margin: 0;
    }
  
    .review-rating {
      display: flex;
      margin-bottom: 12px;
    }
  
    .star {
      color: #ebc805;
      margin-right: 4px;
      font-size: 1em;
    }
  
    .review-text {
      font-size: 1em;
      line-height: 1.5;
    }
  
    /* Adjustments for accessibility and responsiveness */
    @media (prefers-reduced-motion: reduce) {
      .review-card {
        transition: none;
      }
    }
  
    @media (max-width: 768px) {
      .review-card {
        max-width: 100%;
      }
    }
  </style>
  