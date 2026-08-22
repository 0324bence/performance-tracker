<script setup lang="ts">
    import { ref, useTemplateRef } from "vue";
    import Drawer from "./components/Drawer.vue";
    import IconHamburger from "./components/icons/IconHamburger.vue";
    import IconSun from "./components/icons/IconSun.vue";
    import IconQuestionCircle from "./components/icons/IconQuestionCircle.vue";
    import IconGithub from "./components/icons/IconGithub.vue";
    import fs from "@/stores/fileSystem";

    const isLoading = ref(true);
    async function initFileSystem() {
        await fs.getFileSystemAccess();
        isLoading.value = false;
    }
    initFileSystem();

    const isDrawerOpen = ref(false);
    const isTooltipVisible = ref(false);

    function ChangeTheme() {
        document.body.style.colorScheme = document.body.style.colorScheme === "dark" ? "light" : "dark";
    }
</script>

<template>
    <div v-if="isLoading" class="main-wrapper">
        <p>Loading...</p>
    </div>
    <div v-else class="main-wrapper">
        <button class="hamburger" @click="isDrawerOpen = !isDrawerOpen">
            <IconHamburger />
        </button>
        <Drawer :isOpen="isDrawerOpen" @close="isDrawerOpen = false" />
        <!-- <TaskListModal /> -->
        <button id="themeToggleBtn" class="theme-toggle" title="Téma váltás" @click="ChangeTheme">
            <IconSun />
        </button>

        <h1 class="noWork">Nincs kiválasztott műszak</h1>

        <div class="extras">
            <button class="openQuestion" @mouseenter="isTooltipVisible = true" @mouseleave="isTooltipVisible = false">
                <IconQuestionCircle />
                <Transition>
                    <div class="tooltip" v-if="isTooltipVisible">
                        <p>
                            Az applikáció egy teljesítménykövető eszköz, amely lehetővé teszi a felhasználók számára,
                            hogy nyomon kövessék és elemezzék a különböző tevékenységeiket és teljesítményüket.
                        </p>
                        <p>
                            A kezdéshez nyisd meg a bal felső sarokban található menüt, majd adj hozzá új feladatlistát.
                        </p>
                    </div>
                </Transition>
            </button>
            <a class="github" href="https://github.com/0324bence/performance-tracker">
                <IconGithub />
            </a>
        </div>
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

    .extras {
        position: fixed;
        right: 16px;
        bottom: 16px;
        display: flex;
        flex-direction: column;
        gap: 16px;

        button,
        a {
            background: none;
            border: none;
            outline: none;
            width: 35px;
            height: 35px;
        }

        .openQuestion {
            color: $text-tertiary;

            svg {
                opacity: 0.3;
            }

            &:hover svg {
                opacity: 0.4;
            }

            .v-enter-active,
            .v-leave-active {
                transition: opacity 0.2s ease-in-out;
            }

            .v-enter-from,
            .v-leave-to {
                opacity: 0;
            }

            .tooltip {
                position: absolute;
                bottom: 100%;
                right: 0;
                // margin-bottom: 8px;
                padding: 8px;
                background-color: $bg-secondary;
                color: $text-primary;
                border-radius: 4px;
                font-size: 14px;
                line-height: 1.4;
                white-space: nowrap;
                // pointer-events: none;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                width: 20rem;
                white-space: wrap;
                text-align: left;
            }
        }

        .github {
            color: $text-primary;
            svg {
                opacity: 0.3;
            }

            &:hover svg {
                opacity: 0.4;
            }

            &:visited {
                color: $text-primary;
            }
        }
    }

    .theme-toggle {
        position: fixed;
        right: 16px;
        top: 16px;
        z-index: 10;
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
        padding: 8px;

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
