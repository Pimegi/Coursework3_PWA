<template>
    <div>
      <h1>Lesson List</h1>
      <div>
        <label for="search">Search:</label>
        <input type="text" id="search" v-model="searchQuery" @input="searchLessons">
      </div>
      <div>
        <label for="sort">Sort by:</label>
        <select v-model="sortAttribute" @change="emitSort">
          <option value="subject">Subject</option>
          <option value="location">Location</option>
          <option value="price">Price</option>
          <option value="spaces">Spaces</option>
        </select>
        <label for="order">Order:</label>
        <select v-model="sortOrder" @change="emitSort">
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <div class="lessons-grid">
        <div class="lessons-card" v-for="lesson in lessons" :key="lesson.id">
          <div class="lesson-content">
            <div class="text">
              <h2>{{ lesson.subject }}</h2>
              <p>Location: {{ lesson.location }}</p>
              <p>Price: ${{ lesson.price }}</p>
              <p>Spaces: {{ lesson.spaces }}</p>
              <button @click="addToCart(lesson)" :disabled="lesson.spaces <= 0">Add to Cart</button>
            </div>
            <div class="image">
              <img :src = "lesson.icon" alt="AfterSchool Activity">
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LessonList',
    props: ['lessons'],
    data() {
      return {
        searchQuery: '',
        sortAttribute: 'subject',
        sortOrder: 'asc'
      };
    },
    methods: {
      addToCart(lesson) {
        this.$emit('add-item-to-cart', lesson);
      },
      searchLessons() {
        this.$emit('search-lessons', this.searchQuery);
      },
      emitSort() {
        this.$emit('sort-lessons', { attribute: this.sortAttribute, order: this.sortOrder });
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add your CSS here */
  </style>
  