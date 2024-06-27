<template>
    <div>
      <h1>Shopping Cart</h1>
      <div class="lessons-grid">
        <div class="lessons-card" v-for="item in cart" :key="item.id">
          <div class="lesson-content">
            <div class="text">
              <h2>{{ item.subject }}</h2>
              <p>Location: {{ item.location }}</p>
              <p>Price: ${{ item.price }}</p>
              <button @click="removeItemFromCart(item)">Remove Item</button>
            </div>
            <div class="image">
              <img :src = "item.icon" alt="AfterSchool Activity">
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2>Checkout</h2>
        <form name="myForm" method="post">
          <div class="form-group">
            <label for="fname">Name:</label>
            <input type="text" id="fname" v-model="formData.fname">
            <div class="error-message" v-if="validationErrors.name">{{ validationErrors.name }}</div>
          </div>
          <div class="form-group">
            <label for="phone_no">Phone Number:</label>
            <input type="text" id="phone_no" v-model="formData.phone_no">
            <div class="error-message" v-if="validationErrors.number">{{ validationErrors.number }}</div>
          </div>
          <input type="button" :disabled="!isFormValid" value="Checkout" @click="submitForm()">
          <div class="confirmation-message" v-if="orderSubmitted">{{ confirmationMessage }}</div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name : 'CheckoutForm',
    props: ['cart'],
    data() {
      return {
        formData: {
          fname: '',
          phone_no: ''
        },
        validationErrors: {
          name: '',
          number: ''
        },
        orderSubmitted: false,
        confirmationMessage: ''
      };
    },
    methods: {
      removeItemFromCart(item) {
        this.$emit('remove-item-from-cart', item);
      },
      submitForm() {
        if (this.isFormValid) {
          this.orderSubmitted = true;
          this.confirmationMessage = 'Order has been submitted!';
        } else {
          this.validationErrors.name = 'No special characters or numbers allowed';
          this.validationErrors.number = 'Only digits are allowed';
        }
      },
      isNameValid() {
        const regex = /^[a-zA-Z]+$/;
        const name = this.formData.fname.trim();
        if (name) {
          if (!regex.test(name)) {
            this.validationErrors.name = 'No special characters or numbers allowed';
            return false;
          }
        } else {
          this.validationErrors.name = 'Name must be provided';
          return false;
        }
        this.validationErrors.name = '';
        return true;
      },
      isPhoneValid() {
        const regex = /^\d+$/;
        const phone = this.formData.phone_no.trim();
        if (phone) {
          if (!regex.test(phone)) {
            this.validationErrors.number = 'Only digits are allowed';
            return false;
          }
        } else {
          this.validationErrors.number = 'Phone number must be provided';
          return false;
        }
        this.validationErrors.number = '';
        return true;
      }
    },
    computed: {
      isFormValid() {
        return this.isNameValid() && this.isPhoneValid();
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add your CSS here */
  </style>
  