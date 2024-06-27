<template>
  <div id="app">
    <header>
      <h1>Online Classes</h1>
      <div>
        <button @click="toggleComponent">
          {{ cartItemCount }}
          <span class="fa-solid fa-cart-shopping"></span> Checkout
        </button>
      </div>
    </header>
    <component 
      :is="currentComponent" 
      :lessons="sortedLessons" 
      :cart="cart" 
      @add-item-to-cart="addToCart" 
      @remove-item-from-cart="removeFromCart" 
      @search-lessons="filterLessons"
      @sort-lessons="sortLessons"
    ></component>
  </div>
</template>

<script>
import Lesson from './components/Lesson.vue';
import Checkout from './components/Checkout.vue';

export default {
  data() {
    return {
      currentComponent: 'Lesson',
      cart: [],
      lessons: [],
      searchQuery: '',
      sortAttribute: 'subject',
      sortOrder: 'asc'
    };
  },
  components: {
    Lesson,
    Checkout
  },
  computed: {
    cartItemCount() {
      return this.cart.length;
    },
    filteredLessons() {
      const query = this.searchQuery.toLowerCase();
      return this.lessons.filter(lesson => {
        const title = lesson.subject.toLowerCase();
        const location = lesson.location.toLowerCase();
        return title.includes(query) || location.includes(query);
      });
    },
    sortedLessons() {
      const attribute = this.sortAttribute;
      const order = this.sortOrder === 'asc' ? 1 : -1;
      return this.filteredLessons.slice().sort((a, b) => {
        if (a[attribute] < b[attribute]) return -1 * order;
        if (a[attribute] > b[attribute]) return 1 * order;
        return 0;
      });
    }
  },
  methods: {
    toggleComponent() {
      this.currentComponent = this.currentComponent === 'Lesson' ? 'Checkout' : 'Lesson';
    },
    addToCart(lesson) {
      lesson.spaces--;
      this.cart.push(lesson);
    },
    removeFromCart(item) {
      const itemIndex = this.cart.indexOf(item);
      if (itemIndex !== -1) {
        this.cart.splice(itemIndex, 1);
        const lessonInList = this.lessons.find(lesson => lesson.id === item.id);
        if (lessonInList) {
          lessonInList.spaces++;
        }
      }
    },
    async fetchLessons() {
      try {
        const response = await fetch('https://express-app-ggq1.onrender.com/collection/products');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        this.lessons = data;
      } catch (error) {
        console.error('Error fetching lessons from server, using local data:', error);
        const localResponse = await fetch('/petstore/public/products.json');
        const localData = await localResponse.json();
        this.lessons = localData;
      }
    },
    filterLessons(query) {
      this.searchQuery = query;
    },
    sortLessons({ attribute, order }) {
      this.sortAttribute = attribute;
      this.sortOrder = order;
    }
  },
  mounted() {
    this.fetchLessons();
  }
};
</script>

<style scoped>
/* Add your CSS here */
</style>
