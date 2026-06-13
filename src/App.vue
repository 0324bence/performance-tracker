<script setup lang="ts">
    import { ref, useTemplateRef } from "vue";
    import Drawer from "./components/Drawer.vue";
    import IconHamburger from "./components/icons/IconHamburger.vue";
    import IconSun from "./components/icons/IconSun.vue";

    function ChangeTheme() {
        document.body.style.colorScheme = document.body.style.colorScheme === "dark" ? "light" : "dark";
    }

    const isDrawerOpen = ref(false);
</script>

<template>
    <div class="main-wrapper">
        <button class="hamburger" @click="isDrawerOpen = !isDrawerOpen">
            <IconHamburger />
        </button>
        <Drawer :isOpen="isDrawerOpen" @close="isDrawerOpen = false" />
        <!-- <TaskListModal /> -->
        <button id="themeToggleBtn" class="theme-toggle" title="Téma váltás" @click="ChangeTheme">
            <IconSun />
        </button>
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

    .theme-toggle {
        position: fixed;
        right: 16px;
        top: 16px;
        z-index: 1300;
        width: 48px;
        height: 48px;
        border: 1px solid $border-color;
        border-radius: 14px;
        background: linear-gradient(180deg, $bg-secondary, $bg-primary);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.28);
        transition: all 0.2s ease;

        &:hover {
            transform: translateY(-1px);
            box-shadow: 0 14px 34px rgba(0, 0, 0, 0.32);
        }

        &:active {
            transform: translateY(0);
        }
    }

    .hamburger {
        position: fixed;
        left: 16px;
        top: 16px;
        z-index: 5;
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
