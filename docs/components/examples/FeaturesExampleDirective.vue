<template>
  <a href="https://example.com"
     target="_blank"
     v-confirm="'Confirming this dialog will take you to an external website'"
  >A link</a>
  <span> or a </span>
  <button v-confirm="'Confirm to change button text to \'Already clicked\''"
          @click="($event) => $event.target.textContent = 'Already clicked'"
  >button</button>
</template>
