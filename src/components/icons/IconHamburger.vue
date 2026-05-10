<template>
    <svg class="icon-hamburger" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Top bar -->
        <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
        <!-- Middle bar -->
        <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
        <!-- Bottom bar -->
        <line x1="3" y1="18" x2="21" y2="18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    </svg>
</template>

<style lang="scss" scoped>
    @use "@/assets/variables.scss" as *;

    .icon-hamburger {
        color: $purple-highlight;
    }
</style>
