<script setup lang="ts">
    import { ref, useTemplateRef, watch } from "vue";
    import IconCross from "./icons/IconCross.vue";
    import UploadCsvModal from "./UploadCsvModal.vue";
    import NewOrUploadModal from "./NewOrUploadModal.vue";
    import fs from "@/stores/fileSystem";

    const props = defineProps<{
        isOpen: boolean;
    }>();

    const emit = defineEmits<{
        (e: "close"): void;
    }>();

    //refs
    const isOpenDelayed = ref(props.isOpen);
    const delayDuration = 300; //ms, delay to not close the drawer immediately

    const isChooseModalOpen = ref(false);
    const isUploadModalOpen = ref(false);

    const categories = ref<string[]>([]);
    const isLoading = ref(categories.value.length === 0);

    watch(
        () => props.isOpen,
        newVal => {
            if (newVal) getCategories();
            setTimeout(() => {
                isOpenDelayed.value = newVal;
            }, delayDuration);
        }
    );

    //functions
    async function getCategories() {
        isLoading.value = true;
        categories.value = await fs.getCategories();
        console.log("categories: ", categories.value);
        isLoading.value = false;
    }

    function closeDrawer() {
        emit("close");
    }

    function openUploadModal() {
        isChooseModalOpen.value = false;
        isUploadModalOpen.value = true;
    }

    async function createNewCategory() {
        await fs.createCategory("Kategória");
        isChooseModalOpen.value = false;
        getCategories();
    }

    //dev functions
    async function resetStorage() {
        await fs.resetStorage();
        getCategories();
    }

    function printFileSystemStructure() {
        fs.printFileSystemStructure();
    }

    const drawer = useTemplateRef("drawer");

    window.addEventListener("click", function (e: MouseEvent) {
        if (drawer!.value!.contains(e.target as Node)) {
        } else {
            if (isOpenDelayed.value) {
                closeDrawer();
            }
        }
    });
</script>

<template>
    <div ref="drawer" class="drawer" :class="{ closed: !props.isOpen }">
        <NewOrUploadModal
            :isOpen="isChooseModalOpen"
            @close="isChooseModalOpen = false"
            @upload-data="openUploadModal"
            @create-new="createNewCategory"
        />
        <UploadCsvModal :isOpen="isUploadModalOpen" @close="isUploadModalOpen = false" />
        <div class="header">
            <div class="texts">
                <p>Archívum</p>
                <h2>Mentett műszakok</h2>
            </div>
            <div class="header-actions">
                <button class="close" @click="closeDrawer">
                    <IconCross />
                </button>
            </div>
        </div>
        <div class="content">
            <!-- <button @click="isModalOpen = true">Open Task List</button> -->
            <!-- Temporary design, may be replaced with a more appropriate component -->
            <!-- TODO: create design for categories, split categories into component  -->

            <div class="new-category" v-if="isLoading">
                <hr />
                <span>Betöltés...</span>
                <hr />
            </div>
            <div class="new-category" v-else-if="categories.length === 0">
                <hr />
                <span>Nincsenek mentett műszakok</span>
                <hr />
            </div>
            <div class="new-category" v-else v-for="category in categories" :key="category">
                <hr />
                <span>{{ category }}</span>
                <hr />
            </div>
            <button class="new-category" @click="isChooseModalOpen = true">
                <hr />
                <span>Új kategória</span>
                <hr />
            </button>
        </div>
        <div class="actions">
            <button @click="printFileSystemStructure">test</button>
            <button @click="resetStorage">reset</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @use "@/assets/variables.scss" as *;
    @use "sass:color";

    .drawer {
        &.closed {
            transform: translateX(-100%);
        }

        position: fixed;
        left: 0;
        top: 0;
        height: 100vh;
        width: 25rem;
        background: linear-gradient(0deg, $bg-secondary, $bg-primary);
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
        z-index: 15;

        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: center;
        transition: all 0.3s ease;

        .header {
            padding: 18px 18px 14px;
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 12px;
            border-bottom: 1px solid color-mix(in srgb, $purple-highlight, rgba(0, 0, 0, 0) 60%);

            .texts {
                display: flex;
                flex-direction: column;
                gap: 8px;

                p {
                    font-size: 0.8rem;
                    letter-spacing: 0.1rem;
                    text-transform: uppercase;
                    color: $text-tertiary;
                    margin-left: 1px;
                }

                h2 {
                    font-size: 1.3rem;
                    color: $purple-highlight;
                }
            }

            .header-actions {
                width: 5%;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: flex-start;
                gap: 8px;

                .close {
                    width: 100%;
                    aspect-ratio: 1 / 1;
                    border: none;
                    background: none;
                    outline: none;
                    cursor: pointer;

                    color: $text-primary;

                    &:hover {
                        filter: brightness(80%);
                    }
                }
            }
        }

        .content {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: stretch;
            justify-content: flex-start;
            padding: 1rem 0.5rem;
            gap: 0.5rem;

            .new-category {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                border: none;
                background: none;
                outline: none;
                cursor: pointer;
                transition: filter 0.3s;

                hr {
                    flex: 1;
                    height: 1px;
                    border: none;
                    background-color: $text-tertiary;
                }

                span {
                    font-size: 0.9rem;
                    text-transform: uppercase;
                    letter-spacing: 0.05rem;
                    color: $text-tertiary;
                }

                &:hover {
                    filter: brightness(70%);
                }

                &:active {
                    filter: brightness(50%);
                }
            }
        }

        .actions {
            flex: 0 1;
        }
    }
</style>
