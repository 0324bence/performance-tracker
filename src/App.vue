<script setup lang="ts">
    import Drawer from "./components/Drawer.vue";
    import IconHamburger from "./components/icons/IconHamburger.vue";

    function ChangeTheme() {
        document.body.style.colorScheme = document.body.style.colorScheme === "dark" ? "light" : "dark";
    }
</script>

<template>
    <div class="main-wrapper">
        <Drawer />
        <!-- <button class="hamburger">
            <IconHamburger />
        </button> -->
    </div>
</template>

<style lang="scss" scoped>
    @use "@/assets/variables.scss" as *;
    @use "sass:color";

    .main-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        width: 100%;
    }

    .hamburger {
        position: fixed;
        left: 16px;
        top: 16px;
        z-index: 1300;
        width: 48px;
        height: 48px;
        border: 1px solid $border-color;
        border-radius: 14px;
        background: linear-gradient(180deg, $bg-secondary, $bg-primary);
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
        padding: 8px;

        &:hover {
            filter: brightness(150%);
        }
    }
</style>
